"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Toaster, useSonner } from "sonner";

export function ToasterContainer() {
  const { toasts } = useSonner();

  const colorMap: Record<string, string> = {
    success: "from-green-500 to-emerald-600",
    error: "from-red-500 to-rose-600",
    warning: "from-amber-400 to-orange-500",
    info: "from-blue-500 to-cyan-600",
    loading: "from-purple-500 to-indigo-600",
    default: "from-zinc-700 to-zinc-800",
  };

  return (
    <div className="flex w-full flex-col">
      <AnimatePresence initial={false}>
        {toasts.map((t) => {
          const bgGradient = colorMap[t.type as string] || colorMap.default;

          return (
            <motion.div
              key={t.id}
              layout
              // Definimos a origem no topo para ele "subir" ao fechar
              style={{ transformOrigin: "top" }}
              initial={{
                height: 0,
                opacity: 0,
                scaleY: 1,
                marginBottom: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
                scaleY: 1,
                marginBottom: 12,
              }}
              exit={{
                height: 0,
                opacity: 0,
                scaleY: 0, // Achata apenas a altura até sumir
                marginBottom: 0,
                transition: {
                  height: { duration: 0.3 },
                  scaleY: { duration: 0.3 },
                  opacity: { duration: 0.6 },
                },
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 1,
              }}
              className="w-full overflow-hidden"
            >
              <div
                className={`rounded-3xl bg-linear-to-r p-2 shadow-xl ${bgGradient}`}
              >
                <div className="flex items-center gap-3 text-white">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                    {t.type === "success" && "✓"}
                    {t.type === "error" && "✕"}
                    {t.type === "warning" && "⚠"}
                    {t.type === "info" && "ℹ"}
                    {t.type === "loading" && (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    )}
                  </div>

                  <div className="flex gap-3 overflow-hidden">
                    <span className="text-sm leading-tight font-bold">
                      {typeof t.title === "function" ? t.title() : t.title}
                    </span>
                    {t.description && (
                      <span className="text-xs opacity-90">
                        {typeof t.description === "function"
                          ? t.description()
                          : t.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <Toaster className="hidden" />
    </div>
  );
}
