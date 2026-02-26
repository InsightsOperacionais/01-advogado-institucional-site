"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { login } from "@/app/(auth)/actions/login";
import { LoginSchema } from "@/app/(auth)/schemas";
import { IoInput } from "@/components/layout/io-input";
import { Button } from "@/components/shadcnui/base/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcnui/base/form";
import { Input } from "@/components/shadcnui/base/input";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { Social } from "./social";
import { SplitLayout } from "./split-layout";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema as any),
    defaultValues: { email: "", password: "", code: "" },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values, callbackUrl).then((data: any) => {
        if (data?.error) setError(data.error);
        if (data?.success) setSuccess(data.success);
        if (data?.twoFactor) setShowTwoFactor(true);
      });
    });
  };

  return (
    <SplitLayout
      title="Bem-vindo de volta"
      subtitle="Acesse sua conta para gerenciar seus pedidos e desfrutar da melhor curadoria artesanal do Brasil."
    >
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="font-bitter text-3xl font-medium tracking-tight text-[#141414]">
            Acessar Conta
          </h2>
          <p className="mt-2 text-sm font-light tracking-widest text-[#141414]/40 uppercase">
            Sua porta de entrada para a roça
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {showTwoFactor ? (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black tracking-[0.2em] text-[#141414]/60 uppercase">
                      Código de Verificação
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <ShieldCheck
                          className="absolute top-1/2 left-4 -translate-y-1/2 text-[#fbb725]"
                          size={18}
                        />
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="000000"
                          className="h-14 rounded-2xl border-[#141414]/5 bg-[#F8F8F8] pl-12 text-lg font-bold tracking-[0.5em] transition-all focus:border-[#fbb725]/50"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <IoInput
                          {...field}
                          disabled={isPending}
                          placeholder="seu@email.com"
                          fixedLabel
                          type="email"
                          label="E-mail"
                          className="h-14"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <div className="space-y-1">
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
                            fixedLabel
                            className="h-14"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end pr-2">
                    <Link
                      href="/reset"
                      className="text-[10px] font-bold tracking-widest text-[#141414]/40 uppercase transition-colors hover:text-[#fbb725]"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                </div>
              </>
            )}

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              disabled={isPending}
              type="submit"
              className="group h-14 w-full rounded-full bg-[#141414] text-[11px] font-black tracking-[0.3em] text-[#fbb725] uppercase shadow-xl transition-all hover:scale-[1.02] hover:bg-[#141414] active:scale-95"
            >
              {showTwoFactor ? "Validar Acesso" : "Entrar na Dispensa"}
              <ArrowRight
                size={16}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Button>
          </form>
        </Form>

        {!showTwoFactor && (
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#141414]/5" />
              </div>
              <div className="relative flex justify-center text-[10px] font-bold tracking-widest text-[#141414]/20 uppercase">
                <span className="bg-white px-4">Ou acessar com</span>
              </div>
            </div>

            <Social />

            <p className="text-center text-xs font-light text-[#141414]/50">
              Novo por aqui?{" "}
              <Link
                href="/registro"
                className="font-bold text-[#141414] underline decoration-[#fbb725]/30 underline-offset-4 transition-colors hover:text-[#fbb725]"
              >
                Criar conta artesanal
              </Link>
            </p>
          </div>
        )}
      </div>
    </SplitLayout>
  );
};
