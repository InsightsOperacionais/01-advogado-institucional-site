import { FooterLaw } from "../(home)/sections/footer";
import { AtuacaoHero } from "./sections/atuacao-hero";
import { ContactCTA } from "./sections/contact-cta";
import { SectorsSection } from "./sections/sectors-section";
import { ServicesDetail } from "./sections/services-detail";
import { StrategicAdvisory } from "./sections/strategic-advisory";
import { WorkMethod } from "./sections/work-method";

export default function AtuacaoPage() {
  return (
    <main className="bg-white selection:bg-[#c5a47e] selection:text-white">
      {/* 01. Hero - Posicionamento de Autoridade */}
      <AtuacaoHero />

      {/* 02. Verticais de Indústria (Social Proof Implícito) */}
      <SectorsSection />

      {/* 03. Detalhamento Técnico das Áreas */}
      <section className="bg-white py-32">
        <ServicesDetail />
      </section>

      {/* 04. Diferencial de Conselho (Board Advisory) */}
      <StrategicAdvisory />

      {/* 05. Protocolo Operacional - Section Escura */}
      <section className="m-4 rounded-3xl bg-[#0a0a0b] py-24 lg:rounded-3xl">
        <WorkMethod />
      </section>

      {/* 06. CTA Final e Rodapé */}
      <section className="">
        <ContactCTA />
      </section>

      <FooterLaw />
    </main>
  );
}
