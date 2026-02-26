"use server";

import { getUserByEmail } from "@/app/(auth)/data/user";
import { getVerificationTokenByToken } from "@/app/(auth)/data/verification-token";
import { db } from "@/lib/prisma-db";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

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

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "E-mail verificado com sucesso." };
};
