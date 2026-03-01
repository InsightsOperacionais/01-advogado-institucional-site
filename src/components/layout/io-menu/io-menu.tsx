// components/layout/io-menu/io-menu.tsx
"use client";

import { siteConfig } from "@/lib/site-config";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, Gavel, Instagram, Linkedin, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { LawButton, type LawButtonProps } from "../law-button";

const MENU_LINKS = [
  { id: "01", name: "Início", href: "/" },
  { id: "02", name: "Áreas de Atuação", href: "/atuacao" },
  { id: "03", name: "O Escritório", href: "/sobre" },
  { id: "04", name: "Corpo Jurídico", href: "/equipe" },
  { id: "05", name: "Insights & Teses", href: "/insights" },
  { id: "06", name: "Contato Direto", href: "/contato" },
];

// Animação de abertura do menu
const DESKTOP_MENU_VARIANTS: Variants = {
  hidden: {
    clipPath: "circle(0% at 97% 6.5%)",
  },
  visible: {
    clipPath: "circle(150% at 97% 6.5%)",
    transition: {
      duration: 1.2,
      ease: [0.65, 0, 0.1, 1],
    },
  },
  exit: {
    clipPath: "circle(0% at 97% 6.5%)",
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const MOBILE_MENU_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.36,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 0,
    transition: {
      duration: 0.24,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Timing com +0.3s de atraso
const MENU_REVEAL_TIMING = {
  eyebrow: 0.4,
  headline: 0.5,
  seals: 0.6,
  socialsStart: 0.7,
  socialsStep: 0.1,
  navStart: 0.55,
  navStep: 0.08,
  divider: 0.95,
  navDividersStart: 1.4,
  navDividersStep: 0.1,
};

interface IoMenuButtonProps extends Pick<
  LawButtonProps,
  "className" | "icon" | "label" | "labelClassName" | "size" | "variant"
> {
  ariaLabel?: string;
  onOpen?: () => void;
  onOpenStateChange?: (open: boolean) => void;
}

function MainMenuPanel({
  isMobile,
  isOpen,
  onClose,
}: {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}) {
  const leftColumnDelayOffset = isMobile ? 0 : 0.6;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] overflow-hidden bg-[#0a0a0b] text-[#f1f1f1] selection:bg-[#c5a47e] selection:text-[#0a0a0b]">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-24 right-0 hidden size-[600px] rounded-full bg-[#c5a47e]/5 blur-[120px] md:block" />

      <div className="h-full w-full overflow-y-auto text-[#f1f1f1]">
        <div className="relative z-10 flex min-h-full flex-col justify-between px-8 py-10 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-20 lg:py-16">
          {/* Coluna Esquerda */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div className="mt-4 lg:mt-12">
              {/* Eyebrow - sobe */}
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: MENU_REVEAL_TIMING.eyebrow + leftColumnDelayOffset,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                className="mb-4 block text-[10px] font-bold tracking-[0.5em] text-[#c5a47e] uppercase"
              >
                Navegação
              </motion.span>

              {/* Headline - sobe */}
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: MENU_REVEAL_TIMING.headline + leftColumnDelayOffset,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                className="font-bitter mb-12 pb-2 text-[12vw] leading-[0.8] font-light tracking-tighter text-[#f1f1f1] lg:text-[8vw]"
              >
                Estratégia
              </motion.h1>
            </div>

            <div className="mb-6 flex flex-col items-start gap-6 lg:mb-0 lg:gap-10">
              <div className="space-y-6">
                {/* Separador principal com efeito de expansão */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: "100%",
                    opacity: 1,
                    transition: {
                      delay:
                        MENU_REVEAL_TIMING.divider +
                        leftColumnDelayOffset +
                        0.1,
                      duration: 1.2,
                      ease: [0.2, 0.9, 0.3, 1],
                    },
                  }}
                  className="h-px max-w-[200px] bg-gradient-to-r from-[#c5a47e] via-[#c5a47e]/60 to-transparent lg:max-w-md"
                  style={{
                    boxShadow: "0 0 20px rgba(197, 164, 126, 0.3)",
                  }}
                />

                {/* Seals - sobem juntos */}
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: MENU_REVEAL_TIMING.seals + leftColumnDelayOffset,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  className="flex flex-wrap gap-x-6 gap-y-3 text-[8px] font-bold tracking-[0.4em] text-[#c5a47e]/40 uppercase"
                >
                  {[
                    "Chambers Global",
                    "The Legal 500",
                    "OAB/SP",
                    "ISO 9001",
                  ].map((seal) => (
                    <span
                      key={seal}
                      className="cursor-default transition-colors hover:text-[#c5a47e]"
                    >
                      {seal}
                    </span>
                  ))}
                </motion.div>

                {/* Social - fade-in um após o outro */}
                <div className="flex items-center gap-6 lg:gap-10">
                  <div className="flex items-center gap-3">
                    {[Linkedin, Instagram].map((Icon, index) => (
                      <motion.a
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          transition: {
                            delay:
                              MENU_REVEAL_TIMING.socialsStart +
                              leftColumnDelayOffset +
                              index * MENU_REVEAL_TIMING.socialsStep,
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        }}
                        href={
                          index === 0
                            ? siteConfig.social.linkedin
                            : siteConfig.social.instagram
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex size-10 items-center justify-center rounded-full border border-[#c5a47e]/20 bg-white/5 text-[#c5a47e] backdrop-blur-none transition-all hover:scale-110 hover:bg-[#c5a47e] hover:text-[#0a0a0b] md:backdrop-blur-md"
                      >
                        <Icon className="size-4" />
                      </motion.a>
                    ))}
                  </div>

                  {/* Texto - sobe junto com os ícones */}
                  <motion.p
                    initial={{ opacity: 0, y: 60 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay:
                          MENU_REVEAL_TIMING.socialsStart +
                          leftColumnDelayOffset,
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }}
                    className="hidden max-w-[200px] text-[10px] font-light tracking-widest text-[#f1f1f1]/30 italic lg:block"
                  >
                    Defesa intransigente da sua liberdade e patrimônio.
                  </motion.p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Navegação */}
          <div className="flex flex-grow flex-col justify-center lg:col-span-6 lg:flex-grow-0 lg:pl-12">
            <nav className="flex w-full flex-col">
              {MENU_LINKS.map((link, index) => (
                <div key={link.id} className="relative">
                  {/* Link com palavras que sobem */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay:
                          MENU_REVEAL_TIMING.navStart +
                          index * MENU_REVEAL_TIMING.navStep,
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }}
                    className="group relative"
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-4 lg:py-8"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-[9px] font-black text-[#c5a47e]/20 uppercase italic transition-colors group-hover:text-[#c5a47e] lg:text-[10px]">
                          {link.id}
                        </span>
                        <span className="font-bitter text-xl font-light tracking-tight text-[#f1f1f1] lg:text-5xl">
                          {link.name
                            .split(" ")
                            .map((word, wordIndex, array) => (
                              <motion.span
                                key={wordIndex}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  transition: {
                                    delay:
                                      MENU_REVEAL_TIMING.navStart +
                                      index * MENU_REVEAL_TIMING.navStep +
                                      wordIndex * 0.05,
                                    duration: 0.8,
                                    ease: [0.16, 1, 0.3, 1],
                                  },
                                }}
                                className="inline-block transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#c5a47e]"
                              >
                                {word}
                                {wordIndex < array.length - 1 ? "\u00A0" : ""}
                              </motion.span>
                            ))}
                        </span>
                      </div>

                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                      >
                        <ArrowRight
                          className="size-6 text-[#c5a47e] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 lg:size-7"
                          strokeWidth={1}
                        />
                      </motion.div>
                    </Link>
                  </motion.div>

                  {/* Separador do link - aparece depois com expansão da esquerda */}
                  {index < MENU_LINKS.length - 1 && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{
                        width: "100%",
                        opacity: 1,
                        transition: {
                          delay:
                            MENU_REVEAL_TIMING.navDividersStart +
                            index * MENU_REVEAL_TIMING.navDividersStep,
                          duration: 1.2,
                          ease: [0.2, 0.9, 0.3, 1],
                        },
                      }}
                      className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#c5a47e]/40 via-[#c5a47e]/10 to-transparent"
                      style={{
                        boxShadow: "0 0 10px rgba(197, 164, 126, 0.15)",
                      }}
                    />
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="pointer-events-none absolute -bottom-8 left-0 hidden overflow-hidden opacity-[0.03] md:block lg:-bottom-12">
        <h2 className="font-bitter text-[20vw] leading-none font-black tracking-tighter whitespace-nowrap text-[#c5a47e]">
          VON MARINS
        </h2>
      </div>

      <div className="pointer-events-none absolute top-1/2 right-20 hidden -translate-y-1/2 opacity-[0.02] md:block">
        <Gavel size={600} strokeWidth={0.5} />
      </div>
    </div>
  );
}

export function IoMenuButton({
  ariaLabel = "Abrir menu",
  className,
  icon,
  label = "Menu",
  labelClassName,
  onOpen,
  onOpenStateChange,
  size = "default",
  variant = "expandible",
}: IoMenuButtonProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const activeMenuVariants = isMobile
    ? MOBILE_MENU_VARIANTS
    : DESKTOP_MENU_VARIANTS;

  const portalContent = useMemo(() => {
    if (!isMounted) return null;

    return createPortal(
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="main-menu-overlay"
            variants={activeMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[120] will-change-transform"
          >
            <div className="absolute top-8 right-8 z-[130] hidden sm:block">
              <LawButton
                variant="expandible"
                size="default"
                label="Fechar"
                icon={<X size={18} className="shrink-0" />}
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="absolute right-6 bottom-6 z-[130] sm:hidden">
              <button
                onClick={() => setIsOpen(false)}
                className="flex size-16 items-center justify-center rounded-full border-2 border-[#c5a47e]/30 bg-[#141414] text-[#c5a47e]"
              >
                <X size={24} />
              </button>
            </div>
            <MainMenuPanel
              isMobile={isMobile}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );
  }, [activeMenuVariants, isMobile, isMounted, isOpen]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    onOpenStateChange?.(isOpen);
  }, [isOpen, onOpenStateChange]);

  return (
    <>
      <LawButton
        type="button"
        aria-label={ariaLabel}
        variant={variant}
        size={size}
        label={label}
        icon={icon}
        labelClassName={labelClassName}
        className={className}
        onClick={() => {
          onOpen?.();
          setIsOpen(true);
        }}
      />
      {portalContent}
    </>
  );
}
