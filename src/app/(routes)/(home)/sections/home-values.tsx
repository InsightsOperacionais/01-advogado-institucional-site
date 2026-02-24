import { ElementReveal } from "@/components/layout/element-reveal";

// ===== VALUES SECTION =====
export function ValuesSection() {
  return (
    <section className="flex w-full flex-col gap-12 bg-[#141414] py-24 text-[#f1f1f1] lg:flex-row lg:items-center lg:py-20">
      <div className="container mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:flex-row lg:items-stretch lg:gap-20">
        <div className="flex flex-col justify-between gap-10 lg:w-[45%]">
          <div className="flex flex-col gap-6">
            <ElementReveal delay={0.2} className="h-px w-12 bg-[#fbb725]/50" />

            <p className="max-w-sm text-sm leading-relaxed font-light text-[#f1f1f1]/60 lg:text-base">
              <ElementReveal delay={0.3}>
                Trabalhamos diretamente com famílias produtoras que preservam
                técnicas tradicionais, garantindo produtos com sabor genuíno,
                sem industrialização excessiva e com total rastreabilidade.
              </ElementReveal>
            </p>

            <ElementReveal delay={0.4}>
              <button className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] text-[#fbb725] uppercase">
                Conheça os Produtores
                <span className="h-[1px] w-8 bg-[#fbb725]/30 transition-all group-hover:w-12 group-hover:bg-[#fbb725]" />
              </button>
            </ElementReveal>
          </div>

          {/* Selos */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[9px] font-bold tracking-widest text-[#fbb725] uppercase lg:max-w-xs">
            <ElementReveal delay={0.5}>Familiar</ElementReveal>
            <span className="opacity-30">•</span>
            <ElementReveal delay={0.55}>Artesanal</ElementReveal>
            <span className="opacity-30">•</span>
            <ElementReveal delay={0.6}>Natural</ElementReveal>
            <span className="opacity-30">•</span>
            <ElementReveal delay={0.65}>Rastreável</ElementReveal>
          </div>
        </div>

        {/* Título */}
        <div className="font-bitter flex flex-1 flex-col items-start justify-center text-5xl leading-[0.9] text-[#f1f1f1] lg:items-end lg:text-right lg:text-[7.5rem]">
          <ElementReveal>
            <span className="font-light">Tradição</span>
          </ElementReveal>

          <ElementReveal delay={0.2}>
            <span className="font-bold text-[#fbb725] italic">que</span>
          </ElementReveal>

          <div className="flex flex-col items-start lg:items-end">
            <ElementReveal delay={0.3}>
              <span className="font-light">alimenta </span>
              <span className="font-black tracking-tighter text-[#fbb725]">
                histórias
              </span>
            </ElementReveal>

            <ElementReveal delay={0.4}>
              <span className="text-4xl font-light tracking-[0.1em] text-[#fbb725]/30 uppercase lg:text-6xl">
                e afeto
              </span>
            </ElementReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
