/* eslint-disable react/no-unescaped-entities */
"use client";

import { cn } from "@/lib/utils";
import { useDrawerStore } from "@/providers/drawer-context";
import { useMobileStore } from "@/providers/mobile-context";
import { useScrollDirection } from "@/providers/scroll-context";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function IoMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { headerButtons } = useMobileStore();
  const { openDrawer } = useDrawerStore();
  const isVisible = useScrollDirection();
  const router = useRouter();

  const closeAll = () => setIsOpen(false);

  const handleAction = (button: any) => {
    if (button.type === "link" && button.href) {
      router.push(button.href);
    } else if (button.type === "drawer") {
      button.onClick?.();
    } else {
      button.onClick?.();
    }
    closeAll();
  };

  if (headerButtons.length === 0) return null;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAll}
            className="fixed inset-0 z-[100] bg-[#141414]/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Container do Menu - Removido o translate-y para ele não "subir" */}
      <div
        className={cn(
          "fixed right-6 bottom-6 z-[110] flex flex-col items-end transition-opacity duration-500 md:hidden",
          isVisible
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="mr-2 mb-4 flex flex-col-reverse items-end gap-4">
          <AnimatePresence>
            {isOpen &&
              headerButtons.map((action, index) => (
                <motion.div
                  key={action.label}
                  // Apenas fade e zoom, sem movimento (x ou y)
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.03, // Delay menor para ser mais instantâneo
                  }}
                  className="flex items-center gap-3"
                >
                  <span className="font-bitter rounded-full border border-white/10 bg-white px-4 py-1.5 text-[10px] font-bold tracking-widest text-[#141414] uppercase shadow-xl">
                    {action.label}
                  </span>

                  <button
                    onClick={() => handleAction(action)}
                    className={cn(
                      "flex size-12 items-center justify-center rounded-full border border-[#fbb725]/20 bg-white text-[#141414] shadow-2xl transition-transform active:scale-90",
                      action.className,
                    )}
                  >
                    {action.icon}
                  </button>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* Botão Principal */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex size-16 items-center justify-center rounded-full border-2 shadow-2xl transition-all duration-300",
            isOpen
              ? "border-[#fbb725] bg-[#fbb725] text-[#141414]"
              : "border-[#fbb725]/30 bg-[#141414] text-[#fbb725] backdrop-blur-xl",
          )}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="x"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="m"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </>
  );
}

export default IoMobileMenu;
