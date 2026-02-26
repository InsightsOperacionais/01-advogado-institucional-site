"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const EXPERTISE = [
  {
    id: "01",
    title: "Direito Corporativo",
    slug: "corporativo",
    color: "bg-[#0a0a0b]", // Preto profundo para contraste
    desc: "Assessoria estratégica em operações de M&A, estruturação de holdings, governança corporativa e proteção de interesses societários em cenários de alta complexidade.",
  },
  {
    id: "02",
    title: "Gestão Tributária",
    slug: "tributario",
    color: "bg-[#161d2b]", // Navy escuro
    desc: "Inteligência fiscal aplicada à otimização de ativos, recuperação de créditos e defesa técnica em contenciosos administrativos e judiciais de grande escala.",
  },
  {
    id: "03",
    title: "Propriedade Intelectual",
    slug: "ip",
    color: "bg-[#0a0a0b]",
    desc: "Gestão e blindagem de ativos intangíveis, abrangendo desde o registro de marcas e patentes até a proteção de segredos de negócio em âmbito global.",
  },
  {
    id: "04",
    title: "Direito Digital",
    slug: "digital",
    color: "bg-[#161d2b]",
    desc: "Adequação plena à LGPD, gestão de crises cibernéticas, proteção de dados e assessoria jurídica especializada para o ecossistema de tecnologia e inovação.",
  },
];

export function AreasExpertiseSection() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="w-full">
      {/* HEADER DA SEÇÃO */}
      <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <span className="mb-4 block text-[10px] font-bold tracking-[0.5em] text-[#c5a47e] uppercase">
            Práticas Jurídicas
          </span>
          <h2 className="font-bitter text-5xl font-light text-[#0a0a0b] lg:text-7xl">
            Nossa <span className="font-black text-[#c5a47e]">Expertise</span>
          </h2>
        </div>
        <p className="max-w-xs border-l border-[#c5a47e] pl-6 text-xs leading-relaxed font-light text-[#0a0a0b]/60">
          Aliamos o rigor técnico da advocacia clássica à agilidade necessária
          para o mercado corporativo moderno.
        </p>
      </div>

      {/* GRID DE CARDS EXPANSÍVEIS */}
      <div className="flex h-[550px] flex-col gap-3 lg:flex-row lg:gap-4">
        {EXPERTISE.map((area, index) => {
          const isExpanded = active === index;

          return (
            <motion.div
              key={area.id}
              onMouseEnter={() => setActive(index)}
              className={cn(
                "relative cursor-pointer overflow-hidden rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isExpanded
                  ? "flex-[4] shadow-2xl shadow-[#c5a47e]/10"
                  : "flex-1",
                area.color,
              )}
            >
              {/* Overlay de Textura Sutil */}
              <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

              <div className="relative flex h-full flex-col justify-between p-8 lg:p-10">
                {/* TOP: NUMERAÇÃO E ÍCONE DE AÇÃO */}
                <div className="flex items-start justify-between">
                  <span className="font-bitter text-5xl font-black tracking-tighter text-[#c5a47e]/20 transition-all duration-500 group-hover:text-[#c5a47e]/40">
                    {area.id}
                  </span>
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full border border-[#c5a47e]/30 text-[#c5a47e] transition-all duration-500",
                      isExpanded
                        ? "rotate-0 bg-[#c5a47e] text-[#0a0a0b]"
                        : "rotate-45 opacity-40",
                    )}
                  >
                    <ArrowUpRight className="size-5" />
                  </div>
                </div>

                {/* BOTTOM: CONTEÚDO */}
                <div
                  className={cn(
                    "transition-all duration-500 ease-out",
                    isExpanded ? "translate-y-0" : "translate-y-4",
                  )}
                >
                  <h3
                    className={cn(
                      "font-bitter mb-6 text-2xl font-bold transition-all duration-500",
                      isExpanded ? "text-3xl text-white" : "text-white/60",
                    )}
                  >
                    {area.title}
                  </h3>

                  {/* Container de Altura Dinâmica para a descrição */}
                  <div
                    className={cn(
                      "grid transition-all duration-700 ease-in-out",
                      isExpanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-md border-t border-white/10 pt-6 text-sm leading-relaxed font-light text-white/50">
                        {area.desc}
                      </p>

                      <button className="mt-8 text-[10px] font-bold tracking-[0.3em] text-[#c5a47e] uppercase transition-colors hover:text-white">
                        Explorar Especialidade
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
