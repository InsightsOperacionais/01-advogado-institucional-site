// campanha-1/estrategia/page.tsx
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Calendar,
  ChevronRight,
  Globe,
  Instagram,
  Target,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Estratégia da Campanha | Von Marins",
  description:
    "Estratégia completa da campanha institucional da Von Marins, com objetivos, público-alvo, canais e métricas de sucesso.",
  alternates: {
    canonical: "/campanha-1/estrategia",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function EstrategiaCampanha1() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] font-sans text-white">
      {/* HEADER SIMPLES */}
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
              Campanha 01 • Institucional
            </span>
          </div>
        </div>
      </nav>

      {/* HERO DA ESTRATÉGIA */}
      <section className="relative overflow-hidden border-b border-white/5 py-32">
        <div className="absolute top-1/2 left-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5a47e]/5 blur-[160px]" />

        <div className="relative container mx-auto max-w-5xl text-center">
          <span className="mb-4 inline-block text-[10px] font-bold tracking-[0.6em] text-[#c5a47e] uppercase">
            Estratégia de Comunicação
          </span>

          <h1 className="font-bitter mb-8 text-5xl leading-tight font-light lg:text-7xl">
            Posicionando a Von Marins como <br />
            <span className="text-[#c5a47e] italic">
              referência em advocacia de alto padrão
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/40">
            Esta campanha tem como objetivo consolidar a imagem da Von Marins
            como uma banca jurídica de elite, especializada em transações
            complexas, governança familiar e engenharia fiscal para grandes
            fortunas e grupos corporativos.
          </p>
        </div>
      </section>

      {/* CARDS DE NAVEGAÇÃO PARA AS OUTRAS PÁGINAS */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Card Landing Page */}
            <Link
              href="/campanhas/campanha-1/landing-page"
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#0d0d0e] p-12 transition-all hover:border-[#c5a47e]/30 hover:shadow-2xl"
            >
              <div className="absolute top-0 right-0 h-64 w-64 translate-x-16 translate-y-16 rounded-full bg-[#c5a47e]/5 blur-3xl transition-transform group-hover:scale-150" />

              <Globe size={48} className="mb-8 text-[#c5a47e]" />

              <h2 className="font-bitter mb-4 text-3xl font-bold">
                Landing Page
              </h2>
              <p className="mb-8 text-white/40">
                Página principal da campanha com a identidade institucional da
                Von Marins, apresentando os três pilares de atuação,
                infraestrutura e call to action para consulta estratégica.
              </p>

              <div className="flex items-center gap-4 text-sm font-bold tracking-wider text-[#c5a47e] uppercase">
                <span>Acessar Landing Page</span>
                <ChevronRight
                  size={16}
                  className="transition-transform group-hover:translate-x-2"
                />
              </div>
            </Link>

            {/* Card Instagram */}
            <Link
              href="/campanha-1/instagram"
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#0d0d0e] p-12 transition-all hover:border-[#c5a47e]/30 hover:shadow-2xl"
            >
              <div className="absolute top-0 right-0 h-64 w-64 translate-x-16 translate-y-16 rounded-full bg-[#c5a47e]/5 blur-3xl transition-transform group-hover:scale-150" />

              <Instagram size={48} className="mb-8 text-[#c5a47e]" />

              <h2 className="font-bitter mb-4 text-3xl font-bold">
                Estratégia Instagram
              </h2>
              <p className="mb-8 text-white/40">
                Planejamento completo de conteúdo para o Instagram, com
                calendário editorial, grid 3x3 de posts, definição de tom de voz
                e métricas de engajamento para a rede social.
              </p>

              <div className="flex items-center gap-4 text-sm font-bold tracking-wider text-[#c5a47e] uppercase">
                <span>Ver Estratégia Instagram</span>
                <ChevronRight
                  size={16}
                  className="transition-transform group-hover:translate-x-2"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* OBJETIVOS DA CAMPANHA */}
      <section className="border-y border-white/5 bg-[#0d0d0e] py-24">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <span className="mb-4 block text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
              Objetivos Estratégicos
            </span>
            <h2 className="font-bitter text-4xl font-light lg:text-5xl">
              O que queremos{" "}
              <span className="text-[#c5a47e] italic">alcançar</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Target size={32} />,
                title: "Posicionamento",
                desc: "Consolidar a imagem de banca boutique de alto padrão, especializada em transações complexas.",
              },
              {
                icon: <Users size={32} />,
                title: "Autoridade",
                desc: "Demonstrar expertise técnica em direito societário, sucessório e engenharia fiscal.",
              },
              {
                icon: <BarChart3 size={32} />,
                title: "Leads Qualificados",
                desc: "Gerar contatos de empresários, family offices e investidores para consultas estratégicas.",
              },
              {
                icon: <Calendar size={32} />,
                title: "Presença Digital",
                desc: "Estabelecer uma presença consistente e relevante no Instagram e no site institucional.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/5 bg-[#0a0a0b] p-8 text-center"
              >
                <div className="mb-6 flex justify-center text-[#c5a47e]">
                  {item.icon}
                </div>
                <h3 className="font-bitter mb-3 text-xl font-bold">
                  {item.title}
                </h3>
                <p className="text-sm text-white/40">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PÚBLICO-ALVO */}
      <section className="py-24">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="mb-4 block text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                Quem Queremos Alcançar
              </span>
              <h2 className="font-bitter mb-8 text-4xl font-light lg:text-5xl">
                Público de{" "}
                <span className="text-[#c5a47e] italic">alto perfil</span>
              </h2>
              <p className="text-lg leading-relaxed text-white/40">
                A comunicação será direcionada a tomadores de decisão que buscam
                assessoria jurídica de excelência para estruturas patrimoniais
                complexas.
              </p>
            </div>

            <div className="space-y-6">
              {[
                "Empresários e CEOs de médias e grandes empresas",
                "Family offices e herdeiros de grandes fortunas",
                "Investidores institucionais e private equity",
                "Conselheiros de administração e membros de boards",
                "Profissionais do direito que buscam parcerias estratégicas",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 border-b border-white/5 pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c5a47e]/10 text-[#c5a47e]">
                    {index + 1}
                  </div>
                  <p className="text-white/60">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CANAIS E FORMATOS */}
      <section className="border-y border-white/5 bg-[#0d0d0e] py-24">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <span className="mb-4 block text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
              Canais e Formatos
            </span>
            <h2 className="font-bitter text-4xl font-light lg:text-5xl">
              Onde e como{" "}
              <span className="text-[#c5a47e] italic">vamos comunicar</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-[#0a0a0b] p-8">
              <Globe size={32} className="mb-6 text-[#c5a47e]" />
              <h3 className="font-bitter mb-3 text-xl font-bold">
                Landing Page
              </h3>
              <p className="mb-4 text-sm text-white/40">
                Página principal que consolida toda a identidade e os pilares da
                Von Marins.
              </p>
              <ul className="space-y-2 text-xs text-white/30">
                <li>• Copywriting institucional de alto padrão</li>
                <li>• Design sofisticado com elementos de luxo</li>
                <li>• Call to action para consulta estratégica</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#0a0a0b] p-8">
              <Instagram size={32} className="mb-6 text-[#c5a47e]" />
              <h3 className="font-bitter mb-3 text-xl font-bold">Instagram</h3>
              <p className="mb-4 text-sm text-white/40">
                Conteúdo visual e educativo para construir autoridade e
                engajamento.
              </p>
              <ul className="space-y-2 text-xs text-white/30">
                <li>• Grid 3x3 com 9 posts estratégicos</li>
                <li>• Stories com cases e bastidores</li>
                <li>• Reels com conteúdo educativo</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#0a0a0b] p-8">
              <Briefcase size={32} className="mb-6 text-[#c5a47e]" />
              <h3 className="font-bitter mb-3 text-xl font-bold">
                Blog / Insights
              </h3>
              <p className="mb-4 text-sm text-white/40">
                Artigos aprofundados sobre temas jurídicos complexos.
              </p>
              <ul className="space-y-2 text-xs text-white/30">
                <li>• 10 artigos sobre governança sucessória</li>
                <li>• Due diligence em M&A</li>
                <li>• Planejamento tributário internacional</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="overflow-hidden py-24">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <span className="mb-4 block text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
              Cronograma
            </span>
            <h2 className="font-bitter text-4xl font-light lg:text-5xl">
              Fases da <span className="text-[#c5a47e] italic">Campanha</span>
            </h2>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Linha vertical (apenas mobile) */}
            <div className="absolute top-0 left-8 h-full w-px bg-gradient-to-b from-[#c5a47e]/20 via-[#c5a47e]/40 to-transparent md:hidden" />

            {/* Linha horizontal (apenas desktop) */}
            <div className="absolute top-0 left-1/2 hidden h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#c5a47e]/40 to-transparent md:block" />

            {/* Itens da timeline - Mobile (empilhado) */}
            <div className="space-y-12 md:hidden">
              {[
                {
                  phase: "Fase 1",
                  title: "Planejamento",
                  period: "Semana 1-2",
                  desc: "Definição da estratégia, briefing criativo, produção de conteúdo e arte para os posts.",
                  icon: <Target size={24} />,
                },
                {
                  phase: "Fase 2",
                  title: "Lançamento",
                  period: "Semana 3",
                  desc: "Publicação da landing page e primeiros posts no Instagram. Impulsionamento inicial.",
                  icon: <Instagram size={24} />,
                },
                {
                  phase: "Fase 3",
                  title: "Consolidação",
                  period: "Semanas 4-6",
                  desc: "Continuidade do calendário editorial, análise de métricas e otimização de conteúdo.",
                  icon: <BarChart3 size={24} />,
                },
                {
                  phase: "Fase 4",
                  title: "Avaliação",
                  period: "Semana 8",
                  desc: "Relatório de resultados, análise de leads gerados e planejamento da próxima campanha.",
                  icon: <Calendar size={24} />,
                },
              ].map((item, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#c5a47e]/30 bg-[#0a0a0b] text-[#c5a47e]">
                    {item.icon}
                  </div>
                  <div className="flex-1 rounded-2xl border border-white/5 bg-[#0d0d0e] p-6">
                    <div className="mb-2 text-xs font-bold text-[#c5a47e] uppercase">
                      {item.phase} • {item.period}
                    </div>
                    <h3 className="font-bitter mb-2 text-xl font-bold">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/40">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Itens da timeline - Desktop (alternado) */}
            <div className="relative top-12 hidden h-[600px] md:block">
              {[
                {
                  phase: "Fase 1",
                  title: "Planejamento",
                  period: "Semana 1-2",
                  desc: "Definição da estratégia, briefing criativo, produção de conteúdo e arte para os posts.",
                  align: "left",
                  icon: <Target size={24} />,
                  top: 0,
                },
                {
                  phase: "Fase 2",
                  title: "Lançamento",
                  period: "Semana 3",
                  desc: "Publicação da landing page e primeiros posts no Instagram. Impulsionamento inicial.",
                  align: "right",
                  icon: <Instagram size={24} />,
                  top: 150,
                },
                {
                  phase: "Fase 3",
                  title: "Consolidação",
                  period: "Semanas 4-6",
                  desc: "Continuidade do calendário editorial, análise de métricas e otimização de conteúdo.",
                  align: "left",
                  icon: <BarChart3 size={24} />,
                  top: 300,
                },
                {
                  phase: "Fase 4",
                  title: "Avaliação",
                  period: "Semana 8",
                  desc: "Relatório de resultados, análise de leads gerados e planejamento da próxima campanha.",
                  align: "right",
                  icon: <Calendar size={24} />,
                  top: 450,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`absolute w-5/12 ${
                    item.align === "left" ? "left-0" : "right-0"
                  }`}
                  style={{ top: `${item.top}px` }}
                >
                  <div
                    className={`flex items-start gap-6 ${
                      item.align === "right" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#c5a47e]/30 bg-[#0a0a0b] text-[#c5a47e]">
                      {item.icon}
                    </div>
                    <div className="flex-1 rounded-2xl border border-white/5 bg-[#0d0d0e] p-6">
                      <div className="mb-2 text-xs font-bold text-[#c5a47e] uppercase">
                        {item.phase} • {item.period}
                      </div>
                      <h3 className="font-bitter mb-2 text-xl font-bold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/40">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MÉTRICAS DE SUCESSO */}
      <section className="border-t border-white/5 bg-[#0d0d0e] py-24">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <span className="mb-4 block text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
              KPIs
            </span>
            <h2 className="font-bitter text-4xl font-light lg:text-5xl">
              Como mediremos{" "}
              <span className="text-[#c5a47e] italic">o sucesso</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "+50%", label: "Aumento no tráfego do site" },
              { value: "1.000+", label: "Novos seguidores no Instagram" },
              { value: "5%", label: "Taxa de engajamento médio" },
              { value: "20+", label: "Leads qualificados" },
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="font-bitter text-5xl font-bold text-[#c5a47e]">
                  {metric.value}
                </div>
                <div className="mt-2 text-xs font-bold tracking-wider text-white/30 uppercase">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRÓXIMOS PASSOS */}
      <section className="py-24">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-bitter mb-8 text-4xl font-light lg:text-5xl">
            Pronto para conhecer os{" "}
            <span className="text-[#c5a47e] italic">detalhes</span>?
          </h2>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              href="/campanha-1/landing-page"
              className="group flex items-center gap-4 rounded-full border border-[#c5a47e]/30 bg-transparent px-10 py-5 text-xs font-bold tracking-[0.3em] uppercase transition-all hover:bg-[#c5a47e] hover:text-[#0a0a0b]"
            >
              Ver Landing Page
              <ChevronRight
                size={16}
                className="transition-transform group-hover:translate-x-2"
              />
            </Link>

            <Link
              href="/campanha-1/instagram"
              className="group flex items-center gap-4 rounded-full bg-[#c5a47e] px-10 py-5 text-xs font-bold tracking-[0.3em] text-[#0a0a0b] uppercase transition-all hover:bg-[#d4b594]"
            >
              Estratégia Instagram
              <ChevronRight
                size={16}
                className="transition-transform group-hover:translate-x-2"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
