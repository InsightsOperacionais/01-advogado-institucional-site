"use client";

import { useUIOverlay } from "@/providers/ui-overlay-context";
import { siteConfig } from "@/lib/site-config";
import { motion } from "framer-motion";
import { ArrowRight, Gavel, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { ElementReveal } from "../../element-reveal";
import { IoMenuSection } from "../io-menu-primitives";

// MUDANÇA AQUI: Volte para o ID que o seu Provider já reconhece
const MENU_ID = "main-menu";

interface MainMenuContentProps {
  theme?: "light" | "dark";
  onClose?: () => void;
  children?: ReactNode;
}

const links = [
  { id: "01", name: "Início", href: "/" },
  { id: "02", name: "Áreas de Atuação", href: "/atuacao" },
  { id: "03", name: "O Escritório", href: "/sobre" },
  { id: "04", name: "Corpo Jurídico", href: "/equipe" },
  { id: "05", name: "Insights & Teses", href: "/insights" },
  { id: "06", name: "Contato Direto", href: "/contato" },
];

export function MainMenuContent({
  theme = "dark",
  onClose,
}: MainMenuContentProps) {
  const { closeMenu } = useUIOverlay(); // Importante para fechar ao clicar nos links

  const handleLinkClick = () => {
    if (onClose) onClose();
    closeMenu();
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-[#0a0a0b] text-[#f1f1f1] selection:bg-[#c5a47e] selection:text-[#0a0a0b]">
      {/* Background Glow Bronze */}
      <div className="pointer-events-none absolute -top-24 right-0 size-[600px] rounded-full bg-[#c5a47e]/5 blur-[120px]" />

      <IoMenuSection theme={theme}>
        <div className="relative z-10 flex h-full flex-col justify-between px-8 py-10 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-20 lg:py-16">
          {/* COLUNA ESQUERDA: Institucional */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div className="mt-4 lg:mt-10">
              <ElementReveal distance={40}>
                <span className="mb-4 block text-[10px] font-bold tracking-[0.5em] text-[#c5a47e] uppercase">
                  Navegação
                </span>
                <h1 className="font-bitter pb-2 text-[12vw] leading-[0.8] font-light tracking-tighter text-[#f1f1f1] lg:text-[8vw]">
                  Estratégia
                </h1>
              </ElementReveal>
            </div>

            <div className="mb-6 flex flex-col items-start gap-6 lg:mb-0 lg:gap-10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1 }}
                className="h-px max-w-[200px] bg-gradient-to-r from-[#c5a47e]/40 via-[#c5a47e]/10 to-transparent lg:max-w-md"
              />

              <div className="space-y-6">
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-[8px] font-bold tracking-[0.4em] text-[#c5a47e]/40 uppercase">
                  {[
                    "Chambers Global",
                    "The Legal 500",
                    "OAB/SP",
                    "ISO 9001",
                  ].map((selo, i) => (
                    <ElementReveal
                      key={selo}
                      delay={0.9 + i * 0.05}
                      distance={10}
                    >
                      <span className="cursor-default transition-colors hover:text-[#c5a47e]">
                        {selo}
                      </span>
                    </ElementReveal>
                  ))}
                </div>

                <div className="flex items-center gap-6 lg:gap-10">
                  <div className="flex items-center gap-3">
                    {[Linkedin, Instagram].map((Icon, i) => (
                      <motion.a
                        key={i}
                        href={
                          i === 0
                            ? siteConfig.social.linkedin
                            : siteConfig.social.instagram
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex size-10 items-center justify-center rounded-full border border-[#c5a47e]/20 bg-white/5 text-[#c5a47e] backdrop-blur-md transition-all hover:bg-[#c5a47e] hover:text-[#0a0a0b]"
                      >
                        <Icon className="size-4" />
                      </motion.a>
                    ))}
                  </div>
                  <p className="hidden text-[10px] font-light tracking-widest text-[#f1f1f1]/30 italic lg:block">
                    Defesa intransigente da sua liberdade e patrimônio.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Links */}
          <div className="flex flex-grow flex-col justify-center lg:col-span-6 lg:flex-grow-0 lg:pl-12">
            <nav className="flex w-full flex-col">
              {links.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2 + i * 0.08,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative border-b border-white/5"
                >
                  <Link
                    href={link.href}
                    onClick={handleLinkClick} // Função para fechar o menu ao navegar
                    className="flex items-center justify-between py-4 lg:py-8"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-[9px] font-black text-[#c5a47e]/20 uppercase italic lg:text-[10px]">
                        {link.id}
                      </span>
                      <span className="font-bitter text-xl font-light tracking-tight text-[#f1f1f1] transition-all duration-500 group-hover:translate-x-4 group-hover:text-[#c5a47e] lg:text-5xl">
                        {link.name}
                      </span>
                    </div>

                    <div className="-translate-x-10 opacity-0 transition-all duration-700 group-hover:translate-x-0 group-hover:opacity-100">
                      <ArrowRight
                        className="size-6 text-[#c5a47e]"
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

      {/* Marca d'água */}
      <div className="pointer-events-none absolute -bottom-8 left-0 overflow-hidden opacity-[0.03] lg:-bottom-12">
        <h2 className="font-bitter text-[20vw] leading-none font-black tracking-tighter whitespace-nowrap text-[#c5a47e]">
          VON MARINS
        </h2>
      </div>

      <div className="pointer-events-none absolute top-1/2 right-20 -translate-y-1/2 opacity-[0.02]">
        <Gavel size={600} strokeWidth={0.5} />
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
      onClick={() => openMenu(MENU_ID)} // Agora usa o MENU_ID ("main-menu") sincronizado
    >
      {children}
    </div>
  );
}
