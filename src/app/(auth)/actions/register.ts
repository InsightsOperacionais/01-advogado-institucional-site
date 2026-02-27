"use server";

import bcrypt from "bcryptjs";
import type * as z from "zod";

import { getUserByEmail } from "@/app/(auth)/data/user";
import { sendVerificationEmail } from "@/app/(auth)/lib/mail";
import { generateVerificationToken } from "@/app/(auth)/lib/tokens";
import { RegisterSchema } from "@/app/(auth)/schemas";
import { rateLimit } from "@/app/(auth)/lib/rate-limit";
import { db } from "@/lib/prisma-db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Dados inválidos." };
  }

  const { email, password, name } = validatedFields.data;
  const normalizedEmail = email.toLowerCase();
  const limit = await rateLimit(`auth:register:${normalizedEmail}`, {
    maxRequests: 5,
    windowMs: 10 * 60_000,
  });

  if (!limit.success) {
    return {
      error:
        "Muitas tentativas de cadastro. Aguarde alguns minutos e tente novamente.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(normalizedEmail);

  if (existingUser) {
    return { error: "Este e-mail já está em uso." };
  }

  await db.user.create({
    data: {
      name,
      email: normalizedEmail,
      password: hashedPassword,
    },
  });

  try {
    const verificationToken = await generateVerificationToken(normalizedEmail);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
  } catch (error) {
    console.warn("[auth:register] falha ao enviar e-mail de verificação:", error);
  }

  return { success: "Conta criada com sucesso." };
};
