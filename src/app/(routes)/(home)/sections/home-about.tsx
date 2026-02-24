"use client";
import { ElementReveal } from "@/components/layout/element-reveal";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ChevronDown, Flame, Timer, Wheat } from "lucide-react";
import { useState } from "react";

// ===== ACCORDION DATA =====
const ACCORDION_DATA = [
  {
    id: 1,
    title: "Nossa História",
    icon: <Wheat className="size-4" />,
    content:
      "Fundada por famílias de produtores rurais que há gerações cultivam a terra com respeito e dedicação. A ROCERIA nasce do desejo de compartilhar receitas tradicionais e o sabor autêntico da roça com quem valoriza a boa comida.",
  },
  {
    id: 2,
    title: "Produção Artesanal",
    icon: <Flame className="size-4" />,
    content:
      "Todos os produtos são feitos de forma artesanal, com técnicas passadas de geração em geração. Queijos maturados no serro, embutidos defumados no fumeiro, conservas preparadas manualmente. Nada de industrialização excessiva.",
  },
  {
    id: 3,
    title: "Compromisso com a Terra",
    icon: <Timer className="size-4" />,
    content:
      "Valorizamos a produção sustentável, o respeito ao ciclo da natureza e o comércio justo. Trabalhamos diretamente com famílias produtoras que compartilham nosso compromisso com a qualidade e a preservação ambiental.",
  },
  {
    id: 4,
    title: "Certificações",
    icon: <Award className="size-4" />,
    content:
      "Nossos produtos carregam selos de qualidade: Produção Familiar, Artesanal, Sem Conservantes, Defumado no Fumeiro e Safra Atual. Garantia de procedência e rastreabilidade em cada etapa.",
  },
];

// ===== ABOUT SECTION =====
export function AboutSection() {
  const [openItems, setOpenItems] = useState([1]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section className="flex h-full w-full flex-col gap-8 bg-[#141414] px-5 py-10 text-[#f1f1f1] lg:flex-row lg:px-12 lg:py-20">
      {/* Lado Esquerdo */}
      <div className="flex w-full flex-col justify-between gap-5 lg:flex-1 lg:pr-10">
        <div className="font-bitter flex flex-col items-start text-4xl font-extralight text-[#f1f1f1] lg:text-7xl">
          <ElementReveal>
            Sabor que <span className="font-black text-[#fbb725]">vem</span>
          </ElementReveal>
          <ElementReveal delay={0.2}>
            da <span className="text-[#fbb725]/60">terra</span>
          </ElementReveal>
          <ElementReveal delay={0.3} className="font-black text-[#fbb725]">
            ROCERIA
          </ElementReveal>
        </div>

        <div className="flex flex-col gap-4">
          <ElementReveal delay={0.4}>
            <p className="max-w-xs text-sm font-light text-[#f1f1f1]/60">
              Produtos artesanais que celebram a tradição rural, o sabor caseiro
              e a produção familiar. Direto do produtor para sua casa.
            </p>
          </ElementReveal>

          <ElementReveal delay={0.5}>
            {/* Placeholder do Vídeo */}
            <div className="group relative h-40 w-64 overflow-hidden rounded-2xl bg-gradient-to-br from-[#fbb725]/20 to-[#141414] shadow-lg lg:h-48 lg:w-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-[#fbb725]/90 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110 lg:size-16">
                  <div className="ml-1 size-0 border-y-8 border-r-0 border-l-12 border-y-transparent border-l-[#141414]"></div>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 rounded-full bg-[#141414]/80 px-3 py-1 text-xs font-medium text-[#fbb725] backdrop-blur-sm">
                Conheça nossa história
              </div>
            </div>
          </ElementReveal>
        </div>
      </div>

      {/* Lado Direito - O Acordeão */}
      <div className="w-full lg:flex-1 lg:pl-10">
        {/* O flex-1 aqui força as duas colunas a terem exatamente 50% cada, 
        independente de estarem abertas ou fechadas */}
        <ElementReveal delay={0.6} className="w-full">
          <div className="flex w-full flex-col gap-3">
            {/* O min-h garante que, mesmo tudo fechado, o espaço seja preservado */}
            {ACCORDION_DATA.map((item, index) => {
              const isOpen = openItems.includes(item.id);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={cn(
                    "rounded-2xl border transition-all duration-300",
                    isOpen
                      ? "border-[#fbb725]/30 bg-gradient-to-br from-[#fbb725]/10 to-[#141414]/50"
                      : "border-transparent hover:border-[#fbb725]/20",
                  )}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full items-center justify-between p-4 text-left lg:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex size-6 items-center justify-center rounded-full transition-all lg:size-8",
                          isOpen
                            ? "bg-[#fbb725] text-[#141414]"
                            : "bg-[#fbb725]/20 text-[#fbb725]",
                        )}
                      >
                        {item.icon}
                      </div>
                      <span
                        className={cn(
                          "text-sm font-medium transition-colors lg:text-base",
                          isOpen ? "text-[#fbb725]" : "text-[#f1f1f1]/60",
                        )}
                      >
                        {item.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "size-4 text-[#fbb725] transition-transform duration-300 lg:size-5",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pt-0 pb-4 lg:px-5 lg:pb-5">
                          <div className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-[#fbb725]/50 to-transparent" />
                          <p className="text-xs leading-relaxed font-light text-[#f1f1f1]/60 lg:text-sm">
                            {item.content}
                          </p>

                          {item.id === 2 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {[
                                "Defumado no Fumeiro",
                                "Cura Natural",
                                "Sem Conservantes",
                              ].map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-[#fbb725]/10 px-2 py-1 text-xs font-medium text-[#fbb725] lg:px-3"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {item.id === 4 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {[
                                "Produção Familiar",
                                "Artesanal",
                                "Sem Conservantes",
                                "Defumado no Fumeiro",
                                "Safra Atual",
                              ].map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-[#fbb725]/10 px-2 py-1 text-xs font-medium text-[#fbb725] lg:px-3"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </ElementReveal>
      </div>
    </section>
  );
}
