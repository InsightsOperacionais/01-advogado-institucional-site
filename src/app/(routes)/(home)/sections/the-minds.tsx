"use client";
import { ElementReveal } from "@/components/layout/element-reveal";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";
import Link from "next/link";

const PARTNERS = [
  {
    name: "Dr. Arthur von Marins",
    role: "Sócio Fundador | Tributário",
    img: "assets/team/partner1.jpg",
    bio: "Especialista em reestruturação societária e consultoria fiscal internacional com foco em eficiência de ativos.",
  },
  {
    name: "Dra. Helena Cavalcanti",
    role: "Sócia Diretora | Corporativo",
    img: "assets/team/partner2.jpg",
    bio: "Liderança estratégica em M&A e governança de grupos econômicos de alta performance e expansão global.",
  },
];

export function TheMindsSection() {
  return (
    <section className="relative flex h-screen w-full items-center overflow-hidden bg-[#f4f4f5] px-6 lg:px-20">
      <div className="container mx-auto grid h-full grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* LADO ESQUERDO: COMPOSIÇÃO DE FOTOS (Estável) */}
        <div className="relative flex h-[60vh] items-center justify-center lg:col-span-7 lg:h-[80vh]">
          <div className="grid h-full w-full grid-cols-2 gap-6">
            {PARTNERS.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className={`group relative overflow-hidden rounded-3xl bg-[#0a0a0b] ${
                  i === 1 ? "mt-12 lg:mt-24" : "mb-12 lg:mb-24"
                }`}
              >
                <div className="absolute inset-0 z-10 bg-[#0a0a0b]/40 transition-colors duration-500 group-hover:bg-transparent" />
                <img
                  src={partner.img}
                  alt={partner.name}
                  className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md">
                    <Linkedin size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* LADO DIREITO: TEXTO (Com transição suave sem tremor) */}
        <div className="flex flex-col justify-center lg:col-span-5 lg:pl-16">
          <ElementReveal>
            <span className="text-[10px] font-bold tracking-[0.5em] text-[#c5a47e] uppercase">
              Liderança
            </span>
          </ElementReveal>

          <h2 className="font-bitter mt-6 text-4xl leading-tight font-light lg:text-6xl">
            A inteligência por <br />
            trás da <span className="text-[#c5a47e] italic">estratégia.</span>
          </h2>

          <div className="mt-16 space-y-8">
            {PARTNERS.map((partner, i) => (
              <div
                key={i}
                className="group cursor-pointer border-l-2 border-black/5 pl-8 transition-all duration-500 hover:border-[#c5a47e]"
              >
                <h3 className="font-bitter text-2xl font-bold text-[#0a0a0b] transition-colors group-hover:text-[#c5a47e]">
                  {partner.name}
                </h3>
                <p className="mt-1 text-[10px] font-bold tracking-widest text-black/40 uppercase">
                  {partner.role}
                </p>

                {/* A MÁGICA PARA NÃO TREMER: Grid dinâmico */}
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="max-w-sm pt-4 text-sm leading-relaxed font-light text-black/60 italic">
                      {partner.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <ElementReveal delay={0.5}>
            <div className="mt-16">
              <Link
                href="/equipe"
                className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.4em] text-[#0a0a0b] uppercase transition-colors hover:text-[#c5a47e]"
              >
                Conheça nossa equipe completa
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </ElementReveal>
        </div>
      </div>
    </section>
  );
}
