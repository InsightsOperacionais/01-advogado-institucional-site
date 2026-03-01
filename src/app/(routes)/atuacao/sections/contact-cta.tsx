import { ElementReveal } from "@/components/layout/element-reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ContactCTA() {
  return (
    <section className="w-full border-t border-black/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start justify-between gap-16 lg:flex-row lg:items-end">
          <div className="max-w-4xl">
            <ElementReveal>
              <span className="text-[10px] font-bold tracking-[0.6em] text-[#c5a47e] uppercase">
                Abertura de Protocolo
              </span>
            </ElementReveal>

            <ElementReveal delay={0.2}>
              <h2 className="font-bitter mt-8 text-4xl leading-[1.1] font-light text-[#0a0a0b] lg:text-7xl">
                Onde a estratégia <br />
                encontra a{" "}
                <span className="text-[#c5a47e] italic">perenidade.</span>
              </h2>
            </ElementReveal>

            <ElementReveal delay={0.4}>
              <p className="mt-10 max-w-xl border-l border-[#c5a47e] pl-8 text-lg leading-relaxed font-light text-black/60">
                Inicie uma consulta institucional para alinhar sua próxima
                movimentação estratégica ao rigor técnico da Von Marins. Nossos
                sócios estão à disposição para estruturas de alta complexidade.
              </p>
            </ElementReveal>
          </div>

          <ElementReveal delay={0.6}>
            <Link
              href="/contato"
              className="group flex items-center gap-8 border-b-2 border-[#0a0a0b] p-2 pb-4 transition-all hover:border-[#c5a47e]"
            >
              <span className="text-sm font-bold tracking-[0.3em] text-[#0a0a0b] uppercase">
                Solicitar Reunião
              </span>
              <div className="flex size-12 items-center justify-center rounded-full bg-[#0a0a0b] text-white transition-transform group-hover:scale-110 group-hover:bg-[#c5a47e]">
                <ArrowRight className="size-5" />
              </div>
            </Link>
          </ElementReveal>
        </div>
      </div>
    </section>
  );
}
