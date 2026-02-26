"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { newVerification } from "@/app/(auth)/actions/new-verification";
import { LoaderCircle } from "lucide-react";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { SplitLayout } from "./split-layout";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const useEffectCalled = useRef(false);

  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Token de verificação não encontrado.");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Não foi possível verificar seu e-mail.");
      });
  }, [token, success, error]);

  useEffect(() => {
    if (!useEffectCalled.current) {
      useEffectCalled.current = true;
      onSubmit();
    }
  }, [onSubmit]);

  return (
    <SplitLayout
      title="Verificação de e-mail"
      subtitle="Estamos confirmando sua conta para liberar todos os recursos."
    >
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="font-bitter text-3xl font-light text-[#141414]">
            Confirmar e-mail
          </h2>
          <p className="text-sm text-[#141414]/70">
            Aguarde enquanto validamos seu token.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-3 py-4">
          {!success && !error && (
            <LoaderCircle className="h-10 w-10 animate-spin text-[#141414]" />
          )}
          <FormSuccess message={success} />
          {!success && <FormError message={error} />}
        </div>

        <p className="text-center text-sm text-[#141414]/70">
          <Link href="/login" className="font-semibold text-[#141414] hover:underline">
            Ir para login
          </Link>
        </p>
      </div>
    </SplitLayout>
  );
};
