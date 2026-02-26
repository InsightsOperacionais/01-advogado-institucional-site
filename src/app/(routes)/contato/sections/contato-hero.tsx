"use client";
import { ElementReveal } from "@/components/layout/element-reveal";

export function ContatoHero() {
  return (
    <section className="relative bg-[#0a0a0b] pt-40 pb-56 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <ElementReveal>
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
              Canais de Atendimento
            </span>
          </ElementReveal>
          <h1 className="font-bitter mt-6 text-5xl font-light lg:text-8xl">
            Inicie um diálogo <br />
            <span className="text-[#c5a47e] italic">estratégico</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
