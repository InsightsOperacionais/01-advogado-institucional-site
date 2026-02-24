// components/layout/io-menu/io-menu.tsx (ATUALIZADO com Zustand)
"use client";

import { cn } from "@/lib/utils";
import { useMenuStore } from "@/providers/menu-context";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { RoceriaButton } from "../roceria-button";

// ===== MENU BUTTON =====
interface IoMenuButtonProps {
  menuId: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  menuProps?: any;
}

export function IoMenuButton({
  menuId,
  children,
  className = "",
  onClick,
  menuProps = {},
}: IoMenuButtonProps) {
  const { openMenu } = useMenuStore();

  const handleClick = () => {
    onClick?.();
    openMenu(menuId, menuProps);
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

// ===== MENU CONTENT =====
export function IoMenuContent() {
  const { isOpen, activeMenuConfig, activeMenuProps, closeMenu } =
    useMenuStore();

  useEffect(() => {
    // Controla o scroll do body quando o menu está aberto
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!activeMenuConfig) return null;

  const {
    component: Component,
    origin = "top-right",
    theme = "light",
  } = activeMenuConfig;

  const themeClasses = {
    light: {
      bg: "bg-[#f1f1f1]",
      text: "text-[#141414]",
      closeButton: "bg-[#fbb725] text-[#141414] hover:scale-110",
      closeIcon: "bg-[#141414]",
    },
    dark: {
      bg: "bg-[#141414]",
      text: "text-[#f1f1f1]",
      closeButton: "bg-[#fbb725] text-[#141414] hover:scale-110",
      closeIcon: "bg-[#141414]",
    },
  };

  const currentTheme = themeClasses[theme];

  // Variantes de animação para o menu circular
  const menuVariants = (origin: string = "top-right"): Variants => {
    let clipPathOrigin = "98% 5%"; // top-right (padrão)

    if (origin === "top-left") {
      clipPathOrigin = "3% 6%";
    } else if (origin === "bottom-right") {
      clipPathOrigin = "97% 94%";
    } else if (origin === "bottom-left") {
      clipPathOrigin = "3% 94%";
    }

    return {
      hidden: {
        clipPath: `circle(0% at ${clipPathOrigin})`,
      },
      visible: {
        clipPath: `circle(150% at ${clipPathOrigin})`,
        transition: {
          duration: 1.2,
          ease: [0.15, 0.1, 0.1, 1],
        },
      },
      exit: {
        clipPath: `circle(0% at ${clipPathOrigin})`,
        transition: {
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1],
        },
      },
    };
  };

  // Limpa o menu após a animação de saída
  const handleExitComplete = () => {
    if (!isOpen) {
      // Opcional: limpar dados se necessário
    }
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {isOpen && (
        <motion.div
          key={`menu-${activeMenuConfig.id}`}
          variants={menuVariants(origin)}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={cn(
            "absolute inset-0 z-120 flex flex-col items-center justify-center",
            currentTheme.bg,
          )}
        >
          {/* Botão de Fechar com RoceriaButton */}
          <div className="absolute top-5 right-5 z-130">
            <RoceriaButton
              variant="expandible"
              size="default"
              label="Fechar"
              icon={<X size={18} className="shrink-0" />}
              onClick={closeMenu}
            />
          </div>

          {/* Conteúdo do Menu */}
          <Component {...activeMenuProps} onClose={closeMenu} theme={theme} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ===== MENU SECTION =====
interface IoMenuSectionProps {
  children: ReactNode;
  className?: string;
  theme?: "light" | "dark";
}

export function IoMenuSection({
  children,
  className = "",
  theme = "light",
}: IoMenuSectionProps) {
  const textColor = theme === "light" ? "text-[#141414]" : "text-[#f1f1f1]";

  return (
    <div className={cn("h-full w-full overflow-y-auto", textColor, className)}>
      {children}
    </div>
  );
}
