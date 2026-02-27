import {
  ArrowRight,
  Briefcase,
  ChevronRight,
  FileText,
  Globe,
  Heart,
  Instagram,
  Landmark,
  Target,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Campanhas | Von Marins Advocacia",
  description:
    "Portfólio de campanhas estratégicas da Von Marins: Institucional, Governança Sucessória e Societário & M&A.",
  alternates: {
    canonical: "/campanhas",
  },
};

export default function CampanhasPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] font-sans text-white">
      {/* HEADER */}
      <nav className="border-b border-white/5 py-6">
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-3 text-white/60 transition-colors hover:text-white"
          >
            <ArrowRight size={16} className="rotate-180" />
            <span className="text-xs font-bold tracking-wider uppercase">
              Voltar para o Site
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#c5a47e] uppercase">
              Portfólio de Campanhas
            </span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5 py-24">
        <div className="absolute top-1/2 left-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5a47e]/5 blur-[160px]" />

        <div className="relative container mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-bitter mb-6 text-5xl leading-tight font-light lg:text-7xl">
            Campanhas <br />
            <span className="text-[#c5a47e] italic">Estratégicas</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/40">
            Conheça o portfólio completo de campanhas desenvolvidas para a Von
            Marins, cada uma com landing page, estratégia de conteúdo e
            planejamento para Instagram.
          </p>
        </div>
      </section>

      {/* GRID DE CAMPANHAS */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Campanha 1 - Institucional */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-[#0d0d0e] to-[#0a0a0b] transition-all hover:border-[#c5a47e]/30 hover:shadow-2xl">
              <div className="absolute top-0 right-0 h-64 w-64 translate-x-16 -translate-y-16 rounded-full bg-[#c5a47e]/5 blur-3xl transition-transform group-hover:scale-150" />

              <div className="relative p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c5a47e]/10">
                  <Landmark size={32} className="text-[#c5a47e]" />
                </div>

                <span className="mb-3 inline-block rounded-full border border-[#c5a47e]/30 px-4 py-1 text-[10px] font-bold tracking-wider text-[#c5a47e] uppercase">
                  Campanha 01
                </span>

                <h2 className="font-bitter mb-3 text-2xl font-bold">
                  Institucional
                </h2>

                <p className="mb-6 text-sm text-white/40">
                  Posicionamento de autoridade, identidade da banca,
                  apresentação dos pilares de atuação e infraestrutura de alto
                  padrão.
                </p>

                <div className="mb-8 flex flex-wrap gap-3">
                  {["#Autoridade", "#Boutique", "#AvPaulista"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold tracking-wider text-white/20 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-4 border-t border-white/5 pt-6">
                  <Link
                    href="/campanhas/campanha-1/landing-page"
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:border-[#c5a47e]/30 hover:bg-[#c5a47e]/5"
                  >
                    <div className="flex items-center gap-3">
                      <Globe size={16} className="text-[#c5a47e]" />
                      <span className="text-sm font-medium">Landing Page</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-white/20 transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="/campanhas/campanha-1/estrategia"
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:border-[#c5a47e]/30 hover:bg-[#c5a47e]/5"
                  >
                    <div className="flex items-center gap-3">
                      <Target size={16} className="text-[#c5a47e]" />
                      <span className="text-sm font-medium">Estratégia</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-white/20 transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="/campanhas/campanha-1/instagram"
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:border-[#c5a47e]/30 hover:bg-[#c5a47e]/5"
                  >
                    <div className="flex items-center gap-3">
                      <Instagram size={16} className="text-[#c5a47e]" />
                      <span className="text-sm font-medium">Instagram</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-white/20 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Campanha 2 - Governança Sucessória */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-[#0d0d0e] to-[#0a0a0b] transition-all hover:border-[#c5a47e]/30 hover:shadow-2xl">
              <div className="absolute top-0 right-0 h-64 w-64 translate-x-16 -translate-y-16 rounded-full bg-[#c5a47e]/5 blur-3xl transition-transform group-hover:scale-150" />

              <div className="relative p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c5a47e]/10">
                  <Heart size={32} className="text-[#c5a47e]" />
                </div>

                <span className="mb-3 inline-block rounded-full border border-[#c5a47e]/30 px-4 py-1 text-[10px] font-bold tracking-wider text-[#c5a47e] uppercase">
                  Campanha 02
                </span>

                <h2 className="font-bitter mb-3 text-2xl font-bold">
                  Governança Sucessória
                </h2>

                <p className="mb-6 text-sm text-white/40">
                  Planejamento sucessório, holdings familiares, protocolos de
                  família e preservação de legados multigeracionais.
                </p>

                <div className="mb-8 flex flex-wrap gap-3">
                  {["#Legado", "#Holdings", "#Sucessão"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold tracking-wider text-white/20 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-4 border-t border-white/5 pt-6">
                  <Link
                    href="/campanhas/campanha-2/landing-page"
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:border-[#c5a47e]/30 hover:bg-[#c5a47e]/5"
                  >
                    <div className="flex items-center gap-3">
                      <Globe size={16} className="text-[#c5a47e]" />
                      <span className="text-sm font-medium">Landing Page</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-white/20 transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="/campanhas/campanha-2/estrategia"
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:border-[#c5a47e]/30 hover:bg-[#c5a47e]/5"
                  >
                    <div className="flex items-center gap-3">
                      <Target size={16} className="text-[#c5a47e]" />
                      <span className="text-sm font-medium">Estratégia</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-white/20 transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="/campanhas/campanha-2/instagram"
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:border-[#c5a47e]/30 hover:bg-[#c5a47e]/5"
                  >
                    <div className="flex items-center gap-3">
                      <Instagram size={16} className="text-[#c5a47e]" />
                      <span className="text-sm font-medium">Instagram</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-white/20 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Campanha 3 - Societário e M&A */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-[#0d0d0e] to-[#0a0a0b] transition-all hover:border-[#c5a47e]/30 hover:shadow-2xl">
              <div className="absolute top-0 right-0 h-64 w-64 translate-x-16 -translate-y-16 rounded-full bg-[#c5a47e]/5 blur-3xl transition-transform group-hover:scale-150" />

              <div className="relative p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c5a47e]/10">
                  <Briefcase size={32} className="text-[#c5a47e]" />
                </div>

                <span className="mb-3 inline-block rounded-full border border-[#c5a47e]/30 px-4 py-1 text-[10px] font-bold tracking-wider text-[#c5a47e] uppercase">
                  Campanha 03
                </span>

                <h2 className="font-bitter mb-3 text-2xl font-bold">
                  Societário e M&A
                </h2>

                <p className="mb-6 text-sm text-white/40">
                  Fusões e aquisições, reestruturação societária, private equity
                  e governança corporativa de alta complexidade.
                </p>

                <div className="mb-8 flex flex-wrap gap-3">
                  {["#M&A", "#PrivateEquity", "#Corporate"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold tracking-wider text-white/20 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-4 border-t border-white/5 pt-6">
                  <Link
                    href="/campanhas/campanha-3/landing-page"
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:border-[#c5a47e]/30 hover:bg-[#c5a47e]/5"
                  >
                    <div className="flex items-center gap-3">
                      <Globe size={16} className="text-[#c5a47e]" />
                      <span className="text-sm font-medium">Landing Page</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-white/20 transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="/campanhas/campanha-3/estrategia"
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:border-[#c5a47e]/30 hover:bg-[#c5a47e]/5"
                  >
                    <div className="flex items-center gap-3">
                      <Target size={16} className="text-[#c5a47e]" />
                      <span className="text-sm font-medium">Estratégia</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-white/20 transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="/campanhas/campanha-3/instagram"
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:border-[#c5a47e]/30 hover:bg-[#c5a47e]/5"
                  >
                    <div className="flex items-center gap-3">
                      <Instagram size={16} className="text-[#c5a47e]" />
                      <span className="text-sm font-medium">Instagram</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-white/20 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE RESUMO */}
      <section className="border-y border-white/5 bg-[#0d0d0e] py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#c5a47e]/10">
                  <FileText size={28} className="text-[#c5a47e]" />
                </div>
              </div>
              <div className="font-bitter text-3xl font-bold text-[#c5a47e]">
                3
              </div>
              <div className="mt-2 text-sm font-bold tracking-wider text-white/30 uppercase">
                Landing Pages
              </div>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#c5a47e]/10">
                  <Target size={28} className="text-[#c5a47e]" />
                </div>
              </div>
              <div className="font-bitter text-3xl font-bold text-[#c5a47e]">
                3
              </div>
              <div className="mt-2 text-sm font-bold tracking-wider text-white/30 uppercase">
                Estratégias Detalhadas
              </div>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#c5a47e]/10">
                  <Users size={28} className="text-[#c5a47e]" />
                </div>
              </div>
              <div className="font-bitter text-3xl font-bold text-[#c5a47e]">
                27
              </div>
              <div className="mt-2 text-sm font-bold tracking-wider text-white/30 uppercase">
                Posts para Instagram
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER DA PÁGINA */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm text-white/30">
            Cada campanha foi desenvolvida com estratégia personalizada,
            alinhada aos valores de excelência e alto padrão da Von Marins
            Advocacia.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold tracking-wider text-white/20 uppercase">
            <span>© 2026 Von Marins</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Todos os direitos reservados</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <Link
              href="/privacidade"
              className="transition-colors hover:text-[#c5a47e]"
            >
              Privacidade
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
