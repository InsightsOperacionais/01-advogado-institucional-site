"use server";

import bcrypt from "bcryptjs";
import type * as z from "zod";

import { getPasswordResetTokenByToken } from "@/app/(auth)/data/password-reset-token";
import { getUserByEmail } from "@/app/(auth)/data/user";
import { rateLimit } from "@/app/(auth)/lib/rate-limit";
import { NewPasswordSchema } from "@/app/(auth)/schemas";
import { db } from "@/lib/prisma-db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Token ausente." };
  }

  const limit = await rateLimit(`auth:new-password:${token}`, {
    maxRequests: 5,
    windowMs: 10 * 60_000,
  });

  if (!limit.success) {
    return {
      error:
        "Muitas tentativas de redefinição. Aguarde alguns minutos e tente novamente.",
    };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Dados inválidos." };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Token inválido." };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token expirado." };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Usuário não encontrado." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Senha atualizada com sucesso." };
};
