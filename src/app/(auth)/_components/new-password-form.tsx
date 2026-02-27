"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { newPassword } from "@/app/(auth)/actions/new-password";
import { NewPasswordSchema } from "@/app/(auth)/schemas";
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

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema as any),
    defaultValues: { password: "" },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <SplitLayout
      title="Defina uma nova senha"
      subtitle="Escolha uma senha forte para proteger seu acesso institucional."
    >
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="font-bitter text-3xl font-light text-[#141414]">
            Nova senha
          </h2>
          <p className="text-sm text-[#141414]/70">
            A senha precisa ter pelo menos 6 caracteres.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      label="Nova senha"
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
              Salvar nova senha
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
