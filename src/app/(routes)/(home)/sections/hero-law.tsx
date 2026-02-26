"use client";
import { ElementReveal } from "@/components/layout/element-reveal";
import { motion } from "framer-motion";
import { Gavel, Scale, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function HeroLawSection() {
  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0a0a0b] text-[#f1f1f1]">
      {/* Background sutil com overlay de textura */}
      <div className="absolute inset-0 z-10 bg-[url('/assets/images/law-texture.jpg')] bg-cover bg-center opacity-20 grayscale" />
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-transparent via-[#0a0a0b]/80 to-[#0a0a0b]" />

      <div className="relative z-30 w-full max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <ElementReveal delay={0.2}>
            <span className="mb-6 block text-[10px] font-bold tracking-[0.5em] text-[#c5a47e] uppercase">
              Excelência Jurídica desde 1994
            </span>
          </ElementReveal>

          <h1 className="font-bitter text-5xl leading-tight font-extralight lg:text-8xl">
            <ElementReveal delay={0.4}>Defesa Intransigente</ElementReveal>
            <br />
            <ElementReveal delay={0.6} className="font-bold text-[#c5a47e]">
              da sua Liberdade
            </ElementReveal>
          </h1>

          <ElementReveal delay={0.8} className="mt-8 max-w-2xl">
            <p className="text-sm leading-relaxed font-light tracking-wide text-white/60 lg:text-lg">
              Aliamos a tradição do Direito clássico à agilidade da advocacia
              moderna para solucionar casos complexos com precisão estratégica e
              ética inabalável.
            </p>
          </ElementReveal>

          <ElementReveal delay={1.0} className="mt-12">
            <Link
              href="#contato"
              className="group relative flex h-14 w-56 items-center justify-center overflow-hidden border border-[#c5a47e]/30 bg-transparent text-xs font-bold tracking-widest text-white transition-all hover:border-[#c5a47e]"
            >
              <div className="absolute inset-0 z-0 translate-y-full bg-[#c5a47e] transition-transform duration-500 group-hover:translate-y-0" />
              <span className="relative z-10 group-hover:text-[#0a0a0b]">
                AGENDAR CONSULTA
              </span>
            </Link>
          </ElementReveal>
        </div>

        {/* Floating Icons for Authority */}
        <div className="mt-24 grid grid-cols-3 gap-8 border-t border-white/5 pt-12">
          {[
            { label: "Compliance", Icon: ShieldCheck },
            { label: "Litigância", Icon: Gavel },
            { label: "Consultoria", Icon: Scale },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.2 }}
              className="flex flex-col items-center gap-3 opacity-40 transition-opacity hover:opacity-100"
            >
              <item.Icon className="size-5 text-[#c5a47e]" strokeWidth={1} />
              <span className="text-[9px] tracking-[0.3em] uppercase">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
