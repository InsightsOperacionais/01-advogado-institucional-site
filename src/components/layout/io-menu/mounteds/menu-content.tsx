// components/layout/io-menu/mounteds/main-menu.tsx
"use client";

import { useRegisterMenu } from "@/providers/menu-context"; // Import atualizado
import { motion } from "framer-motion";
import { ArrowRight, Facebook, Instagram, Twitter, Wheat } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { ElementReveal } from "../../element-reveal";
import { IoMenuButton, IoMenuSection } from "../io-menu";

// ===== CONFIGURAÇÃO DO MENU =====
const MENU_ID = "main-menu";
const MENU_ORIGIN = "top-right";
const MENU_THEME = "dark";

// ===== CONTEÚDO DO MENU =====
interface MainMenuContentProps {
  theme?: "light" | "dark";
  onClose?: () => void;
  children?: ReactNode;
}

const links = [
  { id: "01", name: "Início", href: "/roceria" },
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
  children,
}: MainMenuContentProps) {
  const isDark = theme === "dark";

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#141414] px-8 py-10 text-[#f1f1f1] lg:px-20 lg:py-16">
      {/* Background Glow sutil */}
      <div className="pointer-events-none absolute -top-24 right-0 size-[500px] rounded-full bg-[#fbb725]/5 blur-[120px]" />

      <IoMenuSection theme={theme}>
        <div className="relative z-10 grid h-full w-full grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch">
          {/* LADO ESQUERDO: Título + Footer Alinhado */}
          <div className="flex flex-col justify-between pb-4 lg:col-span-7">
            <div className="mt-10">
              <ElementReveal distance={20}>
                <h1 className="font-bitter text-[clamp(4rem,15vw,10rem)] leading-[0.8] font-light tracking-tighter text-[#f1f1f1]">
                  Menu
                </h1>
              </ElementReveal>
            </div>

            <div className="flex flex-col items-start gap-8">
              {/* Linha decorativa direcional */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1 }}
                className="h-px max-w-md bg-gradient-to-r from-[#fbb725]/40 via-[#fbb725]/10 to-transparent"
              />

              <div className="space-y-6">
                {/* Selos de Qualidade */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[8px] font-bold tracking-[0.3em] text-[#fbb725]/40 uppercase">
                  {[
                    "Produção Familiar",
                    "Artesanal",
                    "Sem Conservantes",
                    "Defumado",
                  ].map((selo, i) => (
                    <ElementReveal
                      key={selo}
                      delay={0.9 + i * 0.05}
                      distance={20}
                    >
                      <span>{selo}</span>
                    </ElementReveal>
                  ))}
                </div>

                {/* Botões Sociais */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
                  <div className="flex items-center gap-2">
                    {[
                      { Icon: Instagram, href: "#", label: "Instagram" },
                      { Icon: Facebook, href: "#", label: "Facebook" },
                      { Icon: Twitter, href: "#", label: "Twitter" },
                    ].map(({ Icon, href, label }, i) => (
                      <motion.a
                        key={label}
                        href={href}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.1 + i * 0.1 }}
                        className="flex size-10 items-center justify-center rounded-full border border-[#fbb725]/30 bg-[#141414]/90 text-[#fbb725] backdrop-blur-md transition-colors hover:bg-[#fbb725] hover:text-[#141414] lg:size-12"
                      >
                        <Icon className="size-4" />
                      </motion.a>
                    ))}
                  </div>

                  <ElementReveal delay={1.3}>
                    <p className="flex items-center gap-2 text-[10px] font-light text-[#f1f1f1]/40 italic">
                      <Wheat className="size-3 text-[#fbb725]/60" />
                      Direto da roça para sua mesa
                    </p>
                  </ElementReveal>
                </div>

                <ElementReveal delay={1.4}>
                  <p className="text-[9px] font-light tracking-widest text-[#f1f1f1]/20 lining-nums">
                    © {new Date().getFullYear()} ROCERIA ARTESANAL
                  </p>
                </ElementReveal>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: Navegação Numerada */}
          <div className="flex flex-col justify-center lg:col-span-5">
            <nav className="w-full">
              {links.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.3 + i * 0.1,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative border-b border-[#fbb725]/10"
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-5 lg:py-7"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-[10px] font-bold tracking-widest text-[#fbb725]/30 uppercase">
                        {link.id}
                      </span>
                      <span className="text-xl font-light tracking-tight text-[#f1f1f1] transition-all group-hover:pl-4 group-hover:text-[#fbb725] lg:text-3xl">
                        {link.name}
                      </span>
                    </div>

                    {/* Círculo da seta */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#fbb725]/30 bg-[#141414]/90 text-[#fbb725] backdrop-blur-md transition-all duration-500 group-hover:rotate-[-45deg] group-hover:bg-[#fbb725] group-hover:text-[#141414] lg:h-12 lg:w-12">
                      <ArrowRight size={18} strokeWidth={1} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        </div>
      </IoMenuSection>

      {/* Marca d'água monumental */}
      <div className="pointer-events-none absolute right-0 -bottom-10 overflow-hidden opacity-[0.02] select-none">
        <h2 className="font-bitter text-[22vw] leading-none font-black tracking-tighter whitespace-nowrap text-[#fbb725]">
          ROCERIA
        </h2>
      </div>
    </div>
  );
}

// ===== BOTÃO DO MENU COM AUTO-REGISTRO =====
interface MainMenuButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function MainMenuButton({ children, className }: MainMenuButtonProps) {
  // Registra o menu automaticamente quando o botão é montado
  useRegisterMenu({
    id: MENU_ID,
    component: MainMenuContent,
    origin: MENU_ORIGIN,
    theme: MENU_THEME,
  });

  return (
    <IoMenuButton menuId={MENU_ID} className={className}>
      {children}
    </IoMenuButton>
  );
}
