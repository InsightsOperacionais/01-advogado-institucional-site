"use client";
import { ElementReveal } from "@/components/layout/element-reveal";
import Image from "next/image";

export function EquipeHero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0b] px-4 pt-24 pb-24 text-white">
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-0 left-0 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5a47e]/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-full w-1/3 bg-gradient-to-l from-[#c5a47e]/5 to-transparent" />

      <div className="relative z-10 container mx-auto">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* Coluna de Texto (Ocupa 7 colunas) */}
          <div className="flex flex-col lg:col-span-7">
            <ElementReveal>
              <div className="mb-8 flex items-center gap-4">
                <div className="h-px w-12 bg-[#c5a47e]" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                  Corpo Intelectual
                </span>
              </div>
            </ElementReveal>

            <ElementReveal delay={0.2}>
              <h1 className="font-bitter text-5xl leading-[1.1] font-light lg:text-8xl">
                Expertise que <br />
                <span className="text-[#c5a47e] italic">define o padrão</span>
              </h1>
            </ElementReveal>

            <ElementReveal delay={0.4} className="mt-12">
              <div className="max-w-xl border-l-2 border-[#c5a47e]/20 pl-8">
                <p className="text-lg leading-relaxed font-light text-white/40">
                  Reunimos profissionais cujas trajetórias são pautadas pelo
                  rigor acadêmico e pela entrega de soluções estratégicas.
                  Operamos sob a premissa de que o conhecimento profundo é a
                  base indispensável para a segurança institucional de grandes
                  legados.
                </p>
              </div>
            </ElementReveal>
          </div>

          {/* Coluna Visual (Ocupa 5 colunas) - Nova Opção de Lado Direito */}
          <div className="relative hidden lg:col-span-5 lg:block">
            <ElementReveal delay={0.6}>
              <div className="relative pt-12 pr-12">
                {/* Moldura Decorativa Deslocada (Atrás) */}
                <div className="absolute top-0 right-0 z-0 h-full w-full rounded-2xl border border-[#c5a47e]/20" />

                <ElementReveal delay={0.6}>
                  <div className="relative mx-auto h-100 w-120 overflow-hidden rounded-2xl bg-[#1a1a1c] shadow-2xl lg:max-w-none">
                    {/* Overlay sutil para profundidade */}
                    <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-60" />

                    {/* Componente Image Otimizado */}
                    <Image
                      src="/assets/team/team-2.png"
                      alt="Ambiente Estratégico Von Marins"
                      fill // Ocupa todo o container pai
                      priority // Carregamento prioritário por ser o Hero
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="transform object-cover object-center grayscale transition-all duration-[10s]"
                    />

                    {/* Selo de Localização/Status */}
                    <div className="absolute bottom-10 left-10 z-30">
                      <p className="text-[10px] font-bold tracking-[0.3em] text-[#c5a47e] uppercase">
                        Hub Corporativo
                      </p>
                      <p className="font-bitter text-2xl font-bold text-white">
                        São Paulo
                      </p>
                    </div>
                  </div>
                </ElementReveal>

                {/* Elemento Geométrico (Círculo de Rigor) */}
                <div className="absolute -right-6 -bottom-6 z-20 size-24 rounded-full border border-[#c5a47e]/40 bg-[#0a0a0b] p-2">
                  <div className="flex h-full w-full items-center justify-center rounded-full border border-[#c5a47e]/10">
                    <span className="text-[8px] font-black tracking-tighter text-[#c5a47e] uppercase">
                      Est. 1994
                    </span>
                  </div>
                </div>
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
