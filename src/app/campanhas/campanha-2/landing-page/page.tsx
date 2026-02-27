import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
// import Image from 'next/image';
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Clock,
  FileText,
  Heart,
  TreePine,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Landing Page Governança Sucessória",
  description:
    "Campanha dedicada a estruturas de governança familiar, sucessão patrimonial e preservação de legado.",
  alternates: {
    canonical: "/landing-page-2",
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

export default function CampanhaGovernancaSucessoria() {
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
              <span>Legacy Planning</span>
              <span className="h-1 w-1 rounded-full bg-white/20"></span>
              <span>Family Office</span>
            </div>
          </div>
          <div className="mx-10 hidden h-px flex-1 bg-white/5 lg:block" />
          <Link
            href="/contato"
            className="text-[10px] font-bold tracking-[0.3em] text-[#c5a47e] uppercase transition-colors hover:text-white"
          >
            Fale com um Especialista
          </Link>
        </div>
      </nav>

      {/* HERO: A JORNADA DO LEGADO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        {/* Background Elements */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5a47e' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        <div className="relative z-10 container mx-auto text-center">
          <Reveal>
            <span className="mb-8 inline-block text-[10px] font-bold tracking-[0.6em] text-[#c5a47e] uppercase">
              Legacy Protection • 2026
            </span>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="font-bitter mx-auto max-w-5xl text-5xl leading-[1.1] font-light lg:text-8xl">
              O que você construiu <br />
              <span className="text-[#c5a47e] italic">
                merece atravessar gerações.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mx-auto mt-12 max-w-2xl text-lg leading-relaxed font-light text-white/40 lg:text-xl">
              A governança sucessória não é apenas sobre distribuição de bens. É
              sobre garantir que seus valores, seu nome e seu legado permaneçam
              intactos sob a proteção de uma arquitetura jurídica
              inquebrantável.
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mt-16 flex flex-col items-center justify-center gap-8">
              <Link
                href="#legado"
                className="group flex items-center gap-6 rounded-full border border-[#c5a47e]/30 bg-transparent px-12 py-6 text-[10px] font-bold tracking-[0.3em] uppercase transition-all hover:bg-[#c5a47e] hover:text-[#0a0a0b]"
              >
                Preservar Meu Legado
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-2"
                />
              </Link>
              <div className="flex animate-bounce flex-col items-center gap-2 opacity-20">
                <span className="text-[8px] font-bold tracking-widest uppercase">
                  O Peso da Eternidade
                </span>
                <ChevronDown size={14} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SEÇÃO: O DESAFIO SUCESSÓRIO */}
      <section className="border-y border-white/5 bg-[#0d0d0e] py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <Reveal>
              <span className="mb-6 block text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                O Diagnóstico
              </span>
              <h2 className="font-bitter mb-8 text-4xl font-light lg:text-5xl">
                O maior risco não é <br />
                <span className="text-[#c5a47e] italic">
                  perder, mas dividir mal.
                </span>
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-white/40">
                No Brasil, 70% das famílias perdem seu patrimônio até a segunda
                geração. Não por crises econômicas, mas pela ausência de uma
                estrutura jurídica que proteja o legado contra conflitos,
                ineficiência fiscal e a falta de governança.
              </p>
              <p className="text-lg leading-relaxed text-white/40">
                A Von Marins desenvolve a arquitetura necessária para que sua
                história não apenas sobreviva, mas prospere através das
                gerações.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "70%", label: "Perdem o legado até a 2ª geração" },
                { number: "R$ 1.5B", label: "Em patrimônio protegido" },
                { number: "30+", label: "Anos de expertise em sucessão" },
                { number: "0", label: "Conflitos familiares pós-implantação" },
              ].map((stat, i) => (
                <Reveal key={i} delay={0.1 * i}>
                  <div className="rounded-2xl border border-white/5 bg-[#0a0a0b] p-8 text-center transition-colors hover:border-[#c5a47e]/30">
                    <div className="font-bitter mb-2 text-3xl font-bold text-[#c5a47e]">
                      {stat.number}
                    </div>
                    <div className="text-[10px] font-bold tracking-wider text-white/30 uppercase">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: OS PILARES DA GOVERNANÇA SUCESSÓRIA */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <Reveal>
              <span className="mb-4 block text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                A Arquitetura
              </span>
              <h2 className="font-bitter text-4xl font-light lg:text-5xl">
                Quatro pilares para a{" "}
                <span className="text-[#c5a47e] italic">perenidade</span>
              </h2>
            </Reveal>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                icon: <Building2 size={32} />,
                title: "Holdings Patrimoniais",
                description:
                  "Estruturação de holdings familiares para gestão unificada do patrimônio, com proteção contra disputas e otimização tributária.",
              },
              {
                icon: <FileText size={32} />,
                title: "Protocolos de Família",
                description:
                  "Documentos que estabelecem regras claras de convivência, governança e sucessão, evitando conflitos e garantindo a harmonia.",
              },
              {
                icon: <Heart size={32} />,
                title: "Planejamento Sucessório Global",
                description:
                  "Estratégias internacionais para proteção de ativos no exterior, considerando múltiplas jurisdições e regimes de bens.",
              },
              {
                icon: <Users size={32} />,
                title: "Governança Familiar",
                description:
                  "Criação de conselhos de família, comitês de investimentos e estruturas de decisão que profissionalizam a gestão do legado.",
              },
            ].map((item, index) => (
              <Reveal key={index} delay={0.1 * index}>
                <div className="group rounded-3xl border border-white/5 bg-[#0d0d0e] p-10 transition-all hover:translate-y-[-4px] hover:border-[#c5a47e]/30">
                  <div className="mb-8 text-[#c5a47e] transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <h3 className="font-bitter mb-4 text-2xl font-bold">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/40">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: O DIFERENCIAL DA VON MARINS */}
      <section className="border-y border-white/5 bg-[#0d0d0e] py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="relative mx-auto h-[500px] w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#161617] shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-80" />
                <div className="flex h-full w-full items-center justify-center bg-[#1a1a1c] p-12 text-center">
                  <span className="font-bitter text-sm tracking-widest text-[#c5a47e]/40 uppercase italic">
                    Árvore Genealógica • 1994-2026
                  </span>
                </div>
                <div className="absolute bottom-10 left-10">
                  <div className="mb-4 flex items-center gap-2">
                    <TreePine size={14} className="text-[#c5a47e]" />
                    <span className="text-[10px] font-bold tracking-widest text-[#c5a47e] uppercase">
                      Tradição e Futuro
                    </span>
                  </div>
                  <h4 className="font-bitter text-2xl font-bold">
                    Mais de 3 décadas
                  </h4>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 -z-10 size-40 rounded-full border border-[#c5a47e]/20" />
            </div>

            <div className="order-1 lg:order-2">
              <Reveal>
                <span className="text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                  Por que a Von Marins
                </span>
                <h2 className="font-bitter mt-6 mb-8 text-4xl font-light lg:text-6xl">
                  Não vendemos <br />
                  <span className="italic">
                    documentos. Projetamos legados.
                  </span>
                </h2>
                <p className="mb-12 text-lg leading-relaxed font-light text-white/40">
                  Nossa abordagem em governança sucessória vai além do aspecto
                  jurídico. Trabalhamos com psicologia familiar, mediação de
                  conflitos e planejamento financeiro de longo prazo para criar
                  estruturas que realmente funcionam por gerações.
                </p>
                <ul className="space-y-6">
                  {[
                    "Análise de dinâmica familiar e potenciais conflitos",
                    "Estruturas internacionais para proteção patrimonial",
                    "Mediação profissional na criação de protocolos",
                    "Acompanhamento multigeracional",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase"
                    >
                      <div className="h-px w-6 bg-[#c5a47e]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: CASES DE SUCESSO (SIMULADOS) */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <Reveal>
              <span className="mb-4 block text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                Legados Preservados
              </span>
              <h2 className="font-bitter text-4xl font-light lg:text-5xl">
                Famílias que{" "}
                <span className="text-[#c5a47e] italic">confiam em nós</span>
              </h2>
            </Reveal>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                industry: "Agronegócio • 3 gerações",
                description:
                  "Estruturação de holding familiar para patrimônio de R$ 800M, com protocolo de governança e planejamento sucessório completo.",
                result: "Conflito zero na transição",
              },
              {
                industry: "Indústria • 2 gerações",
                description:
                  "Criação de conselho familiar e comitê de investimentos para grupo com operações no Brasil e Europa.",
                result: "Profissionalização da gestão",
              },
              {
                industry: "Family Office • 4 gerações",
                description:
                  "Reestruturação de governança para família com ativos em 12 países, incluindo holdings offshore.",
                result: "Proteção internacional",
              },
            ].map((case_, index) => (
              <Reveal key={index} delay={0.1 * index}>
                <div className="flex h-full flex-col rounded-2xl border border-white/5 bg-[#0d0d0e] p-8">
                  <Clock size={20} className="mb-6 text-[#c5a47e]" />
                  <div className="mb-3 text-[10px] font-bold tracking-wider text-[#c5a47e] uppercase">
                    {case_.industry}
                  </div>
                  <p className="mb-6 flex-grow text-sm leading-relaxed text-white/60">
                    {case_.description}
                  </p>
                  <div className="border-t border-white/5 pt-6">
                    <span className="text-xs font-bold tracking-widest text-white/30 uppercase">
                      {case_.result}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL: PROTEJA SEU LEGADO */}
      <section
        id="legado"
        className="bg-gradient-to-br from-[#c5a47e] to-[#a88963] py-32 text-[#0a0a0b]"
      >
        <div className="container mx-auto text-center">
          <Reveal>
            <h2 className="font-bitter text-4xl leading-tight font-light lg:text-7xl">
              Sua história não pode <br />
              <span className="font-black italic">ser interrompida.</span>
            </h2>
            <p className="mx-auto mt-10 max-w-2xl text-lg font-medium opacity-80">
              Inicie agora a estruturação do seu planejamento sucessório. Nossa
              equipe realizará uma análise completa do seu patrimônio e dinâmica
              familiar para desenvolver a arquitetura jurídica ideal para o seu
              legado.
            </p>
            <div className="mt-16 flex flex-col items-center justify-center gap-6">
              <Link
                href="/contato"
                className="group flex items-center gap-6 rounded-full bg-[#0a0a0b] px-16 py-7 text-xs font-bold tracking-[0.4em] text-white transition-all hover:scale-105 hover:bg-[#1a1a1c]"
              >
                PRESERVAR MEU LEGADO
                <ArrowRight size={18} />
              </Link>
              <p className="text-[10px] font-bold tracking-widest uppercase opacity-60">
                Consulta inicial confidencial e sem compromisso
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
              Legacy Planning
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
