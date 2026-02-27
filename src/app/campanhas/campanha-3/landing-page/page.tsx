import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
// import Image from 'next/image';
import {
  ArrowLeftRight,
  ArrowRight,
  Building2,
  ChevronDown,
  Globe,
  Network,
  PieChart,
  Scale,
  Shield,
  Users,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Landing Page Societário e M&A",
  description:
    "Campanha voltada a operações de M&A, reestruturação societária e assessoria estratégica em transações corporativas.",
  alternates: {
    canonical: "/landing-page-3",
  },
};

// Componente de animação
const Reveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <div
    className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-1000"
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

export default function CampanhaSocietarioMA() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#0a0a0b] font-sans text-white selection:bg-[#c5a47e] selection:text-[#0a0a0b]">
      {/* HEADER */}
      <nav className="absolute top-0 z-50 w-full py-6 lg:py-8">
        <div className="container mx-auto flex items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <span className="font-bitter text-xl font-bold tracking-tighter">
              VON <span className="text-[#c5a47e]">MARINS</span>
            </span>
            <div className="hidden items-center gap-4 text-[9px] font-medium tracking-wider text-white/40 uppercase lg:flex">
              <span>M&A • Private Equity</span>
              <span className="h-1 w-1 rounded-full bg-white/20"></span>
              <span>Corporate Law</span>
            </div>
          </div>
          <div className="mx-10 hidden h-px flex-1 bg-white/5 lg:block" />
          <Link
            href="/contato"
            className="text-[10px] font-bold tracking-[0.3em] text-[#c5a47e] uppercase transition-colors hover:text-white"
          >
            Deal Team Access
          </Link>
        </div>
      </nav>

      {/* HERO: O PODER DAS TRANSAÇÕES */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        {/* Background com padrão de gráficos/linhas de tendência */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 60 L30 30 L50 45 L70 20' stroke='%23c5a47e' stroke-width='1' fill='none' opacity='0.3' /%3E%3Cpath d='M10 70 L30 50 L50 65 L70 40' stroke='%23c5a47e' stroke-width='0.5' fill='none' opacity='0.2' /%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
        <div className="absolute top-1/2 left-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5a47e]/5 blur-[160px]" />

        <div className="relative z-10 container mx-auto text-center">
          <Reveal>
            <span className="mb-8 inline-block text-[10px] font-bold tracking-[0.6em] text-[#c5a47e] uppercase">
              M&A • CAPITAL MARKETS • 2026
            </span>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="font-bitter mx-auto max-w-5xl text-5xl leading-[1.1] font-light lg:text-8xl">
              Onde o capital encontra <br />
              <span className="text-[#c5a47e] italic">
                a segurança jurídica.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mx-auto mt-12 max-w-2xl text-lg leading-relaxed font-light text-white/40 lg:text-xl">
              Em fusões, aquisições e reestruturações societárias de alta
              complexidade, o sucesso não está apenas no negócio fechado, mas na
              blindagem jurídica que garante sua perenidade.
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mt-16 flex flex-col items-center justify-center gap-8">
              <Link
                href="#deals"
                className="group flex items-center gap-6 rounded-full border border-[#c5a47e]/30 bg-transparent px-12 py-6 text-[10px] font-bold tracking-[0.3em] uppercase transition-all hover:bg-[#c5a47e] hover:text-[#0a0a0b]"
              >
                Estruturar Operação
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-2"
                />
              </Link>
              <div className="flex animate-bounce flex-col items-center gap-2 opacity-20">
                <span className="text-[8px] font-bold tracking-widest uppercase">
                  Deal Flow
                </span>
                <ChevronDown size={14} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SEÇÃO: METRICA DE MERCADO */}
      <section className="border-y border-white/5 bg-[#0d0d0e] py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                value: "R$ 4.2B",
                label: "Em transações assessoradas",
                delay: 0.1,
              },
              {
                value: "45+",
                label: "Operações de M&A concluídas",
                delay: 0.2,
              },
              { value: "12", label: "Jurisdições diferentes", delay: 0.3 },
              {
                value: "100%",
                label: "Deals sem contingenciamento",
                delay: 0.4,
              },
            ].map((metric, index) => (
              <Reveal key={index} delay={metric.delay}>
                <div className="p-6 text-center">
                  <div className="font-bitter mb-3 text-4xl font-bold text-[#c5a47e]">
                    {metric.value}
                  </div>
                  <div className="text-[10px] font-bold tracking-wider text-white/30 uppercase">
                    {metric.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: ÁREAS DE ATUAÇÃO */}
      <section id="deals" className="py-32">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <Reveal>
              <span className="mb-4 block text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                Expertise
              </span>
              <h2 className="font-bitter text-4xl font-light lg:text-5xl">
                Estruturação societária <br />
                <span className="text-[#c5a47e] italic">
                  de alta complexidade
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-3">
            {[
              {
                icon: <ArrowLeftRight size={36} />,
                title: "Fusões & Aquisições",
                description:
                  "Assessoria completa em processos de M&A, desde a due diligence até o closing, incluindo estruturação de earn-outs, representações e garantias.",
                items: [
                  "Due diligence legal e fiscal",
                  "Negociação de contratos",
                  "Closing e pós-closing",
                ],
              },
              {
                icon: <Network size={36} />,
                title: "Reestruturação Societária",
                description:
                  "Arquitetura de estruturas societárias eficientes, cisões, incorporações e reorganizações para otimização de governança e tributação.",
                items: [
                  "Holdings familiares",
                  "Incorporações e cisões",
                  "Governança corporativa",
                ],
              },
              {
                icon: <Building2 size={36} />,
                title: "Private Equity & Venture Capital",
                description:
                  "Estruturação de fundos de investimento, rodadas de captação, acordo de sócios e estratégias de exit para investidores e startups.",
                items: [
                  "Acordos de sócios",
                  "Vesting e tag along",
                  "Estratégias de desinvestimento",
                ],
              },
            ].map((area, index) => (
              <Reveal key={index} delay={0.1 * index}>
                <div className="group h-full rounded-3xl border border-white/5 bg-[#0d0d0e] p-10 transition-all hover:translate-y-[-4px] hover:border-[#c5a47e]/30">
                  <div className="mb-8 text-[#c5a47e] transition-transform group-hover:scale-110">
                    {area.icon}
                  </div>
                  <h3 className="font-bitter mb-4 text-2xl font-bold">
                    {area.title}
                  </h3>
                  <p className="mb-8 text-sm leading-relaxed text-white/40">
                    {area.description}
                  </p>
                  <ul className="space-y-3">
                    {area.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs">
                        <div className="h-1 w-1 rounded-full bg-[#c5a47e]"></div>
                        <span className="font-medium text-white/30">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: HOLDINGS FAMILIARES (DESTAQUE) */}
      <section className="border-y border-white/5 bg-[#0d0d0e] py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <Reveal>
                <span className="mb-6 block text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                  Governança de Holdings
                </span>
                <h2 className="font-bitter mb-8 text-4xl font-light lg:text-6xl">
                  Estruturas que <br />
                  <span className="text-[#c5a47e] italic">
                    unificam patrimônios
                  </span>
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-white/40">
                  Holdings familiares de alta complexidade exigem mais do que
                  uma simples estrutura jurídica. Demandam governança robusta,
                  proteção patrimonial e planejamento sucessório integrado.
                </p>
                <ul className="space-y-5">
                  {[
                    "Blindagem patrimonial contra riscos operacionais",
                    "Otimização tributária em múltiplas jurisdições",
                    "Protocolos de governança e conselho de família",
                    "Planejamento sucessório integrado à holding",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <Shield
                        size={18}
                        className="mt-0.5 flex-shrink-0 text-[#c5a47e]"
                      />
                      <span className="text-sm text-white/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative mx-auto h-[500px] w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#161617] shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-80" />
                <div className="flex h-full w-full items-center justify-center bg-[#1a1a1c] p-12 text-center">
                  <div className="space-y-4">
                    <div className="flex justify-center gap-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#c5a47e]/30 text-[#c5a47e]">
                        H1
                      </div>
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#c5a47e]/30 text-[#c5a47e]">
                        H2
                      </div>
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#c5a47e]/30 text-[#c5a47e]">
                        H3
                      </div>
                    </div>
                    <p className="font-bitter text-sm tracking-widest text-[#c5a47e]/40 uppercase italic">
                      Estrutura de Holdings
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-10 left-10">
                  <div className="mb-4 flex items-center gap-2">
                    <PieChart size={14} className="text-[#c5a47e]" />
                    <span className="text-[10px] font-bold tracking-widest text-[#c5a47e] uppercase">
                      Governança Integrada
                    </span>
                  </div>
                  <h4 className="font-bitter text-2xl font-bold">
                    Holdings Familiares
                  </h4>
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 -z-10 size-40 rounded-full border border-[#c5a47e]/20" />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: DIFERENCIAIS EM M&A */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <Reveal>
              <span className="mb-4 block text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                Due Diligence 360°
              </span>
              <h2 className="font-bitter text-4xl font-light lg:text-5xl">
                O que nos diferencia <br />
                <span className="text-[#c5a47e] italic">
                  em operações de M&A
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
            {[
              {
                icon: <Scale size={28} />,
                title: "Due Diligence Forense",
                description:
                  "Análise profunda de passivos ocultos, contingências trabalhistas e tributárias que podem comprometer o valuation.",
              },
              {
                icon: <Zap size={28} />,
                title: "Estruturação de Earn-outs",
                description:
                  "Mecanismos de ajuste de preço pós-fechamento alinhados às metas de performance e proteção ao comprador.",
              },
              {
                icon: <Users size={28} />,
                title: "Acordos de Sócios Complexos",
                description:
                  "Elaboração de pactos parasociais com cláusulas de tag along, drag along, put e call options.",
              },
              {
                icon: <Globe size={28} />,
                title: "Cross-border Transactions",
                description:
                  "Coordenação com escritórios correlatos em múltiplas jurisdições para operações internacionais.",
              },
            ].map((item, index) => (
              <Reveal key={index} delay={0.1 * index}>
                <div className="flex gap-6 rounded-2xl border border-white/5 p-8 transition-colors hover:border-[#c5a47e]/30">
                  <div className="flex-shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#c5a47e]/10 text-[#c5a47e]">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bitter mb-3 text-xl font-bold">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/40">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: PROCESSO DE M&A */}
      <section className="border-y border-white/5 bg-[#0d0d0e] py-32">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <Reveal>
              <span className="mb-4 block text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                Metodologia
              </span>
              <h2 className="font-bitter text-4xl font-light lg:text-5xl">
                O ciclo completo do{" "}
                <span className="text-[#c5a47e] italic">deal</span>
              </h2>
            </Reveal>
          </div>

          <div className="relative mx-auto flex max-w-6xl flex-col justify-between gap-8 lg:flex-row">
            {/* Linha conectora (decorativa) */}
            <div className="absolute top-12 right-[15%] left-[15%] hidden h-px bg-gradient-to-r from-transparent via-[#c5a47e]/20 to-transparent lg:block" />

            {[
              {
                phase: "01",
                title: "Planejamento",
                desc: "Definição da estratégia, valuation e estrutura da operação",
              },
              {
                phase: "02",
                title: "Due Diligence",
                desc: "Análise profunda de aspectos legais, fiscais e trabalhistas",
              },
              {
                phase: "03",
                title: "Negociação",
                desc: "Elaboração e negociação de contratos, SPA e acordos de acionistas",
              },
              {
                phase: "04",
                title: "Closing",
                desc: "Implementação da operação e condições precedentes",
              },
              {
                phase: "05",
                title: "Pós-closing",
                desc: "Integração pós-fusão e ajustes contratuais",
              },
            ].map((step, index) => (
              <div key={index} className="flex-1 text-center">
                <Reveal delay={0.1 * index}>
                  <div className="relative z-10">
                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#c5a47e]/30 bg-[#0a0a0b]">
                      <span className="font-bitter text-3xl text-[#c5a47e]">
                        {step.phase}
                      </span>
                    </div>
                    <h3 className="font-bitter mb-3 text-xl font-bold">
                      {step.title}
                    </h3>
                    <p className="px-4 text-xs leading-relaxed text-white/40">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: CASES */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <Reveal>
              <span className="mb-4 block text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                Operações Recentes
              </span>
              <h2 className="font-bitter text-4xl font-light lg:text-5xl">
                Transações que{" "}
                <span className="text-[#c5a47e] italic">marcaram mercado</span>
              </h2>
            </Reveal>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                type: "M&A • Tech",
                title: "Aquisição de fintech por grupo bancário",
                value: "R$ 450M",
                description:
                  "Due diligence completa, negociação de SPA e estruturação de earn-out baseado em métricas de performance.",
              },
              {
                type: "Reestruturação • Indústria",
                title: "Holdings familiar do setor industrial",
                value: "R$ 1.2B",
                description:
                  "Reorganização societária de grupo com 12 empresas, criando holding pura e otimização tributária.",
              },
              {
                type: "PE • Saúde",
                title: "Aporte de private equity em rede de clínicas",
                value: "R$ 280M",
                description:
                  "Estruturação do investment agreement, acordo de sócios e governança pós-investimento.",
              },
            ].map((case_, index) => (
              <Reveal key={index} delay={0.1 * index}>
                <div className="group h-full rounded-2xl border border-white/5 bg-[#0d0d0e] p-8 transition-all hover:border-[#c5a47e]/30">
                  <div className="mb-4 text-[10px] font-bold tracking-wider text-[#c5a47e] uppercase">
                    {case_.type}
                  </div>
                  <h3 className="font-bitter mb-2 text-xl font-bold transition-colors group-hover:text-[#c5a47e]">
                    {case_.title}
                  </h3>
                  <div className="mb-4 text-2xl font-light text-[#c5a47e]">
                    {case_.value}
                  </div>
                  <p className="text-sm leading-relaxed text-white/40">
                    {case_.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t border-white/5 bg-gradient-to-br from-[#0a0a0b] to-[#1a1a1c] py-32">
        <div className="container mx-auto text-center">
          <Reveal>
            <span className="mb-6 block text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
              Inicie sua operação
            </span>
            <h2 className="font-bitter text-4xl leading-tight font-light lg:text-7xl">
              Pronto para estruturar <br />
              <span className="font-black italic">sua próxima transação?</span>
            </h2>
            <p className="mx-auto mt-10 max-w-2xl text-lg font-light opacity-60">
              Nossa equipe de M&A está preparada para assessorar sua operação
              com excelência técnica, visão estratégica e absoluta
              confidencialidade.
            </p>
            <div className="mt-16 flex flex-col items-center justify-center gap-6">
              <Link
                href="/contato"
                className="group flex items-center gap-6 rounded-full bg-[#c5a47e] px-16 py-7 text-xs font-bold tracking-[0.4em] text-[#0a0a0b] transition-all hover:scale-105 hover:bg-[#d4b594]"
              >
                APRESENTAR OPORTUNIDADE
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-2"
                />
              </Link>
              <p className="text-[10px] font-bold tracking-widest uppercase opacity-40">
                Confidencialidade garantida • NDA sob consulta
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-20">
        <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-6 lg:flex-row">
          <div className="flex items-center gap-4">
            <span className="font-bitter text-xl font-bold tracking-tighter opacity-30">
              VON MARINS
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[8px] font-bold tracking-widest text-white/10 uppercase">
              Corporate • M&A
            </span>
          </div>
          <div className="flex gap-10 text-[9px] font-bold tracking-widest text-white/20 uppercase">
            <Link href="/privacidade" className="hover:text-[#c5a47e]">
              Privacidade
            </Link>
            <Link href="/termos-de-uso" className="hover:text-[#c5a47e]">
              Termos Institucionais
            </Link>
            <Link href="/privacidade" className="hover:text-[#c5a47e]">
              Sigilo de Dados
            </Link>
          </div>
          <span className="text-[9px] font-bold tracking-widest text-white/10 uppercase">
            © {currentYear} Von Marins - Advocacia & Consultoria
          </span>
        </div>
      </footer>
    </div>
  );
}
