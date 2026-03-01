import { ElementReveal } from "@/components/layout/element-reveal";

export function InsightsHero() {
  return (
    <section className="relative bg-[#0a0a0b] pt-24 pb-48 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <ElementReveal>
            <div className="mb-10 flex items-center gap-6">
              <div className="h-px w-16 bg-[#c5a47e]" />
              <span className="text-[10px] font-bold tracking-[0.5em] text-[#c5a47e] uppercase">
                Pensamento Jurídico
              </span>
            </div>
          </ElementReveal>
          {/* Título Monumental */}
          <ElementReveal delay={0.2}>
            <h1 className="font-bitter text-5xl leading-[1.1] font-light lg:text-8xl">
              Inteligência que <br />
              <span className="text-glow-gold text-[#c5a47e] italic">
                antecipa
              </span>{" "}
              <span className="font-bold">cenários.</span>
            </h1>
          </ElementReveal>
        </div>
      </div>
    </section>
  );
}
