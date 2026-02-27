import type { Metadata } from "next";
import { FooterLaw } from "../../../components/layout/footer/footer";
import { GovernanceSection } from "./sections/governance";
import { HeroSobre } from "./sections/hero-sobre";
import { InfrastructureSection } from "./sections/infrastructure";
import { TimelineSection } from "./sections/timeline";

export const metadata: Metadata = {
  title: "Sobre o Escritório",
  description:
    "História, governança e infraestrutura institucional da Von Marins Advocacia.",
  alternates: {
    canonical: "/sobre",
  },
};

export default function SobrePage() {
  return (
    <main className="bg-[#0a0a0b] selection:bg-[#c5a47e]">
      {/* 01. INTRODUÇÃO AO LEGADO */}
      <HeroSobre />

      <div className="mx-3 rounded-[3rem] bg-[#f4f4f5] py-24 lg:rounded-[5rem]">
        {/* 02. LINHA DO TEMPO INTERATIVA */}
        <TimelineSection />

        {/* 03. INFRAESTRUTURA E AMBIENTE */}
        <InfrastructureSection />
      </div>

      {/* 04. GOVERNANÇA E ÉTICA */}
      <section className="bg-[#0a0a0b] py-24 text-white">
        <GovernanceSection />
      </section>

      <FooterLaw />
    </main>
  );
}
