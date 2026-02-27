"use client";
import { ElementReveal } from "@/components/layout/element-reveal";

export function AtuacaoHero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0b] pt-32 pb-32 text-white">
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-0 left-0 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5a47e]/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-full w-1/3 bg-gradient-to-l from-[#c5a47e]/5 to-transparent" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* Coluna de Texto (Ocupa 7 colunas) */}
          <div className="lg:col-span-8">
            <ElementReveal>
              <div className="mb-8 flex items-center gap-4">
                <div className="h-px w-12 bg-[#c5a47e]" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                  Práticas Institucionais
                </span>
              </div>
            </ElementReveal>

            <ElementReveal delay={0.2}>
              <h1 className="font-bitter text-5xl leading-[1.1] font-light lg:text-8xl">
                Complexidade Técnica. <br />
                <span className="text-[#c5a47e] italic">
                  Segurança Patrimonial.
                </span>
              </h1>
            </ElementReveal>

            <ElementReveal delay={0.4} className="mt-12">
              <div className="max-w-xl border-l-2 border-[#c5a47e]/20 pl-8">
                <p className="text-lg leading-relaxed font-light text-white/40">
                  A Von Marins provê a arquitetura jurídica necessária para a
                  preservação de legados e a viabilização de operações globais,
                  onde o rigor técnico é a premissa absoluta.
                </p>
              </div>
            </ElementReveal>
          </div>
        </div>
      </div>

      {/* Linha de rodapé do Hero */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#c5a47e]/30 to-transparent" />
    </section>
  );
}
