import { FooterLaw } from "../(home)/sections/footer";
import { AssociatesSection } from "./sections/associates-section";
import { EquipeHero } from "./sections/equipe-hero";
import { IntellectualFoundation } from "./sections/intellectual-foundation";
import { PartnersGrid } from "./sections/partners-grid";
import { TeamCulture } from "./sections/team-culture";

export default function EquipePage() {
  return (
    <main className="flex flex-col gap-24 bg-white selection:bg-[#c5a47e] selection:text-white">
      {/* 01. Hero - O Valor do Intelecto */}
      <EquipeHero />

      {/* 02. Sócios (Liderança Estratégica) - Limitado a h-screen */}
      <section className="max-h-screen overflow-hidden bg-white">
        <PartnersGrid />
      </section>

      {/* 03. Corpo Técnico (Associados e Consultores) - Subiu para 3º lugar */}
      <section className="bg-[#f4f4f5]">
        <AssociatesSection />
      </section>

      {/* 04. Cultura e Filosofia de Trabalho (Dark) */}
      <section className="m-4 rounded-3xl bg-[#0a0a0b] text-white">
        <TeamCulture />
      </section>

      {/* 05. Nova Seção de Fundo Claro: Rigor e Formação */}
      <IntellectualFoundation />

      <FooterLaw />
    </main>
  );
}
