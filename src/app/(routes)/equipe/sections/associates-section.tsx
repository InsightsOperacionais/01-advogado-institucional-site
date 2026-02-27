"use client";
import { ElementReveal } from "@/components/layout/element-reveal";
import Image from "next/image";

const ASSOCIATES = [
  {
    name: "Luciana Costa",
    role: "Associada Sênior",
    edu: "Doutoranda em Processo Civil - USP",
    area: "Contencioso Estratégico",
    image: "/assets/team/luciana-costa.jpg",
  },
  {
    name: "Ricardo Mendes",
    role: "Associado",
    edu: "Mestre em Direito Tributário - FGV",
    area: "Engenharia Fiscal",
    image: "/assets/team/ricardo-mendes.jpg",
  },
  {
    name: "Sofia Albuquerque",
    role: "Associada",
    edu: "LL.M em Direito Corporativo - INSPER",
    area: "M&A e Societário",
    image: "/assets/team/sofia-albuquerque.jpg",
  },
  {
    name: "Gabriel Dantas",
    role: "Associado",
    edu: "Esp. em Proteção de Dados - Coimbra",
    area: "Direito Digital",
    image: "/assets/team/gabriel-dantas.jpg",
  },
  {
    name: "Mariana Lins",
    role: "Consultora",
    edu: "Mestre em Direito de Família - PUC",
    area: "Planejamento Sucessório",
    image: "/assets/team/mariana-lins.jpg",
  },
  {
    name: "Hélio Ferreira",
    role: "Associado Sênior",
    edu: "Esp. em Direito do Agronegócio",
    area: "Real Estate & Agro",
    image: "/assets/team/helio-ferreira.jpg",
  },
];

export function AssociatesSection() {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-20">
        <span className="text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
          Corpo Técnico
        </span>
        <h2 className="font-bitter mt-4 text-4xl font-light text-[#0a0a0b] lg:text-5xl">
          Especialistas e{" "}
          <span className="text-[#c5a47e] italic">Consultores</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
        {ASSOCIATES.map((person, i) => (
          <ElementReveal key={i} delay={i * 0.1}>
            <div className="group flex flex-col gap-6 sm:flex-row sm:items-center">
              {/* Portrait do Associado (Design de Sócio) */}
              <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-2xl bg-[#f4f4f5] sm:w-40 lg:w-48">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0a0b]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 200px"
                  className="object-cover grayscale transition-all duration-[1.5s] ease-out group-hover:scale-110 group-hover:grayscale-0"
                />
              </div>

              {/* Conteúdo Técnico (Design de Sócio) */}
              <div className="flex flex-col border-l border-black/5 pl-6 transition-colors duration-500 group-hover:border-[#c5a47e]">
                <span className="mb-2 text-[9px] font-bold tracking-widest text-[#c5a47e] uppercase opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {person.area}
                </span>

                <h3 className="font-bitter text-xl font-bold text-[#0a0a0b] lg:text-2xl">
                  {person.name}
                </h3>

                <p className="mt-1 text-[9px] font-bold tracking-[0.2em] text-[#c5a47e]/60 uppercase">
                  {person.role}
                </p>

                <div className="mt-4 border-t border-black/5 pt-4">
                  <p className="max-w-[240px] text-[11px] leading-relaxed font-medium text-black/40 italic">
                    {person.edu}
                  </p>
                </div>

                {/* Linha decorativa de Sócio */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-[1px] w-6 bg-[#c5a47e]/30 transition-all duration-500 group-hover:w-10" />
                  <span className="text-[8px] font-black tracking-widest text-black/10 uppercase transition-colors group-hover:text-[#c5a47e]">
                    Prática Jurídica
                  </span>
                </div>
              </div>
            </div>
          </ElementReveal>
        ))}
      </div>
    </div>
  );
}
