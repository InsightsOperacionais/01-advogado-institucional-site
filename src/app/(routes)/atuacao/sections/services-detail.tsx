import { ElementReveal } from "@/components/layout/element-reveal";

const SERVICES = [
  {
    id: "01",
    title: "Societário e M&A",
    desc: "Gestão de estruturas de capital, fusões, aquisições e governança de holdings familiares de alta complexidade.",
    items: [
      "M&A e Due Diligence Estratégica",
      "Reestruturação Societária Complexa",
      "Acordos de Sócios e Governança",
    ],
  },
  {
    id: "02",
    title: "Engenharia Fiscal",
    desc: "Inteligência aplicada à conformidade e otimização de ativos para grupos corporativos e grandes fortunas.",
    items: [
      "Planejamento Tributário Internacional",
      "Contencioso Administrativo e Judicial",
      "Consultoria de IRPJ/CSLL de Alto Impacto",
    ],
  },
  {
    id: "03",
    title: "Governança Sucessória",
    desc: "Arquitetura jurídica focada na preservação e transmissão de legados com segurança institucional absoluta.",
    items: [
      "Holdings Patrimoniais e Estruturais",
      "Protocolos de Família e Compliance",
      "Planejamento Transmissivo e Blindagem",
    ],
  },
];

export function ServicesDetail() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-12">
        {SERVICES.map((service, i) => (
          <div
            key={i}
            className="group flex flex-col border-l border-black/5 pl-4 transition-all duration-500 hover:border-[#c5a47e] sm:pl-8"
          >
            <ElementReveal delay={i * 0.1}>
              {/* Identificador Numérico */}
              <span className="font-bitter mb-6 block text-sm font-bold tracking-[0.3em] text-[#c5a47e]/40 transition-colors group-hover:text-[#c5a47e]">
                {service.id}
              </span>

              <h3 className="font-bitter mb-6 text-2xl font-bold text-[#0a0a0b] lg:text-3xl">
                {service.title}
              </h3>

              <p className="mb-10 text-sm leading-relaxed text-black/60">
                {service.desc}
              </p>

              {/* Lista de Práticas */}
              <div className="space-y-5">
                <span className="text-[10px] font-bold tracking-[0.2em] text-black/20 uppercase">
                  Domínio Técnico
                </span>
                <ul className="space-y-4 pt-4">
                  {service.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-4 text-[11px] font-bold tracking-widest text-[#0a0a0b]/80 uppercase transition-colors group-hover:text-[#0a0a0b]"
                    >
                      <div className="h-px w-4 bg-[#c5a47e]/40 transition-all group-hover:w-6 group-hover:bg-[#c5a47e]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ElementReveal>
          </div>
        ))}
      </div>
    </div>
  );
}
