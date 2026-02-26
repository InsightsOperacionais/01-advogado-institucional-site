"use client";

import { useUIOverlay } from "@/providers/ui-overlay-context";
import { motion } from "framer-motion";
import { ArrowRight, Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { ElementReveal } from "../../element-reveal";
import { IoMenuSection } from "../io-menu-primitives";

const MENU_ID = "main-menu";

interface MainMenuContentProps {
  theme?: "light" | "dark";
  onClose?: () => void;
  children?: ReactNode;
}

const links = [
  { id: "01", name: "Início", href: "/" },
  { id: "02", name: "Queijos Artesanais", href: "/shop" },
  { id: "03", name: "Embutidos Defumados", href: "/shop/embutidos" },
  { id: "04", name: "Temperos & Molhos", href: "/shop/temperos" },
  { id: "05", name: "Doces Caseiros", href: "/shop/doces" },
  { id: "06", name: "Nossa História", href: "/historia" },
  { id: "07", name: "Receitas Caseiras", href: "/receitas" },
];

export function MainMenuContent({
  theme = "dark",
  onClose,
}: MainMenuContentProps) {
  return (
    // h-[100dvh] garante que no mobile o menu ocupe exatamente a altura visível, ignorando as barras do navegador
    <div className="h-screen w-full overflow-hidden bg-[#141414] text-[#f1f1f1] selection:bg-[#fbb725] selection:text-[#141414]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-24 right-0 size-[500px] rounded-full bg-[#fbb725]/5 blur-[120px]" />

      <IoMenuSection theme={theme}>
        <div className="relative z-10 flex h-full flex-col justify-between px-8 py-10 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-20 lg:py-16">
          {/* COLUNA ESQUERDA: Título e Info */}
          <div className="flex flex-col justify-between lg:col-span-7">
            {/* Título - Reduzido no mobile para não empurrar o resto */}
            <div className="mt-4 lg:mt-10">
              <ElementReveal distance={40}>
                <h1 className="font-bitter pb-2 text-[12vw] leading-[0.8] font-light tracking-tighter text-[#f1f1f1] lg:text-[clamp(4rem,15vw,10rem)]">
                  Menu
                </h1>
              </ElementReveal>
            </div>

            {/* Footer de Info - Escondido ou muito compacto em telas minúsculas se necessário */}
            <div className="mb-6 flex flex-col items-start gap-6 lg:mb-0 lg:gap-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1 }}
                className="h-px max-w-[200px] bg-gradient-to-r from-[#fbb725]/40 via-[#fbb725]/10 to-transparent lg:max-w-md"
              />

              <div className="space-y-4 lg:space-y-6">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[7px] font-bold tracking-[0.3em] text-[#fbb725]/40 uppercase lg:text-[8px]">
                  {["Produção Familiar", "Artesanal", "Sem Conservantes"].map(
                    (selo, i) => (
                      <ElementReveal
                        key={selo}
                        delay={0.9 + i * 0.05}
                        distance={10}
                      >
                        <span>{selo}</span>
                      </ElementReveal>
                    ),
                  )}
                </div>

                <div className="flex items-center gap-6 lg:gap-10">
                  <div className="flex items-center gap-2">
                    {[Instagram, Facebook].map((Icon, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        className="flex size-9 items-center justify-center rounded-full border border-[#fbb725]/30 bg-[#141414]/90 text-[#fbb725] backdrop-blur-md transition-colors hover:bg-[#fbb725] hover:text-[#141414] lg:size-12"
                      >
                        <Icon className="size-4" />
                      </motion.a>
                    ))}
                  </div>
                  <p className="hidden text-[10px] font-light text-[#f1f1f1]/40 italic sm:block">
                    Direto da roça para sua mesa
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Navegação (Centralizada verticalmente) */}
          <div className="flex flex-grow flex-col justify-center lg:col-span-5 lg:flex-grow-0">
            <nav className="flex w-full flex-col">
              {links.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2 + i * 0.08,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative border-b border-[#fbb725]/10"
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-3 lg:py-6"
                  >
                    <div className="flex items-baseline gap-3 lg:gap-4">
                      <span className="text-[9px] font-bold tracking-widest text-[#fbb725]/30 uppercase lg:text-[10px]">
                        {link.id}
                      </span>
                      <span className="text-lg font-light tracking-tight text-[#f1f1f1] transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#fbb725] lg:text-3xl">
                        {link.name}
                      </span>
                    </div>

                    <div className="flex size-8 items-center justify-center rounded-full border border-[#fbb725]/30 bg-[#141414]/90 text-[#fbb725] backdrop-blur-md transition-all duration-500 group-hover:rotate-[-45deg] group-hover:bg-[#fbb725] group-hover:text-[#141414] lg:size-11">
                      <ArrowRight
                        className="size-4 lg:size-5"
                        strokeWidth={1}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        </div>
      </IoMenuSection>

      {/* Marca d'água fixa no fundo */}
      <div className="pointer-events-none absolute right-0 -bottom-6 overflow-hidden opacity-[0.02] lg:-bottom-10">
        <h2 className="font-bitter text-[25vw] leading-none font-black tracking-tighter whitespace-nowrap text-[#fbb725]">
          ROCERIA
        </h2>
      </div>
    </div>
  );
}

export function MainMenuButton({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const { openMenu } = useUIOverlay();

  return (
    <div
      className={className}
      onClick={() => {
        openMenu(MENU_ID);
      }}
    >
      {children}
    </div>
  );
}
