"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ChevronRight,
  Handshake,
  Landmark,
  Scale,
} from "lucide-react";
import { useState } from "react";

const VALUES = [
  {
    id: 1,
    title: "Governança e Transparência",
    icon: <Landmark size={20} />,
    content:
      "Nossa operação é regida pela prestação de contas sistemática. Disponibilizamos relatórios técnicos de auditoria e acesso direto às teses processuais, garantindo clareza absoluta e segurança institucional.",
  },
  {
    id: 2,
    title: "Profundidade Técnica",
    icon: <Scale size={20} />,
    content:
      "A prática jurídica na Von Marins é pautada pelo rigor acadêmico. Nossa banca aplica jurisprudência avançada e doutrina clássica no desenvolvimento de estruturas preventivas e blindagem patrimonial.",
  },
  {
    id: 3,
    title: "Viabilização de Negócios",
    icon: <Briefcase size={20} />,
    content:
      "Entendemos o Direito como um pilar da estratégia empresarial. Atuamos na mitigação técnica de riscos e na otimização de operações, assegurando que a conformidade seja um facilitador de crescimento.",
  },
  {
    id: 4,
    title: "Arquitetura Jurídica Singular",
    icon: <Handshake size={20} />,
    content:
      "Desenvolvemos soluções sob medida, alinhadas aos objetivos específicos de cada grupo familiar ou corporativo, priorizando a precisão técnica sobre modelos genéricos.",
  },
  // {
  //   id: 5,
  //   title: "Protocolos de Confidencialidade",
  //   icon: <ShieldCheck size={20} />,
  //   content:
  //     "Implementamos normas rígidas de segurança da informação e discrição profissional, garantindo que dados sensíveis permaneçam restritos ao ambiente de decisão.",
  // },
];

export function FirmValuesSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#0a0a0b] text-white">
      <div className="container mx-auto px-6">
        {/* Topo: Título e Descrição (Full Width) */}
        <div className="mb-8 border-b border-white/5 pb-12">
          <span className="text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
            Diretrizes Institucionais
          </span>
          <div className="mt-6 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="font-bitter max-w-2xl text-4xl font-light lg:text-6xl">
              A solidez do legado. <br />A precisão do{" "}
              <span className="text-[#c5a47e] italic">agora.</span>
            </h2>
            <p className="max-w-md border-l border-[#c5a47e]/30 pl-6 text-sm leading-relaxed font-light text-white/40">
              Atuamos na intersecção entre a alta técnica jurídica e a visão
              estratégica de mercado. Nossa prática é definida pelo rigor e pelo
              compromisso com a perenidade dos interesses confiados à nossa
              banca.
            </p>
          </div>
        </div>

        {/* Conteúdo: Acordeon e Imagem Lado a Lado */}
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* Coluna Esquerda: Acordeon */}
          <div className="space-y-2">
            {VALUES.map((val, i) => (
              <div key={val.id} className="border-b border-white/5">
                <button
                  onClick={() => setOpen(i)}
                  className="flex w-full items-center justify-between py-6 text-left transition-all hover:pl-2"
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={cn(
                        "transition-colors duration-500",
                        open === i ? "text-[#c5a47e]" : "text-white/20",
                      )}
                    >
                      {val.icon}
                    </span>
                    <span
                      className={cn(
                        "text-lg tracking-tight transition-all duration-500",
                        open === i
                          ? "font-bold text-white"
                          : "font-light text-white/50",
                      )}
                    >
                      {val.title}
                    </span>
                  </div>
                  <ChevronRight
                    className={cn(
                      "size-4 transition-transform duration-500",
                      open === i ? "rotate-90 text-[#c5a47e]" : "text-white/10",
                    )}
                  />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-[45px]">
                        <p className="max-w-md text-sm leading-relaxed font-light text-white/40">
                          {val.content}
                        </p>
                        <div className="mt-6 flex gap-8">
                          <div className="flex flex-col">
                            <span className="text-[9px] font-bold tracking-widest text-[#c5a47e] uppercase">
                              Padrão
                            </span>
                            <span className="text-[11px] tracking-tighter text-white/20 uppercase">
                              Rigor Institucional
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] font-bold tracking-widest text-[#c5a47e] uppercase">
                              Entrega
                            </span>
                            <span className="text-[11px] tracking-tighter text-white/20 uppercase">
                              Alta Complexidade
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Coluna Direita: Imagem Card (Sticky para melhor UX) */}
          <div className="sticky top-24 hidden justify-center lg:flex">
            <div className="relative aspect-[14.5/10] w-full overflow-hidden rounded-2xl grayscale transition-all duration-1000 hover:grayscale-0">
              <div className="absolute inset-0 z-10 bg-linear-to-t from-[#0a0a0b] via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 z-10 rounded-2xl border border-white/5" />
              <img
                src="/assets/team/faixada.png"
                alt="Ambiente Von Marins"
                className="h-full w-full object-cover transition-transform duration-[3s] hover:scale-105"
              />
              <div className="absolute bottom-8 left-8 z-20">
                <span className="font-bitter mb-1 block text-4xl font-black text-white/10">
                  1994
                </span>
                <p className="text-[9px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                  Sede São Paulo
                </p>
              </div>
            </div>
            {/* Elemento Decorativo de Fundo */}
            <div className="absolute -right-10 -bottom-10 size-64 rounded-full bg-[#c5a47e]/5 blur-[100px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
