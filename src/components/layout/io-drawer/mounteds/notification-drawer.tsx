// components/layout/io-drawer/mounteds/notification-drawer.tsx
"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { toast } from "sonner";
import {
  IoDrawerButton,
  IoDrawerContentSection,
  IoDrawerFooter,
} from "../io-drawer-primitives";

// ===== CONFIGURAÇÃO DO DRAWER =====
const DRAWER_ID = "notifications";

// ===== CONTEÚDO DO DRAWER =====
interface NotificationDrawerContentProps {
  theme?: "light" | "dark";
  onClose?: () => void;
  children?: ReactNode;
}

export function NotificationDrawerContent({
  theme = "light",
  onClose,
  children,
}: NotificationDrawerContentProps) {
  const isDark = theme === "dark";

  const mostrarToast = {
    sucesso: () => {
      toast.success("Operação realizada com sucesso!", {
        description: "Suas alterações foram salvas.",
        duration: 4000,
      });
    },
    erro: () => {
      toast.error("Erro ao processar", {
        description: "Tente novamente mais tarde.",
        duration: 5000,
      });
    },
    aviso: () => {
      toast.warning("Atenção!", {
        description: "Esta ação não pode ser desfeita.",
        duration: 4000,
      });
    },
    info: () => {
      toast.info("Nova mensagem", {
        description: "Você tem uma notificação não lida.",
        duration: 3000,
      });
    },
    promessa: () => {
      const promise = new Promise((resolve) => {
        setTimeout(() => resolve({ name: "João" }), 2000);
      });

      toast.promise(promise, {
        loading: "Carregando...",
        success: (data: any) => `Bem-vindo, ${data.name}!`,
        error: "Erro ao carregar",
      });
    },
  };

  const botoesTeste = [
    { label: "Sucesso", onClick: mostrarToast.sucesso, color: "bg-green-500" },
    { label: "Erro", onClick: mostrarToast.erro, color: "bg-red-500" },
    { label: "Aviso", onClick: mostrarToast.aviso, color: "bg-yellow-500" },
    { label: "Info", onClick: mostrarToast.info, color: "bg-blue-500" },
    {
      label: "Promessa",
      onClick: mostrarToast.promessa,
      color: "bg-purple-500",
    },
  ];

  const textColor = isDark ? "text-[#f1f1f1]" : "text-[#141414]";
  const mutedColor = isDark ? "text-[#f1f1f1]/50" : "text-[#141414]/50";

  return (
    <div className={cn("flex h-full flex-col", textColor)}>
      <IoDrawerContentSection theme={theme}>
        <div className="flex flex-col gap-6 p-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-bitter text-lg font-light">Painel de Testes</h2>
            <p className={cn("text-xs italic", mutedColor)}>
              Dispare as notificações abaixo para testar a fluidez do container:
            </p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {botoesTeste.map((btn) => (
                <button
                  key={btn.label}
                  onClick={() => {
                    btn.onClick();
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:brightness-110 active:scale-[0.98]",
                    btn.color,
                  )}
                >
                  {btn.label}
                  <span className="opacity-50">→</span>
                </button>
              ))}
            </div>
          </div>

          <hr
            className={cn(
              isDark ? "border-[#f1f1f1]/10" : "border-[#141414]/10",
            )}
          />

          <div className="flex flex-col gap-4">
            {children || (
              <div
                className={cn(
                  "rounded-2xl border-2 border-dashed p-6 text-center",
                  isDark
                    ? "border-[#f1f1f1]/10 bg-[#f1f1f1]/5"
                    : "border-[#141414]/10 bg-[#141414]/5",
                )}
              >
                <p className={cn("text-sm italic", mutedColor)}>
                  Nenhuma notificação real no momento
                </p>
              </div>
            )}
          </div>
        </div>
      </IoDrawerContentSection>

      {/* Rodapé opcional */}
      <IoDrawerFooter
        className={cn(
          "border-t px-4 py-4",
          isDark ? "border-[#f1f1f1]/10" : "border-[#141414]/10",
        )}
      >
        <button
          onClick={onClose}
          className="w-full text-center text-xs font-medium opacity-60 transition-opacity hover:opacity-100"
        >
          Fechar notificações
        </button>
      </IoDrawerFooter>
    </div>
  );
}

// ===== BOTÃO DO DRAWER COM AUTO-REGISTRO =====
interface NotificationDrawerButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function NotificationDrawerButton({
  children,
  className,
}: NotificationDrawerButtonProps) {
  return (
    <IoDrawerButton drawerId={DRAWER_ID} className={className}>
      {children}
    </IoDrawerButton>
  );
}
