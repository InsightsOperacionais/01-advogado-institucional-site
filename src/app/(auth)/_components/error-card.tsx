"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/shadcnui/base/button";
import { SplitLayout } from "./split-layout";

export const ErrorCard = () => {
  return (
    <SplitLayout
      title="Algo não saiu como esperado"
      subtitle="Houve um problema ao concluir sua autenticação."
    >
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="font-bitter text-3xl font-light text-[#141414]">
            Erro de autenticação
          </h2>
          <p className="text-sm text-[#141414]/70">
            Tente novamente ou volte para a tela de login.
          </p>
        </div>

        <div className="flex w-full items-center justify-center py-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="h-7 w-7" />
          </div>
        </div>

        <Button
          asChild
          className="h-11 w-full rounded-full bg-[#141414] text-[#fbb725] hover:bg-[#1f1f1f]"
          size="lg"
        >
          <Link href="/login">Voltar para login</Link>
        </Button>
      </div>
    </SplitLayout>
  );
};
