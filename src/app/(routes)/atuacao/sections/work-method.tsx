"use client";

const STEPS = [
  {
    num: "01",
    title: "Auditoria de Cenários",
    detail:
      "Mapeamento exaustivo de vulnerabilidades e oportunidades estruturais ocultas.",
  },
  {
    num: "02",
    title: "Design Estratégico",
    detail:
      "Construção da tese jurídica e arquitetura da solução sob medida para o negócio.",
  },
  {
    num: "03",
    title: "Gestão Institucional",
    detail:
      "Implementação assistida com rigor técnico, reporte direto e governança absoluta.",
  },
];

export function WorkMethod() {
  return (
    <div className="container mx-auto px-6 text-white">
      <div className="mb-24 text-center">
        <span className="text-[10px] font-bold tracking-[0.5em] text-[#c5a47e] uppercase">
          Protocolo Operacional
        </span>
        <h2 className="font-bitter mt-6 text-4xl font-light lg:text-6xl">
          O Padrão <span className="font-black">Von Marins</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="group relative rounded-3xl border border-white/10 bg-white/5 p-10 transition-all duration-500 hover:border-[#c5a47e]/30"
          >
            <span className="font-bitter absolute top-4 right-8 text-7xl font-black text-[#c5a47e]/10 transition-colors group-hover:text-[#c5a47e]/20">
              {step.num}
            </span>
            <h4 className="mb-4 text-xl font-bold">{step.title}</h4>
            <p className="text-sm leading-relaxed text-white/40">
              {step.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
