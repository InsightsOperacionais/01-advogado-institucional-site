import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { FooterLaw } from "../../../components/layout/footer/footer";
import { FeaturedPost } from "./sections/featured-post";
import { InsightsHero } from "./sections/insights-hero";

const InsightsCatalog = dynamic(
  () =>
    import("./sections/insights-catalog").then(
      (module) => module.InsightsCatalog,
    ),
  {
    loading: () => <div className="h-[720px]" aria-hidden="true" />,
  },
);

const NewsletterLaw = dynamic(
  () =>
    import("./sections/newsletter-law").then((module) => module.NewsletterLaw),
  {
    loading: () => <div className="h-[320px]" aria-hidden="true" />,
  },
);

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Publicações, análises e teses jurídicas sobre temas corporativos, tributários e digitais.",
  alternates: {
    canonical: "/insights",
  },
};

export default function InsightsPage() {
  return (
    <main className="">
      {/* 01. Hero - O Valor do Conhecimento */}
      <InsightsHero />

      {/* 02. Artigo de Capa (Destaque do Mês) */}
      <section className="relative z-20 container mx-auto -mt-24 px-6">
        <FeaturedPost />
      </section>

      {/* 03. Catálogo de Artigos e Teses */}
      <section className="container mx-auto py-24">
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
