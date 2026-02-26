"use server";

import { AuthError } from "next-auth";
import type * as z from "zod";

import { signIn } from "@/app/(auth)/auth";
import { getTwoFactorConfirmationByUserId } from "@/app/(auth)/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/app/(auth)/data/two-factor-token";
import { getUserByEmail } from "@/app/(auth)/data/user";
import {
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "@/app/(auth)/lib/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/app/(auth)/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/app/(auth)/routes";
import { LoginSchema } from "@/app/(auth)/schemas";
import { db } from "@/lib/prisma-db";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Dados inválidos." };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "E-mail ou senha inválidos." };
  }

  if (!existingUser.emailVerified) {
    try {
      const verificationToken = await generateVerificationToken(
        existingUser.email,
      );
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );
    } catch (error) {
      console.warn("[auth:login] falha ao enviar verificação de e-mail:", error);
    }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Código inválido." };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Código inválido." };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Código expirado." };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "E-mail ou senha inválidos." };
        default:
          return { error: "Não foi possível realizar o login." };
      }
    }

    throw error;
  }
};
