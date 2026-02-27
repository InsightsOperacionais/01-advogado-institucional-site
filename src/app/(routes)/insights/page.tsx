import { FooterLaw } from "../(home)/sections/footer";
import { FeaturedPost } from "./sections/featured-post";
import { InsightsCatalog } from "./sections/insights-catalog";
import { InsightsHero } from "./sections/insights-hero";
import { NewsletterLaw } from "./sections/newsletter-law";

export default function InsightsPage() {
  return (
    <main className="bg-[#f4f4f5] selection:bg-[#c5a47e] selection:text-white">
      {/* 01. Hero - O Valor do Conhecimento */}
      <InsightsHero />

      {/* 02. Artigo de Capa (Destaque do Mês) */}
      <section className="relative z-20 container mx-auto -mt-24 px-6">
        <FeaturedPost />
      </section>

      {/* 03. Catálogo de Artigos e Teses */}
      <section className="container mx-auto px-6 py-32">
        <InsightsCatalog />
      </section>

      {/* 04. Newsletter - O Briefing Jurídico */}
      <section className="bg-[#0a0a0b] py-24 text-white">
        <NewsletterLaw />
      </section>

      <FooterLaw />
    </main>
  );
}
