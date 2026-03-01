import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { FooterLaw } from "../../../components/layout/footer/footer";
import { HeroLawSection } from "./sections/hero-law";
import { InsightsSection } from "./sections/insights";
import { TheMindsSection } from "./sections/the-minds";
import { TrustBar } from "./sections/trust-bar";

const AreasExpertiseSection = dynamic(
  () =>
    import("./sections/areas-expertise").then(
      (module) => module.AreasExpertiseSection,
    ),
  {
    loading: () => <div className="h-[420px]" aria-hidden="true" />,
  },
);

const FirmValuesSection = dynamic(
  () =>
    import("./sections/firm-values").then((module) => module.FirmValuesSection),
  {
    loading: () => <div className="h-[560px]" aria-hidden="true" />,
  },
);

export const metadata: Metadata = {
  title: "Início",
  description:
    "Assessoria jurídica estratégica em direito corporativo, M&A, engenharia fiscal e governança sucessória.",
  alternates: {
    canonical: "/",
  },
};

export default function LawFirmPage() {
  return (
    <main className="">
      {/* 01. IMPACTO IMEDIATO */}
      <section className="h-screen">
        <HeroLawSection />
      </section>

      {/* 02. PROVA SOCIAL SILENCIOSA */}
      <TrustBar />

      {/* 03. NÚMEROS DE AUTORIDADE */}
      {/* <section className="container mx-auto">
          <AuthorityNumbers />
        </section> */}

      {/* 04. O QUE FAZEMOS (EXPERTISE) */}
      <section className="py-24">
        <AreasExpertiseSection />
      </section>

      {/* 05. QUEM FAZ (HUMANIZAÇÃO) */}
      <section className="container mx-auto py-24">
        <TheMindsSection />
      </section>

      {/* 06. MANIFESTO (SECTION ESCURA) */}
      <section className="m-4 rounded-4xl bg-[#0a0a0b] py-12">
        <FirmValuesSection />
      </section>

      {/* 07. CONHECIMENTO (SECTION CLARA) */}
      <section className="py-24">
        <InsightsSection />
      </section>

      {/* 08. RODAPÉ E CONTATO */}
      <FooterLaw />
    </main>
  );
}
