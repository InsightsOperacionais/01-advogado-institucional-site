import { ElementReveal } from "@/components/layout/element-reveal";
import { cn } from "@/lib/utils";

const EVENTS = [
  {
    year: "1994",
    title: "Gênese Institucional",
    desc: "Fundação da banca com foco em Direito Tributário de alta complexidade e consultoria estratégica.",
  },
  {
    year: "2005",
    title: "Consolidação e Expansão",
    desc: "Abertura da sede em São Paulo e ampliação das práticas para o Direito Societário e M&A.",
  },
  {
    year: "2015",
    title: "Vanguarda Tecnológica",
    desc: "Implementação de protocolos de IA jurídica e pioneirismo em governança de dados corporativos.",
  },
  {
    year: "2026",
    title: "Projeção Internacional",
    desc: "Consolidação como referência na América Latina para operações cross-border e gestão de legados.",
  },
];

export function TimelineSection() {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-24">
        <span className="text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
          Nossa Trajetória
        </span>
        <h2 className="font-bitter mt-6 text-4xl font-light text-[#0a0a0b] lg:text-6xl">
          Três décadas de <br />
          <span className="text-[#c5a47e] italic">solidez institucional.</span>
        </h2>
      </div>

      {/* Linha Central da Timeline */}
      <div className="relative ml-4 border-l border-black/10 lg:left-1/2 lg:ml-0">
        {EVENTS.map((event, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={i} className="relative mb-24 pl-10 lg:pl-0">
              {/* Dot indicador (Centralizado no Desktop) */}
              <div className="absolute top-2 -left-[6.5px] z-10 size-3 rounded-full bg-[#c5a47e] ring-4 ring-[#f4f4f5] lg:left-[-6px]" />

              <div
                className={cn(
                  "transition-all duration-500 lg:w-1/2",
                  isEven
                    ? "lg:-translate-x-full lg:pr-20 lg:text-right"
                    : "lg:translate-x-0 lg:pl-20 lg:text-left",
                )}
              >
                <ElementReveal delay={i * 0.1}>
                  <span className="font-bitter mb-2 block text-5xl font-light text-[#c5a47e]/30 italic lg:text-7xl">
                    {event.year}
                  </span>
                  <h3 className="font-bitter mb-4 text-2xl font-bold text-[#0a0a0b] lg:text-3xl">
                    {event.title}
                  </h3>
                  <p
                    className={cn(
                      "max-w-sm text-sm leading-relaxed font-light text-[#0a0a0b]/60",
                      isEven ? "lg:ml-auto" : "lg:ml-0",
                    )}
                  >
                    {event.desc}
                  </p>
                </ElementReveal>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
