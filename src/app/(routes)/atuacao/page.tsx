import type { Metadata } from "next";
import { FooterLaw } from "../../../components/layout/footer/footer";
import { AtuacaoHero } from "./sections/atuacao-hero";
import { ContactCTA } from "./sections/contact-cta";
import { SectorsSection } from "./sections/sectors-section";
import { ServicesDetail } from "./sections/services-detail";
import { StrategicAdvisory } from "./sections/strategic-advisory";
import { WorkMethod } from "./sections/work-method";

export const metadata: Metadata = {
  title: "Áreas de Atuação",
  description:
    "Soluções jurídicas em societário, M&A, engenharia fiscal e governança sucessória para empresas e famílias empresárias.",
  alternates: {
    canonical: "/atuacao",
  },
};

export default function AtuacaoPage() {
  return (
    <main className="">
      {/* 01. Hero - Posicionamento de Autoridade */}
      <AtuacaoHero />

      {/* 02. Verticais de Indústria (Social Proof Implícito) */}
      <SectorsSection />

      {/* 03. Detalhamento Técnico das Áreas */}
      <section className="py-24">
        <ServicesDetail />
      </section>

      {/* 04. Diferencial de Conselho (Board Advisory) */}
      <section className="py-24">
        <StrategicAdvisory />
      </section>

      {/* 05. Protocolo Operacional - Section Escura */}
      <section className="m-4 rounded-3xl bg-[#0a0a0b] py-24 lg:rounded-3xl">
        <WorkMethod />
      </section>

      {/* 06. CTA Final e Rodapé */}
      <section className="py-24">
        <ContactCTA />
      </section>

      <FooterLaw />
    </main>
  );
}
