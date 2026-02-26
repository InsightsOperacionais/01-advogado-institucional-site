"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { register } from "@/app/(auth)/actions/register";
import { RegisterSchema } from "@/app/(auth)/schemas";
import { IoInput } from "@/components/layout/io-input";
import { Button } from "@/components/shadcnui/base/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcnui/base/form";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { Social } from "./social";
import { SplitLayout } from "./split-layout";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema as any),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
          form.reset();
        }
      });
    });
  };

  return (
    <SplitLayout
      title="Crie sua conta ROCERIA"
      subtitle="Cadastre-se para acompanhar pedidos, salvar preferências e acelerar sua compra."
    >
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="font-bitter text-3xl font-light text-[#141414]">Registro</h2>
          <p className="text-sm text-[#141414]/70">
            Leva menos de um minuto para começar.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <IoInput
                      {...field}
                      disabled={isPending}
                      placeholder="Seu nome completo"
                      fixedLabel
                      type="text"
                      label="Nome"
                      labelClassName="bg-[#f1f1f1]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <IoInput
                      {...field}
                      disabled={isPending}
                      placeholder="seuemail@exemplo.com"
                      fixedLabel
                      type="email"
                      label="E-mail"
                      labelClassName="bg-[#f1f1f1]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <IoInput
                      {...field}
                      variant="password"
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                      label="Senha"
                      labelClassName="bg-[#f1f1f1]"
                      fixedLabel
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              disabled={isPending}
              type="submit"
              className="h-11 w-full rounded-full bg-[#141414] text-[#fbb725] hover:bg-[#1f1f1f]"
              size="lg"
            >
              Criar conta
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#141414]/15" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#f1f1f1] px-2 text-[#141414]/55">ou</span>
          </div>
        </div>

        <Social />

        <p className="text-center text-sm text-[#141414]/70">
          Já tem conta?{" "}
          <Link href="/login" className="font-semibold text-[#141414] hover:underline">
            Fazer login
          </Link>
        </p>
      </div>
    </SplitLayout>
  );
};
