import type { Metadata } from "next";
import { FooterLaw } from "../../../components/layout/footer/footer";
import { AssociatesSection } from "./sections/associates-section";
import { EquipeHero } from "./sections/equipe-hero";
import { IntellectualFoundation } from "./sections/intellectual-foundation";
import { PartnersGrid } from "./sections/partners-grid";
import { TeamCulture } from "./sections/team-culture";

export const metadata: Metadata = {
  title: "Equipe",
  description:
    "Conheça o corpo jurídico da Von Marins, com sócios, associados e especialistas de formação nacional e internacional.",
  alternates: {
    canonical: "/equipe",
  },
};

export default function EquipePage() {
  return (
    <main className="flex flex-col gap-24">
      {/* 01. Hero - O Valor do Intelecto */}
      <EquipeHero />

      {/* 02. Sócios (Liderança Estratégica) - Limitado a h-screen */}
      <section className="overflow-hidden">
        <PartnersGrid />
      </section>

      {/* 03. Corpo Técnico (Associados e Consultores) - Subiu para 3º lugar */}
      <section className="">
        <AssociatesSection />
      </section>

      {/* 04. Cultura e Filosofia de Trabalho (Dark) */}
      <section className="m-4 rounded-3xl bg-[#0a0a0b] py-24 text-white">
        <TeamCulture />
      </section>

      {/* 05. Nova Seção de Fundo Claro: Rigor e Formação */}
      <IntellectualFoundation />

      <FooterLaw />
    </main>
  );
}
