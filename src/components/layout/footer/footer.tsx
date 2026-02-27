"use client";

import { siteConfig } from "@/lib/site-config";
import { Gavel, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function FooterLaw() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#0a0a0b] pt-24 pb-12 text-[#f1f1f1]">
      {/* Linha de Luxo Superior - Bronze Gradient */}
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#c5a47e]/40 to-transparent" />

      <div className="relative container mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Coluna 1: Branding e Identidade */}
          <div className="flex flex-col lg:col-span-5">
            <Link href="/" className="group inline-block">
              <h3 className="font-bitter text-3xl font-light tracking-[0.2em] text-[#f1f1f1] transition-colors group-hover:text-[#c5a47e]">
                VON MARINS
              </h3>
              <p className="mt-2 text-[9px] font-bold tracking-[0.5em] text-[#c5a47e]/80 uppercase">
                Advocacia & Consultoria
              </p>
            </Link>

            <p className="mt-8 max-w-sm text-sm leading-relaxed font-light text-white/50">
              Comprometidos com a excelência jurídica e a defesa estratégica dos
              interesses de nossos constituintes. Uma trajetória moldada pela
              ética, rigor técnico e resultados de alto impacto.
            </p>

            <div className="mt-10 flex gap-5">
              {[
                {
                  Icon: Linkedin,
                  href: siteConfig.social.linkedin,
                  label: "LinkedIn",
                },
                {
                  Icon: Instagram,
                  href: siteConfig.social.instagram,
                  label: "Instagram",
                },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:border-[#c5a47e] hover:bg-[#c5a47e]/5 hover:text-[#c5a47e]"
                >
                  <social.Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Colunas de Navegação */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-7">
            {/* Práticas */}
            <div>
              <h4 className="font-bitter text-[10px] font-bold tracking-[0.3em] text-[#c5a47e] uppercase">
                Áreas de Atuação
              </h4>
              <ul className="mt-8 space-y-4">
                {[
                  { label: "Direito Corporativo", href: "/atuacao" },
                  { label: "Contencioso Cível", href: "/atuacao" },
                  { label: "Planejamento Tributário", href: "/atuacao" },
                  { label: "Propriedade Intelectual", href: "/atuacao" },
                  { label: "Direito Digital", href: "/atuacao" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-xs font-light text-white/40 transition-colors hover:text-white"
                    >
                      <span className="h-px w-0 bg-[#c5a47e] transition-all group-hover:mr-3 group-hover:w-4" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Institucional */}
            <div>
              <h4 className="font-bitter text-[10px] font-bold tracking-[0.3em] text-[#c5a47e] uppercase">
                O Escritório
              </h4>
              <ul className="mt-8 space-y-4">
                {[
                  { label: "Nossa História", href: "/sobre" },
                  { label: "Corpo Jurídico", href: "/equipe" },
                  { label: "Publicações", href: "/insights" },
                  { label: "Carreiras", href: "/contato" },
                  { label: "Compliance", href: "/sobre" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-xs font-light text-white/40 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contato Direto */}
            <div className="flex flex-col gap-6">
              <h4 className="font-bitter text-[10px] font-bold tracking-[0.3em] text-[#c5a47e] uppercase">
                Contato
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 size-3.5 shrink-0 text-[#c5a47e]/60" />
                  <p className="text-[11px] leading-relaxed text-white/40">
                    Av. Paulista, 2000 - 18º Andar
                    <br />
                    Bela Vista, São Paulo - SP
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-3.5 text-[#c5a47e]/60" />
                  <a
                    href="tel:+551130000000"
                    className="text-[11px] text-white/40"
                  >
                    +55 (11) 3000-0000
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="size-3.5 text-[#c5a47e]/60" />
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-[11px] text-white/40"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Áreas de Credibilidade (Replace rural badges) */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-8 border-y border-white/5 py-10 lg:gap-16">
          {[
            "OAB/SP",
            "Chambers Global",
            "The Legal 500",
            "Análise Advocacia 500",
          ].map((badge) => (
            <span
              key={badge}
              className="text-[9px] font-bold tracking-[0.4em] text-white/20 uppercase"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Rodapé Final */}
        <div className="mt-12 flex flex-col items-center justify-between gap-8 lg:flex-row">
          {/* <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2 transition-all"
          >
            <div className="flex size-10 items-center justify-center rounded-full border border-white/5 transition-colors group-hover:border-[#c5a47e]/40">
              <ChevronUp className="size-4 text-white/20 group-hover:text-[#c5a47e]" />
            </div>
            <span className="text-[8px] tracking-[0.3em] text-white/20 uppercase group-hover:text-white">
              Voltar ao Topo
            </span>
          </button> */}

          <div className="flex items-center gap-6 text-[10px] font-light tracking-widest text-white/20">
            <Link
              href="/termos-de-uso"
              className="transition-colors hover:text-[#c5a47e]"
            >
              TERMOS DE USO
            </Link>
            <Link
              href="/privacidade"
              className="transition-colors hover:text-[#c5a47e]"
            >
              PRIVACIDADE
            </Link>
          </div>
          <p className="text-[9px] font-light tracking-widest text-white/20">
            © {currentYear} VON MARINS & ASSOCIADOS. TODOS OS DIREITOS
            RESERVADOS.
          </p>
        </div>
      </div>

      {/* Marca d'água sutil ao fundo */}
      <div className="pointer-events-none absolute right-0 -bottom-10 z-0 opacity-[0.02]">
        <Gavel className="size-96 text-white" />
      </div>
    </footer>
  );
}
