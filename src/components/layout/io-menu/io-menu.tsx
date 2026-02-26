// components/layout/io-menu/io-menu.tsx
"use client";

import { cn } from "@/lib/utils";
import { useUIOverlay } from "@/providers/ui-overlay-context";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { LawButton } from "../law-button";
import { MENU_REGISTRY } from "./menu-registry";
export { IoMenuSection } from "./io-menu-primitives";

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
  const { openMenu } = useUIOverlay();

  const handleClick = () => {
    onClick?.();
    if (!MENU_REGISTRY[menuId]) {
      console.warn(`Menu with id "${menuId}" not registered`);
      return;
    }
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
  const {
    state: { activeMenu },
    closeMenu,
  } = useUIOverlay();

  const isOpen = Boolean(activeMenu);
  const activeMenuConfig = activeMenu ? MENU_REGISTRY[activeMenu.id] : null;
  const activeMenuProps = activeMenu?.props ?? {};

  useEffect(() => {
    // Controla o scroll do body quando o menu está aberto
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const origin = activeMenuConfig?.origin ?? "top-right";
  const theme = activeMenuConfig?.theme ?? "light";
  const Component = activeMenuConfig?.component;

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
    let clipPathOrigin = "97% 6.5%"; // top-right (padrão)

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
      {isOpen && activeMenuConfig && Component && (
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
          <div className="absolute top-8 right-8 z-130">
            <LawButton
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
