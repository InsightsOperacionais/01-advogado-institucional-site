"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
  Wheat,
  XCircle,
} from "lucide-react";
import { Toaster, useSonner } from "sonner";

export function ToasterContainer() {
  const { toasts } = useSonner();

  // Mapeamento expandido para incluir as cores de borda e progresso
  const configMap: Record<
    string,
    { icon: any; color: string; border: string; bar: string }
  > = {
    success: {
      icon: CheckCircle2,
      color: "text-green-500",
      border: "border-green-500/30",
      bar: "bg-green-500/40",
    },
    error: {
      icon: XCircle,
      color: "text-red-500",
      border: "border-red-500/30",
      bar: "bg-red-500/40",
    },
    warning: {
      icon: AlertCircle,
      color: "text-[#fbb725]",
      border: "border-[#fbb725]/30",
      bar: "bg-[#fbb725]/40",
    },
    info: {
      icon: Info,
      color: "text-blue-500",
      border: "border-blue-500/30",
      bar: "bg-blue-500/40",
    },
    loading: {
      icon: Loader2,
      color: "text-[#fbb725]",
      border: "border-[#fbb725]/30",
      bar: "bg-[#fbb725]/40",
    },
    default: {
      icon: Wheat,
      color: "text-[#fbb725]",
      border: "border-[#fbb725]/30",
      bar: "bg-[#fbb725]/40",
    },
  };

  return (
    <div className="flex w-full flex-col items-center">
      <AnimatePresence initial={false}>
        {toasts.map((t) => {
          const config = configMap[t.type as string] || configMap.default;
          const Icon = config.icon;

          return (
            <motion.div
              key={t.id}
              layout
              style={{ transformOrigin: "top" }}
              initial={{ height: 0, opacity: 0, scale: 0.9, marginBottom: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                scale: 1,
                marginBottom: 12,
              }}
              exit={{
                height: 0,
                opacity: 0,
                scale: 0.9,
                marginBottom: 0,
                transition: { duration: 0.2 },
              }}
              className="w-full overflow-hidden"
            >
              {/* Borda dinâmica via config.border */}
              <div
                className={cn(
                  "relative overflow-hidden rounded-full border-2 bg-[#141414] p-2 pr-6 shadow-2xl backdrop-blur-xl transition-colors duration-300",
                  config.border,
                )}
              >
                <div className="flex items-center gap-3">
                  {/* Container do Ícone */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5">
                    <Icon
                      size={18}
                      className={cn(
                        config.color,
                        t.type === "loading" && "animate-spin",
                      )}
                    />
                  </div>

                  {/* Conteúdo de Texto Editorial */}
                  <div className="flex items-center gap-5 py-1">
                    {t.description && (
                      <span className="truncate text-[9px] font-black tracking-[0.2em] text-[#f1f1f1]/80 uppercase">
                        {typeof t.description === "function"
                          ? t.description()
                          : t.description}
                      </span>
                    )}
                  </div>
                </div>

                {/* Barra de progresso dinâmica via config.bar */}
                {/* <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 4, ease: "linear" }}
                  className={cn("absolute bottom-1 left-0 h-[2px]", config.bar)}
                /> */}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <Toaster className="hidden" />
    </div>
  );
}
