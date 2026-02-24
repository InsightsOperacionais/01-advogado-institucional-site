// components/layout/io-drawer/io-drawer.tsx
"use client";

import { cn } from "@/lib/utils";
import { useDrawerStore } from "@/providers/drawer-context";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ReactNode, useEffect } from "react";

// ===== DRAWER BUTTON =====
interface IoDrawerButtonProps {
  drawerId: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  drawerProps?: any;
}

export function IoDrawerButton({
  drawerId,
  children,
  className = "",
  onClick,
  drawerProps = {},
}: IoDrawerButtonProps) {
  const { openDrawer } = useDrawerStore();

  const handleClick = () => {
    onClick?.();
    openDrawer(drawerId, drawerProps);
  };

  return (
    <div
      onClick={handleClick}
      className={cn("inline-block cursor-pointer", className)}
    >
      {children}
    </div>
  );
}

// ===== DRAWER CONTENT =====
export function IoDrawerContent() {
  const { isOpen, activeDrawerConfig, activeDrawerProps, closeDrawer } =
    useDrawerStore();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!activeDrawerConfig) return null;

  const {
    component: Component,
    title,
    direction = "right",
    theme = "light",
  } = activeDrawerConfig;

  const themeClasses = {
    light: {
      bg: "bg-[#f1f3f4]",
      text: "text-[#141414]",
      border: "border-gray-200/50",
      closeButton: "bg-[#fbb725] text-[#141414] hover:scale-110",
      closeIcon: "bg-[#141414]",
      backdrop: "bg-black/60",
    },
    dark: {
      bg: "bg-[#141414]",
      text: "text-[#f1f1f1]",
      border: "border-[#fbb725]/10",
      closeButton: "bg-[#fbb725] text-[#141414] hover:scale-110",
      closeIcon: "bg-[#141414]",
      backdrop: "bg-black/60",
    },
  };

  const currentTheme = themeClasses[theme];
  const isLeft = direction === "left";

  // Variantes de animação para o drawer
  const drawerVariants: Variants = {
    hidden: {
      x: isLeft ? "-100%" : "100%",
    },
    visible: {
      x: 0,
    },
  };

  // Variantes de animação para o backdrop
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop com animação */}
          <motion.div
            key={`backdrop-${activeDrawerConfig.id}`}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className={cn(
              "absolute inset-0 z-110 cursor-pointer",
              currentTheme.backdrop,
            )}
            onClick={closeDrawer}
          />

          {/* Drawer com animação de slide */}
          <motion.aside
            key={`drawer-${activeDrawerConfig.id}`}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              x: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1], // Entrada suave
              },
            }}
            className={cn(
              "absolute top-0 z-120 flex h-full flex-col",
              currentTheme.bg,
              currentTheme.border,
              "backdrop-blur-md",
              isLeft ? "left-0 border-r" : "right-0 border-l",
              "w-full md:w-[50%] lg:w-[30%]",
            )}
          >
            {/* Header fixo */}
            <div
              className={cn(
                "z-130 flex w-full items-center gap-2 p-4 md:gap-4 md:p-6",
                title ? "justify-between" : "justify-end",
              )}
            >
              {title && (
                <span
                  className={cn(
                    "text-xs font-medium tracking-[0.2em] uppercase md:text-sm",
                    currentTheme.text,
                  )}
                >
                  {title}
                </span>
              )}

              {/* Botão Fechar */}
              <button
                onClick={closeDrawer}
                className="flex items-center justify-center gap-2 md:gap-4"
              >
                <div className="flex items-center justify-center gap-2 md:gap-4">
                  <span
                    className={cn(
                      "hidden text-xs font-medium tracking-[0.2em] uppercase md:inline md:text-sm",
                      currentTheme.text,
                    )}
                  >
                    Fechar
                  </span>

                  <div
                    className={cn(
                      "z-130 flex h-8 w-8 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 md:h-10 md:w-10",
                      currentTheme.closeButton,
                    )}
                  >
                    <div className="relative h-3 w-3 md:h-4 md:w-4">
                      <span
                        className={cn(
                          "absolute inset-0 m-auto h-px w-full rotate-45",
                          currentTheme.closeIcon,
                        )}
                      />
                      <span
                        className={cn(
                          "absolute inset-0 m-auto h-px w-full -rotate-45",
                          currentTheme.closeIcon,
                        )}
                      />
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Área de conteúdo scrollável */}
            <div className="custom-scrollbar flex-1 overflow-x-hidden overflow-y-auto">
              <Component
                {...activeDrawerProps}
                onClose={closeDrawer}
                theme={theme}
              />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// Seção de conteúdo scrollável
interface IoDrawerContentSectionProps {
  children: ReactNode;
  className?: string;
  theme?: "light" | "dark";
}

export function IoDrawerContentSection({
  children,
  className = "",
  theme = "light",
}: IoDrawerContentSectionProps) {
  const textColor = theme === "light" ? "text-[#141414]" : "text-[#f1f1f1]";

  return (
    <div className={cn("h-full overflow-y-auto", textColor, className)}>
      {children}
    </div>
  );
}

// Rodapé do Drawer
interface IoDrawerFooterProps {
  children: ReactNode;
  className?: string;
  theme?: "light" | "dark";
}

export function IoDrawerFooter({
  children,
  className = "",
  theme = "light",
}: IoDrawerFooterProps) {
  return (
    <div className={cn("border-t border-[#fbb725]/10", className)}>
      {children}
    </div>
  );
}
