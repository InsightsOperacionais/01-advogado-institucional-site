"use client";

import { ElementReveal } from "@/components/layout/element-reveal";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, CalendarCheck, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMenuButton } from "../io-menu/io-menu";
import { useNavbarVisibility } from "../navbar/monted-navbar";

const QUICK_LINKS = [
  {
    href: "/contato",
    icon: <CalendarCheck size={20} />,
    label: "Agendar",
  },
  {
    href: "/insights",
    icon: <BookOpen size={20} />,
    label: "Insights",
  },
];

export function IoMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showMainMenuShortcut, setShowMainMenuShortcut] = useState(false);
  const isVisible = useNavbarVisibility();

  const closeAll = () => setIsOpen(false);
  const openMainMenu = () => {
    window.requestAnimationFrame(() => {
      setIsOpen(false);
    });
  };

  useEffect(() => {
    let shortcutTimeoutId: number | undefined;
    let quickActionsTimeoutId: number | undefined;

    if (isOpen) {
      setShowMainMenuShortcut(true);
      setShowQuickActions(true);
    } else {
      quickActionsTimeoutId = window.setTimeout(() => {
        setShowQuickActions(false);
      }, 220);
    }

    if (isOpen || isMainMenuOpen) {
      setShowMainMenuShortcut(true);
    } else {
      shortcutTimeoutId = window.setTimeout(() => {
        setShowMainMenuShortcut(false);
      }, 220);
    }

    return () => {
      if (shortcutTimeoutId) window.clearTimeout(shortcutTimeoutId);
      if (quickActionsTimeoutId) window.clearTimeout(quickActionsTimeoutId);
    };
  }, [isMainMenuOpen, isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={closeAll}
            className="fixed inset-0 z-[100] bg-[#141414]/60 backdrop-blur-none md:backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          "fixed right-6 bottom-6 z-[110] flex flex-col items-end transition-opacity duration-500 md:hidden",
          isVisible
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="mr-2 mb-4 flex flex-col-reverse items-end gap-4">
          {showMainMenuShortcut && (
            <ElementReveal
              active={isOpen}
              delay={0.05}
              duration={0.3}
              variant="button"
              distance="12px"
              mask={false}
            >
              <div
                className={cn(
                  "flex items-center gap-3",
                  isOpen ? "pointer-events-auto" : "pointer-events-none",
                )}
              >
                <span className="font-bitter rounded-full border border-white/10 bg-white px-4 py-1.5 text-[10px] font-bold tracking-widest text-[#141414] uppercase shadow-xl">
                  Menu
                </span>
                <IoMenuButton
                  ariaLabel="Abrir menu principal"
                  variant="default"
                  size="icon"
                  icon={<Menu size={20} />}
                  label=""
                  onOpen={openMainMenu}
                  onOpenStateChange={setIsMainMenuOpen}
                  className="!border-[#c5a47e]/20 !bg-white !text-[#141414] shadow-2xl hover:!border-[#c5a47e]/20 hover:!bg-white hover:!text-[#141414]"
                />
              </div>
            </ElementReveal>
          )}

          {showQuickActions &&
            QUICK_LINKS.map((action, index) => (
              <ElementReveal
                key={action.label}
                active={isOpen}
                delay={0.11 + index * 0.05}
                duration={0.3}
                variant="button"
                distance="12px"
                mask={false}
              >
                <div
                  className={cn(
                    "flex items-center gap-3",
                    isOpen ? "pointer-events-auto" : "pointer-events-none",
                  )}
                >
                  <span className="font-bitter rounded-full border border-white/10 bg-white px-4 py-1.5 text-[10px] font-bold tracking-widest text-[#141414] uppercase shadow-xl">
                    {action.label}
                  </span>

                  <Link
                    href={action.href}
                    onClick={closeAll}
                    aria-label={action.label}
                    className="flex size-12 items-center justify-center rounded-full border border-[#c5a47e]/20 bg-white text-[#141414] shadow-2xl transition-transform active:scale-90"
                  >
                    {action.icon}
                  </Link>
                </div>
              </ElementReveal>
            ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label={isOpen ? "Fechar ações rápidas" : "Abrir ações rápidas"}
          className={cn(
            "flex size-16 items-center justify-center rounded-full border-2 shadow-2xl transition-all duration-300",
            isOpen
              ? "border-[#c5a47e] bg-[#c5a47e] text-[#141414]"
              : "border-[#c5a47e]/30 bg-[#141414] text-[#c5a47e] backdrop-blur-none md:backdrop-blur-xl",
          )}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="x"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="m"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
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
