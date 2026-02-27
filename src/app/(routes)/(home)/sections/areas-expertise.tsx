"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const EXPERTISE = [
  {
    id: "01",
    title: "Direito Corporativo",
    desc: "Assessoria estratégica em operações de M&A, estruturação de holdings, governança corporativa e proteção de interesses societários em cenários de alta complexidade.",
  },
  {
    id: "02",
    title: "Gestão Tributária",
    desc: "Inteligência fiscal aplicada à otimização de ativos, recuperação de créditos e defesa técnica em contenciosos administrativos e judiciais de grande escala.",
  },
  {
    id: "03",
    title: "Propriedade Intelectual",
    desc: "Gestão e blindagem de ativos intangíveis, abrangendo desde o registro de marcas e patentes até a proteção de segredos de negócio em âmbito global.",
  },
  {
    id: "04",
    title: "Direito Digital",
    desc: "Adequação plena à LGPD, gestão de crises cibernéticas, proteção de dados e assessoria jurídica especializada para o ecossistema de tecnologia e inovação.",
  },
];

export function AreasExpertiseSection() {
  const [active, setActive] = useState<number>(0);

  return (
    <section className="text-[#0a0a0b]">
      <div className="container mx-auto px-4">
        {/* HEADER DA SEÇÃO (Mantido e refinado) */}
        <div className="mb-12 flex flex-col items-start justify-between gap-8 border-b border-black/5 lg:flex-row lg:items-end lg:gap-16">
          <div className="max-w-3xl">
            <span className="mb-4 block text-[10px] font-bold tracking-[0.5em] text-[#c5a47e] uppercase">
              Práticas Jurídicas
            </span>
            <h2 className="font-bitter text-5xl font-light lg:text-7xl">
              Nossa <span className="text-[#c5a47e] italic">Expertise.</span>
            </h2>
          </div>
          <p className="max-w-xs border-l border-[#c5a47e]/30 pl-6 text-sm leading-relaxed font-light text-[#0a0a0b]/60">
            Aliamos o rigor técnico da advocacia clássica à agilidade necessária
            para o mercado corporativo moderno.
          </p>
        </div>

        {/* ESTRUTURA SPLIT-SCREEN (Sem Cards) */}
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-24">
          {/* COLUNA ESQUERDA: LISTA INTERATIVA (Ocupa 5 colunas) */}
          <div className="space-y-4 lg:col-span-5">
            <span className="mb-8 block text-[10px] font-bold tracking-[0.3em] text-[#0a0a0b]/30 uppercase">
              Verticais de Atuação
            </span>

            {EXPERTISE.map((area, index) => {
              const isActive = active === index;

              return (
                <div
                  key={area.id}
                  onMouseEnter={() => setActive(index)}
                  className="group relative flex cursor-pointer items-center justify-between border-b border-black/5 py-6 transition-colors duration-300"
                >
                  {/* Título com Indicação Numérica sutil */}
                  <div className="flex items-baseline gap-6">
                    <span className="font-bitter text-xs font-medium text-[#0a0a0b]/30 transition-colors group-hover:text-[#c5a47e]">
                      {area.id}
                    </span>
                    <h3
                      className={cn(
                        "font-bitter text-xl font-bold transition-all duration-500 lg:text-xl",
                        isActive
                          ? "text-[#c5a47e]"
                          : "text-[#0a0a0b] group-hover:text-[#c5a47e]/70",
                      )}
                    >
                      {area.title}
                    </h3>
                  </div>

                  {/* Linha Decorativa Ativa (Motion) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeLine"
                      className="absolute bottom-[-1px] left-0 h-px w-full bg-[#c5a47e]"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* COLUNA DIREITA: PAINEL DE CONTEÚDO (Ocupa 7 colunas) */}
          <div className="relative h-full min-h-[300px] lg:col-span-7 lg:pl-16">
            <div className="absolute top-0 left-0 hidden h-full w-px bg-black/5 lg:block" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex h-full flex-col justify-between"
              >
                <div>
                  <span className="font-bitter mb-12 block text-sm font-bold tracking-[0.2em] text-[#0a0a0b]/40 uppercase">
                    Detalhamento da Prática
                  </span>

                  <p className="max-w-2xl text-lg leading-relaxed font-light text-[#0a0a0b]/70 lg:text-lg">
                    {EXPERTISE[active].desc}
                  </p>
                </div>

                {/* Botão de Ação Minimalista */}
                <button className="group mt-16 flex items-center gap-4 self-start border-b border-[#0a0a0b]/10 pb-2 transition-colors hover:border-[#c5a47e]">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-[#0a0a0b] uppercase transition-colors group-hover:text-[#c5a47e]">
                    Explorar Especialidade
                  </span>
                  <div className="h-px w-8 bg-[#0a0a0b] transition-all group-hover:w-12 group-hover:bg-[#c5a47e]" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
