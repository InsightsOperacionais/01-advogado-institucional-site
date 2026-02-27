import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de uso do site institucional da Von Marins Advocacia e condições de utilização dos conteúdos publicados.",
  alternates: {
    canonical: "/termos-de-uso",
  },
};

export default function TermosDeUsoPage() {
  return (
    <main className="bg-[#f4f4f5] px-6 py-16 text-[#0a0a0b] lg:py-24">
      <section className="mx-auto max-w-4xl rounded-[2rem] border border-black/5 bg-white p-8 shadow-xl shadow-black/5 lg:p-14">
        <h1 className="font-bitter text-4xl font-light lg:text-5xl">
          Termos de Uso
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-black/60">
          Ao acessar este site, o usuário concorda com os termos abaixo e com a
          legislação aplicável.
        </p>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-black/75">
          <p>
            1. O conteúdo disponibilizado tem caráter informativo e não
            substitui consulta jurídica personalizada.
          </p>
          <p>
            2. É vedada a reprodução integral do conteúdo sem autorização
            expressa da Von Marins Advocacia.
          </p>
          <p>
            3. O uso indevido do site ou de seus recursos pode resultar em
            bloqueio de acesso e medidas legais cabíveis.
          </p>
          <p>
            4. Estes termos podem ser atualizados periodicamente para adequação
            regulatória e operacional.
          </p>
        </div>
      </section>
    </main>
  );
}
