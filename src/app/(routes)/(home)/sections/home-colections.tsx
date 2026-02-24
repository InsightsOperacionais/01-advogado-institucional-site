"use client";

import { ElementReveal } from "@/components/layout/element-reveal";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

// ===== COLLECTIONS DATA =====
const COLLECTIONS = [
  {
    id: 1,
    title: "Queijos Artesanais",
    color: "bg-[#fbb725]",
    product: "Minas, Canastra, Coalho",
    desc: "Maturados no serro mineiro, sabor intenso e textura cremosa. Produção familiar com receitas centenárias.",
    icon: "🧀",
  },
  {
    id: 2,
    title: "Embutidos Defumados",
    color: "bg-[#141414]",
    product: "Linguiças, Paio, Bacon",
    desc: "Defumados no fumeiro tradicional, com temperos selecionados e processo artesanal de cura.",
    icon: "🌭",
  },
  {
    id: 3,
    title: "Temperos & Molhos",
    color: "bg-[#fbb725]",
    product: "Pimenta, Alho, Ervas",
    desc: "Temperos caseiros feitos com ingredientes frescos da horta, sem conservantes ou industrialização.",
    icon: "🌶️",
  },
  {
    id: 4,
    title: "Conservas",
    color: "bg-[#141414]",
    product: "Palmito, Pepino, Alcachofra",
    desc: "Vegetais selecionados em conserva, mantendo o sabor original e a textura crocante.",
    icon: "🥒",
  },
  {
    id: 5,
    title: "Doces Caseiros",
    color: "bg-[#fbb725]",
    product: "Goiabada, Doce de Leite",
    desc: "Doces tradicionais feitos no tacho de cobre, com frutas selecionadas e receitas de família.",
    icon: "🍯",
  },
];

export function ColectionSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const isDarkBackground = (colorClass: string) => {
    return colorClass.includes("#141414") || colorClass.includes("bg-black");
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* HEADER */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-13 lg:gap-8">
          <div className="order-3 flex flex-col items-start gap-4 lg:order-1 lg:col-span-3 lg:gap-6">
            <div className="hidden h-px w-12 bg-[#fbb725]/50 lg:block" />
            <ElementReveal delay={0.2}>
              <p className="max-w-[280px] text-xs leading-relaxed font-light text-[#141414]/60 lg:text-sm">
                Cada produto é uma herança familiar. Desenvolvidos com técnicas
                tradicionais para levar o sabor autêntico da roça à sua mesa.
              </p>
            </ElementReveal>
            <ElementReveal delay={0.4}>
              <button className="group flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-[#fbb725] uppercase">
                Explorar Todos
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </button>
            </ElementReveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7 lg:mb-12">
            <h2 className="font-bitter text-4xl leading-none font-light text-[#141414] lg:text-7xl">
              <ElementReveal>
                Escolha sua{" "}
                <span className="font-black text-[#fbb725]">tradição</span>
              </ElementReveal>
              <br className="hidden lg:block" />
              <ElementReveal delay={0.2}>
                <span>favorita</span>
              </ElementReveal>
            </h2>
          </div>

          <div className="order-2 -my-10 flex items-center justify-between lg:order-3 lg:col-span-3 lg:my-0 lg:justify-end lg:text-right">
            <div className="mr-4 h-px flex-1 bg-[#141414]/10 lg:hidden" />
            <div>
              <span className="font-bitter text-4xl font-black text-[#fbb725]/20 lining-nums lg:text-6xl">
                0{COLLECTIONS.length}
              </span>
              <p className="text-[8px] font-bold tracking-[0.3em] text-[#fbb725] uppercase lg:text-[10px]">
                Linhas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ÁREA DAS COLEÇÕES - Adaptável Mobile/Desktop */}
      <div className="container mx-auto mt-6 flex h-[600px] w-full flex-col gap-3 lg:h-[450px] lg:flex-row lg:gap-4">
        {COLLECTIONS.map((col, index) => {
          const isExpanded = expandedIndex === index;
          const isDarkBg = isDarkBackground(col.color);

          return (
            <motion.div
              key={col.id}
              onClick={() => setExpandedIndex(index)}
              onMouseEnter={() =>
                window.innerWidth > 1024 && setExpandedIndex(index)
              }
              className={cn(
                "relative cursor-pointer overflow-hidden rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isExpanded ? "flex-[5] lg:flex-[4]" : "flex-1 lg:flex-1",
              )}
            >
              {/* Background */}
              <div
                className={cn(
                  "absolute inset-0 transition-all duration-700",
                  col.color,
                )}
              >
                <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
              </div>

              <div className="relative flex h-full flex-col justify-between p-5 lg:p-10">
                {/* Top Info */}
                <div
                  className={cn(
                    "flex items-start justify-between transition-all duration-500",
                    isExpanded ? "opacity-100" : "opacity-0 lg:opacity-0",
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <span
                      className={cn(
                        "text-[9px] font-bold tracking-[0.4em] uppercase",
                        isDarkBg ? "text-white/60" : "text-[#141414]/60",
                      )}
                    >
                      Linha Artesanal
                    </span>
                    <h3
                      className={cn(
                        "font-bitter text-xl font-medium lg:text-4xl",
                        isDarkBg ? "text-white" : "text-[#141414]",
                      )}
                    >
                      {col.title}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      "font-bitter text-2xl opacity-30 lg:text-5xl",
                      isDarkBg ? "text-white" : "text-[#141414]",
                    )}
                  >
                    {col.icon}
                  </span>
                </div>

                {/* Center Label (Product Name) */}
                <div
                  className={cn(
                    "flex items-center justify-center transition-all duration-700",
                    isExpanded ? "flex-1" : "absolute inset-0",
                  )}
                >
                  <p
                    className={cn(
                      "font-bitter tracking-[0.1em] whitespace-nowrap transition-all duration-700",
                      isExpanded
                        ? isDarkBg
                          ? "text-lg text-white lg:text-2xl"
                          : "text-lg text-[#141414] lg:text-2xl"
                        : cn(
                            "text-sm font-bold opacity-40",
                            isDarkBg ? "text-white" : "text-[#141414]",
                            "rotate-0 lg:rotate-90", // Só rotaciona no desktop quando fechado
                          ),
                    )}
                  >
                    {isExpanded ? col.product : col.title}
                  </p>
                </div>

                {/* Bottom Content */}
                <div
                  className={cn(
                    "w-full transition-all duration-700",
                    isExpanded
                      ? "translate-y-0 opacity-100"
                      : "invisible absolute translate-y-10 opacity-0",
                  )}
                >
                  <div
                    className={cn(
                      "mb-4 h-px w-full lg:mb-6",
                      isDarkBg ? "bg-white/20" : "bg-[#141414]/20",
                    )}
                  />
                  <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
                    <p
                      className={cn(
                        "max-w-[320px] text-[11px] leading-relaxed font-light lg:text-sm",
                        isDarkBg ? "text-white/80" : "text-[#141414]/80",
                      )}
                    >
                      {col.desc}
                    </p>
                    <button
                      className={cn(
                        "group flex w-full items-center justify-center gap-4 rounded-full border px-6 py-3 text-[10px] font-bold tracking-widest uppercase transition-all lg:w-auto",
                        isDarkBg
                          ? "border-white/30 bg-white/10 text-white"
                          : "border-[#141414]/30 bg-[#141414]/10 text-[#141414]",
                      )}
                    >
                      Ver produtos
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
