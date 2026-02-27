import type { Metadata } from "next";
import { FooterLaw } from "../../../components/layout/footer/footer";
import { ContactMain } from "./sections/contact-main";
import { ContatoHero } from "./sections/contato-hero";
import { OfficeLocations } from "./sections/office-locations";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Canal de contato institucional para abertura de demandas jurídicas e agendamento de consulta estratégica.",
  alternates: {
    canonical: "/contato",
  },
};

export default function ContatoPage() {
  return (
    <main className="bg-[#0a0a0b] selection:bg-[#c5a47e] selection:text-white">
      {/* 01. Hero - Boas-vindas ao Diálogo */}
      <ContatoHero />

      {/* 02. Área Principal - Formulário Premium e Canais Diretos */}
      <section className="relative z-20 container mx-auto mb-12">
        <ContactMain />
      </section>

      {/* 03. Unidades Físicas (Presença Nacional) */}
      <section className="">
        <OfficeLocations />
      </section>

      <FooterLaw />
    </main>
  );
}
