import { AreasExpertiseSection } from "./sections/areas-expertise";
import { FirmValuesSection } from "./sections/firm-values";
import { FooterLaw } from "./sections/footer";
import { HeroLawSection } from "./sections/hero-law";
import { InsightsSection } from "./sections/insights";
import { TheMindsSection } from "./sections/the-minds";
import { TrustBar } from "./sections/trust-bar";

export default function LawFirmPage() {
  return (
    <main className="bg-[#0a0a0b] selection:bg-[#c5a47e] selection:text-white">
      {/* 01. IMPACTO IMEDIATO */}
      <section className="h-screen">
        <HeroLawSection />
      </section>

      {/* 02. PROVA SOCIAL SILENCIOSA */}
      <TrustBar />

      <div className="flex flex-col gap-40 bg-[#f4f4f5] px-4 py-32 lg:px-0">
        {/* 03. NÚMEROS DE AUTORIDADE */}
        {/* <section className="container mx-auto">
          <AuthorityNumbers />
        </section> */}

        {/* 04. O QUE FAZEMOS (EXPERTISE) */}
        <section id="expertise" className="container mx-auto">
          <AreasExpertiseSection />
        </section>

        {/* 05. QUEM FAZ (HUMANIZAÇÃO) */}
        <section id="team" className="container mx-auto">
          <TheMindsSection />
        </section>
      </div>

      {/* 06. MANIFESTO (SECTION ESCURA) */}
      <section
        id="values"
        className="rounded-t-[3rem] bg-[#0a0a0b] py-20 text-white lg:rounded-t-[5rem]"
      >
        <FirmValuesSection />
      </section>

      {/* 07. CONHECIMENTO (SECTION CLARA) */}
      <section className="rounded-b-[3rem] bg-[#f4f4f5] py-40 lg:rounded-b-[5rem]">
        <InsightsSection />
      </section>

      {/* 08. RODAPÉ E CONTATO */}
      <FooterLaw />
    </main>
  );
}
