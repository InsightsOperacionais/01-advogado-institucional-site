"use server";

import type * as z from "zod";

import { getUserByEmail } from "@/app/(auth)/data/user";
import { sendPasswordResetEmail } from "@/app/(auth)/lib/mail";
import { generatePasswordResetToken } from "@/app/(auth)/lib/tokens";
import { ResetSchema } from "@/app/(auth)/schemas";
import { rateLimit } from "@/app/(auth)/lib/rate-limit";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Informe um e-mail válido." };
  }

  const { email } = validatedFields.data;
  const normalizedEmail = email.toLowerCase();

  const limit = await rateLimit(`auth:reset:${normalizedEmail}`, {
    maxRequests: 5,
    windowMs: 10 * 60_000,
  });

  if (!limit.success) {
    return {
      error:
        "Muitas solicitações de recuperação. Aguarde alguns minutos e tente novamente.",
    };
  }

  const existingUser = await getUserByEmail(normalizedEmail);

  if (!existingUser) {
    return { error: "Não encontramos uma conta para este e-mail." };
  }

  const passwordResetToken = await generatePasswordResetToken(normalizedEmail);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "Enviamos o link de recuperação para seu e-mail." };
};
