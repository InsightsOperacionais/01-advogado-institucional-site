import { ElementReveal } from "@/components/layout/element-reveal";
import { FileText, Globe, Scale, ShieldCheck } from "lucide-react";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Compliance",
    text: "Rigorosos protocolos de integridade e conformidade regulatória.",
  },
  {
    icon: Globe,
    title: "Presença Global",
    text: "Alianças estratégicas nos principais centros financeiros do mundo.",
  },
  {
    icon: Scale,
    title: "Ética Inabalável",
    text: "Transparência total em todas as etapas do processo jurídico.",
  },
  {
    icon: FileText,
    title: "Sigilo Absoluto",
    text: "Sistemas de segurança de dados de nível bancário para proteção de ativos.",
  },
];

export function GovernanceSection() {
  return (
    <div className="container mx-auto px-4">
      <ElementReveal
        width="full"
        variant="soft"
        distance="18px"
        className="mb-20 max-w-3xl"
      >
        <span className="text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
          Governança
        </span>
        <h2 className="font-bitter mt-6 text-4xl font-light lg:text-6xl">
          Rigor técnico e compromisso <br />
          <span className="text-[#c5a47e] italic">institucional.</span>
        </h2>
      </ElementReveal>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v, i) => (
          <ElementReveal
            key={v.title}
            width="full"
            delay={i * 0.08}
            distance="24px"
            variant="card"
            className="group interactive-card interactive-card-dark rounded-3xl border border-white/5 bg-white/[0.02] p-8"
          >
            <div className="mb-8 flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors group-hover:border-[#c5a47e]/50">
              <v.icon className="size-6 text-[#c5a47e]" strokeWidth={1} />
            </div>
            <h3 className="font-bitter mb-4 text-xl font-bold">{v.title}</h3>
            <p className="text-sm leading-relaxed font-light text-white/40">
              {v.text}
            </p>
          </ElementReveal>
        ))}
      </div>
    </div>
  );
}
