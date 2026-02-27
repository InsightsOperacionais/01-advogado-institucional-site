"use client";
import { ElementReveal } from "@/components/layout/element-reveal";

export function StrategicAdvisory() {
  return (
    <section className="text-[#0a0a0b]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <ElementReveal>
            <h2 className="font-bitter text-4xl leading-tight font-light lg:text-6xl">
              Integração ao <br />
              <span className="text-[#c5a47e] italic">Board Estratégico</span>
            </h2>
          </ElementReveal>
          <ElementReveal delay={0.2}>
            <p className="text-lg leading-relaxed font-light text-black/60">
              Mais do que uma banca consultiva, atuamos como um braço de
              inteligência jurídica integrado ao conselho de nossos clientes.
              Nossa presença assegura que cada decisão corporativa esteja
              fundamentada em segurança institucional e viabilidade econômica de
              longo prazo.
            </p>
          </ElementReveal>
        </div>
      </div>
    </section>
  );
}
