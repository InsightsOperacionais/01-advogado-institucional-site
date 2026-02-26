"use server";

import bcrypt from "bcryptjs";
import type * as z from "zod";

import { getUserByEmail } from "@/app/(auth)/data/user";
import { sendVerificationEmail } from "@/app/(auth)/lib/mail";
import { generateVerificationToken } from "@/app/(auth)/lib/tokens";
import { RegisterSchema } from "@/app/(auth)/schemas";
import { db } from "@/lib/prisma-db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Dados inválidos." };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Este e-mail já está em uso." };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  try {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
  } catch (error) {
    console.warn("[auth:register] falha ao enviar e-mail de verificação:", error);
  }

  return { success: "Conta criada com sucesso." };
};
