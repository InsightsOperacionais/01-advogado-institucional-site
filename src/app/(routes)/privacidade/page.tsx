import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de privacidade da Von Marins Advocacia com diretrizes de tratamento e proteção de dados pessoais.",
  alternates: {
    canonical: "/privacidade",
  },
};

export default function PrivacidadePage() {
  return (
    <main className="bg-[#f4f4f5] px-6 py-16 text-[#0a0a0b] lg:py-24">
      <section className="mx-auto max-w-4xl rounded-[2rem] border border-black/5 bg-white p-8 shadow-xl shadow-black/5 lg:p-14">
        <h1 className="font-bitter text-4xl font-light lg:text-5xl">
          Política de Privacidade
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-black/60">
          Esta política descreve como a Von Marins Advocacia coleta, utiliza,
          armazena e protege dados pessoais no contexto de seus serviços
          jurídicos e canais digitais.
        </p>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-black/75">
          <p>
            1. Os dados são tratados com fundamento em bases legais aplicáveis
            e com estrita observância à LGPD.
          </p>
          <p>
            2. O acesso é restrito a profissionais autorizados e protegido por
            controles de segurança da informação.
          </p>
          <p>
            3. O titular pode solicitar informações, correção ou exclusão de
            dados nos limites legais.
          </p>
          <p>
            4. Dúvidas sobre privacidade podem ser encaminhadas para
            contato@vonmarins.com.br.
          </p>
        </div>
      </section>
    </main>
  );
}
