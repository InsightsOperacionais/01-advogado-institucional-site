import { ElementReveal } from "@/components/layout/element-reveal";

export function HeroSobre() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0b] pt-24 pb-24 text-white">
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-0 left-0 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5a47e]/10 blur-[140px]" />
      {/* <div className="absolute right-0 bottom-0 h-full w-1/3 bg-gradient-to-l from-[#c5a47e]/5 to-transparent" /> */}

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 items-end gap-16 lg:grid-cols-12">
          {/* Coluna de Texto Principal */}
          <div className="flex flex-col lg:col-span-9">
            <ElementReveal>
              <div className="mb-10 flex items-center gap-6">
                <div className="h-px w-16 bg-[#c5a47e]" />
                <span className="text-[10px] font-bold tracking-[0.5em] text-[#c5a47e] uppercase">
                  História e Legado
                </span>
              </div>
            </ElementReveal>

            <ElementReveal delay={0.2}>
              <h1 className="font-bitter text-6xl leading-[1] font-light lg:text-8xl">
                A tradição é o <br />
                <span className="text-[#c5a47e] italic">alicerce.</span> <br />O
                futuro, o <span className="font-bold">padrão.</span>
              </h1>
            </ElementReveal>
          </div>

          {/* Selo de Fundação Deslocado (Lado Direito) */}
          <div className="relative flex justify-start lg:col-span-3 lg:justify-end">
            <ElementReveal delay={0.4}>
              <div className="group relative flex size-40 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-colors hover:border-[#c5a47e]/40">
                <div className="text-center">
                  <span className="block text-[10px] font-bold tracking-widest text-[#c5a47e] uppercase">
                    Fundada em
                  </span>
                  <span className="font-bitter text-4xl font-black text-white">
                    1994
                  </span>
                </div>

                {/* Elemento orbital decorativo */}
                <div className="absolute inset-[-8px] animate-[spin_20s_linear_infinite] rounded-full border border-dashed border-[#c5a47e]/20" />
              </div>
            </ElementReveal>
          </div>
        </div>

        {/* Parágrafo de Apoio (Opcional, para dar peso ao Hero) */}
        <ElementReveal delay={0.6} className="mt-24">
          <div className="max-w-2xl border-l-2 border-[#c5a47e]/30 pl-8">
            <p className="text-xl leading-relaxed font-light text-white/40">
              Há mais de três décadas, a Von Marins transforma o rigor técnico
              da advocacia clássica em segurança institucional para operações
              que moldam o mercado global.
            </p>
          </div>
        </ElementReveal>
      </div>

      {/* Linha de rodapé do Hero */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#c5a47e]/30 to-transparent" />
    </section>
  );
}
