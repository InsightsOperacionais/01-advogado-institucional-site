"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { reset } from "@/app/(auth)/actions/reset";
import { ResetSchema } from "@/app/(auth)/schemas";
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
import { SplitLayout } from "./split-layout";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema as any),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <SplitLayout
      title="Recuperação de senha"
      subtitle="Informe o e-mail da sua conta para receber o link de redefinição."
    >
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="font-bitter text-3xl font-light text-[#141414]">
            Esqueci minha senha
          </h2>
          <p className="text-sm text-[#141414]/70">
            Você vai receber um link para criar uma nova senha.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              disabled={isPending}
              type="submit"
              className="h-11 w-full rounded-full bg-[#141414] text-[#fbb725] hover:bg-[#1f1f1f]"
              size="lg"
            >
              Enviar link
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-[#141414]/70">
          <Link href="/login" className="font-semibold text-[#141414] hover:underline">
            Voltar para login
          </Link>
        </p>
      </div>
    </SplitLayout>
  );
};
