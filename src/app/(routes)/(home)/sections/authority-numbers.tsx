import { ElementReveal } from "@/components/layout/element-reveal";

const STATS = [
  { label: "Anos de Experiência", value: "28+" },
  { label: "Casos de Sucesso", value: "1.5k" },
  { label: "Ativos Gerenciados", value: "R$ 2B" },
  { label: "Advogados Especialistas", value: "45" },
];

export function AuthorityNumbers() {
  return (
    <div className="grid grid-cols-2 gap-12 lg:grid-cols-4 lg:gap-8">
      {STATS.map((stat, i) => (
        <div
          key={i}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <ElementReveal delay={i * 0.1}>
            <span className="font-bitter text-5xl font-light text-[#c5a47e] italic lining-nums lg:text-7xl">
              {stat.value}
            </span>
            <p className="mt-2 text-[10px] font-bold tracking-[0.2em] text-[#0a0a0b]/40 uppercase">
              {stat.label}
            </p>
          </ElementReveal>
        </div>
      ))}
    </div>
  );
}
