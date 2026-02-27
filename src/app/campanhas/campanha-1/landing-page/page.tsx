import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
// import Image from 'next/image'; // Descomente se for usar uma imagem real
import {
  ArrowRight,
  Briefcase,
  ChevronDown,
  Cpu,
  Globe,
  Landmark,
  Lock,
  Scale,
  Users,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Landing Page Institucional 01",
  description:
    "Página de campanha institucional com foco em posicionamento de autoridade e consulta estratégica.",
  alternates: {
    canonical: "/landing-page-1",
  },
};

// Componente de animação simplificado para portabilidade
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

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#0a0a0b] font-sans text-white selection:bg-[#c5a47e] selection:text-[#0a0a0b]">
      {/* HEADER MINIMALISTA COM LOCALIZAÇÕES */}
      <nav className="absolute top-0 z-50 w-full py-6 lg:py-8">
        <div className="container mx-auto flex items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <span className="font-bitter text-xl font-bold tracking-tighter">
              VON <span className="text-[#c5a47e]">MARINS</span>
            </span>
            <div className="hidden items-center gap-4 text-[9px] font-medium tracking-wider text-white/40 uppercase lg:flex">
              <span>Av. Paulista, SP</span>
              <span className="h-1 w-1 rounded-full bg-white/20"></span>
              <span>Centro, RJ</span>
            </div>
          </div>
          <div className="mx-10 hidden h-px flex-1 bg-white/5 lg:block" />
          <Link
            href="/contato"
            className="text-[10px] font-bold tracking-[0.3em] text-[#c5a47e] uppercase transition-colors hover:text-white"
          >
            Acesso ao Protocolo
          </Link>
        </div>
      </nav>

      {/* HERO: A IDENTIDADE DE BOUTIQUE */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        {/* Glow de fundo estratégico */}
        <div className="absolute top-1/2 left-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5a47e]/5 blur-[160px]" />

        <div className="relative z-10 container mx-auto text-center">
          <Reveal>
            <span className="mb-8 inline-block text-[10px] font-bold tracking-[0.6em] text-[#c5a47e] uppercase">
              Since 1994 • Av. Paulista
            </span>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="font-bitter mx-auto max-w-5xl text-5xl leading-[1.1] font-light lg:text-8xl">
              Expertise que Define <br />
              <span className="text-[#c5a47e] italic">o Padrão.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mx-auto mt-12 max-w-2xl text-lg leading-relaxed font-light text-white/40 lg:text-xl">
              Arquitetura jurídica de alta complexidade para legados, grupos
              corporativos e operações globais. Rejeitamos a advocacia de massa
              em favor de soluções personalizadas e de alto padrão.
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mt-16 flex flex-col items-center justify-center gap-8">
              <Link
                href="#atuacao"
                className="group flex items-center gap-6 rounded-full border border-[#c5a47e]/30 bg-transparent px-12 py-6 text-[10px] font-bold tracking-[0.3em] uppercase transition-all hover:bg-[#c5a47e] hover:text-[#0a0a0b]"
              >
                Explorar Verticais Estratégicas
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-2"
                />
              </Link>
              <div className="flex animate-bounce flex-col items-center gap-2 opacity-20">
                <span className="text-[8px] font-bold tracking-widest uppercase">
                  Capital Intelectual
                </span>
                <ChevronDown size={14} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SEÇÃO: OS TRÊS PILARES DE ATUAÇÃO (ESTRATÉGICOS) */}
      <section
        id="atuacao"
        className="border-y border-white/5 bg-[#0d0d0e] py-32"
      >
        <div className="container mx-auto px-4">
          <Reveal>
            <span className="mb-4 block text-center text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
              Domínio Técnico
            </span>
            <h2 className="font-bitter mb-20 text-center text-4xl font-light lg:text-5xl">
              Três verticais para a{" "}
              <span className="text-[#c5a47e] italic">
                segurança institucional
              </span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            <div className="group">
              <Reveal delay={0.1}>
                <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-[#c5a47e]/10 text-[#c5a47e] transition-colors group-hover:bg-[#c5a47e] group-hover:text-[#0a0a0b]">
                  <Briefcase size={24} />
                </div>
                <h3 className="font-bitter mb-6 text-2xl font-bold">
                  Societário e M&A
                </h3>
                <p className="text-sm leading-relaxed text-white/40">
                  Gestão de estruturas de capital, fusões, aquisições e acordos
                  de sócios complexos. Due diligence e governança societária de
                  alto nível.
                </p>
              </Reveal>
            </div>

            <div className="group">
              <Reveal delay={0.2}>
                <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-[#c5a47e]/10 text-[#c5a47e] transition-colors group-hover:bg-[#c5a47e] group-hover:text-[#0a0a0b]">
                  <Landmark size={24} />
                </div>
                <h3 className="font-bitter mb-6 text-2xl font-bold">
                  Engenharia Fiscal
                </h3>
                <p className="text-sm leading-relaxed text-white/40">
                  Inteligência tributária avançada aplicada à proteção e
                  otimização de ativos para grupos corporativos e grandes
                  fortunas.
                </p>
              </Reveal>
            </div>

            <div className="group">
              <Reveal delay={0.3}>
                <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-[#c5a47e]/10 text-[#c5a47e] transition-colors group-hover:bg-[#c5a47e] group-hover:text-[#0a0a0b]">
                  <Scale size={24} />
                </div>
                <h3 className="font-bitter mb-6 text-2xl font-bold">
                  Governança Sucessória
                </h3>
                <p className="text-sm leading-relaxed text-white/40">
                  Arquitetura jurídica para a preservação de legados, incluindo
                  holdings patrimoniais, protocolos de família e planejamento
                  sucessório global.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: CAPITAL INTELECTUAL (FORMAÇÃO E RIGOR) */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-24 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <Reveal>
                <span className="text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                  O Diferencial
                </span>
                <h2 className="font-bitter mt-6 mb-8 text-4xl font-light lg:text-6xl">
                  Capital <br /> <span className="italic">Intelectual</span>
                </h2>
                <p className="mb-8 text-lg leading-relaxed font-light text-white/40">
                  Selecionamos nossos advogados por sua capacidade analítica e
                  compromisso ético, com investimento constante em educação
                  continuada nas principais capitais jurídicas do mundo.
                </p>
                <p className="text-lg leading-relaxed font-light text-white/40">
                  Cada caso é tratado com protocolos de dupla checagem em todas
                  as peças processuais, garantindo o rigor técnico que nossa
                  clientela exige.
                </p>
              </Reveal>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative mx-auto h-[500px] w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#161617] shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-80" />
                {/* Imagem Placeholder - Sugestão: Biblioteca ou sala de reunião high-end */}
                <div className="flex h-full w-full items-center justify-center bg-[#1a1a1c] p-12 text-center">
                  <span className="font-bitter text-sm tracking-widest text-[#c5a47e]/40 uppercase italic">
                    Formação Internacional
                  </span>
                </div>
                <div className="absolute bottom-10 left-10">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="size-2 animate-pulse rounded-full bg-[#c5a47e]" />
                    <span className="text-[10px] font-bold tracking-widest text-[#c5a47e] uppercase">
                      Educação Continuada
                    </span>
                  </div>
                  <h4 className="font-bitter text-2xl font-bold">
                    Harvard • LSE • FGV
                  </h4>
                </div>
              </div>
              {/* Moldura de Design */}
              <div className="absolute -right-6 -bottom-6 -z-10 size-40 rounded-full border border-[#c5a47e]/20" />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: INFRAESTRUTURA E VANGUARDA TECNOLÓGICA */}
      <section className="border-y border-white/5 bg-[#0d0d0e] py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-24 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="relative mx-auto h-[500px] w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#161617] shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-80" />
                {/* Imagem Placeholder - Sugestão: Interface de IA ou sala tecnológica */}
                <div className="flex h-full w-full items-center justify-center bg-[#1a1a1c] p-12 text-center">
                  <span className="font-bitter text-sm tracking-widest text-[#c5a47e]/40 uppercase italic">
                    Data-Driven Intelligence Layer
                  </span>
                </div>
                <div className="absolute bottom-10 left-10">
                  <div className="mb-4 flex items-center gap-2">
                    <Cpu size={14} className="text-[#c5a47e]" />
                    <span className="text-[10px] font-bold tracking-widest text-[#c5a47e] uppercase">
                      IA Jurídica Proprietária
                    </span>
                  </div>
                  <h4 className="font-bitter text-2xl font-bold">
                    Protocolo Von IA
                  </h4>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Reveal>
                <span className="text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                  Infraestrutura High-End
                </span>
                <h2 className="font-bitter mt-6 mb-8 text-4xl font-light lg:text-6xl">
                  Tecnologia e <br />{" "}
                  <span className="italic">Sigilo Absoluto</span>
                </h2>
                <p className="mb-12 text-lg leading-relaxed font-light text-white/40">
                  Ambiente equipado com tecnologia de ponta para conexões
                  globais e sigilo profissional absoluto. Pioneiros na
                  implementação de protocolos de IA jurídica para análise
                  preditiva de dados e governança.
                </p>
                <ul className="space-y-6">
                  {[
                    "Protocolos de dupla checagem em todas as peças",
                    "Análise preditiva de riscos com IA",
                    "Criptografia e governança de dados sensíveis",
                    "Conexão segura com escritórios correlatos globais",
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

      {/* SEÇÃO: PRESENÇA E DIFERENCIAIS INSTITUCIONAIS */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <Reveal>
            <span className="mb-4 block text-center text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
              Trajetória e Presença
            </span>
            <h2 className="font-bitter mb-20 text-center text-4xl font-light lg:text-5xl">
              Mais de três décadas <br />{" "}
              <span className="text-[#c5a47e] italic">
                de solidez institucional
              </span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Sede Matriz */}
            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-white/5 bg-[#0d0d0e] p-12">
                <Globe size={32} className="mb-8 text-[#c5a47e]" />
                <h3 className="font-bitter mb-4 text-3xl font-bold">
                  Sede Matriz
                </h3>
                <p className="mb-8 text-lg text-white/40">
                  Avenida Paulista, São Paulo
                </p>
                <p className="leading-relaxed text-white/60">
                  Hub corporativo e tecnológico da firma. Ambiente high-end onde
                  a estratégia encontra a perenidade, com estrutura para
                  conexões globais e total sigilo profissional.
                </p>
              </div>
            </Reveal>

            {/* Unidade Rio */}
            <Reveal delay={0.4}>
              <div className="rounded-3xl border border-white/5 bg-[#0d0d0e] p-12">
                <Landmark size={32} className="mb-8 text-[#c5a47e]" />
                <h3 className="font-bitter mb-4 text-3xl font-bold">
                  Unidade Estratégica
                </h3>
                <p className="mb-8 text-lg text-white/40">
                  Centro, Rio de Janeiro
                </p>
                <p className="leading-relaxed text-white/60">
                  Presença consolidada na capital fluminense para atender
                  operações locais e internacionais, com a mesma excelência e
                  padrão de qualidade da matriz paulista.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Diferenciais rápidos */}
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Reveal delay={0.1}>
              <div className="p-8 text-center">
                <Lock size={24} className="mx-auto mb-4 text-[#c5a47e]" />
                <h4 className="mb-2 text-sm font-bold tracking-widest uppercase">
                  Rigor Técnico
                </h4>
                <p className="text-xs text-white/40">
                  Protocolos de dupla checagem em todas as peças
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="border-x border-white/5 p-8 text-center">
                <Zap size={24} className="mx-auto mb-4 text-[#c5a47e]" />
                <h4 className="mb-2 text-sm font-bold tracking-widest uppercase">
                  Vanguarda
                </h4>
                <p className="text-xs text-white/40">
                  Pioneiros em IA jurídica para análise de dados
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="p-8 text-center">
                <Users size={24} className="mx-auto mb-4 text-[#c5a47e]" />
                <h4 className="mb-2 text-sm font-bold tracking-widest uppercase">
                  Visão Institucional
                </h4>
                <p className="text-xs text-white/40">
                  Arquitetura para que a estratégia encontre a perenidade
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA FINAL: CONSULTA ESTRATÉGICA */}
      <section id="protocolo" className="bg-[#c5a47e] py-32 text-[#0a0a0b]">
        <div className="container mx-auto text-center">
          <Reveal>
            <h2 className="font-bitter text-4xl leading-tight font-light lg:text-7xl">
              Arquitetura jurídica para <br />
              <span className="font-black italic">
                a perenidade do seu legado
              </span>
            </h2>
            <p className="mx-auto mt-10 max-w-2xl text-lg font-medium opacity-70">
              Inicie uma conversa estratégica com nossa banca. Análise
              preliminar de estruturas societárias, planejamento sucessório ou
              engenharia fiscal para grupos econômicos e family offices.
            </p>
            <div className="mt-16 flex flex-col items-center justify-center gap-6">
              <Link
                href="/contato"
                className="group flex items-center gap-6 rounded-full bg-[#0a0a0b] px-16 py-7 text-xs font-bold tracking-[0.4em] text-white transition-all hover:scale-105 hover:bg-[#1a1a1c]"
              >
                SOLICITAR CONSULTA ESTRATÉGICA
                <ArrowRight size={18} />
              </Link>
              <p className="text-[10px] font-bold tracking-widest uppercase opacity-40">
                Atendimento exclusivo e confidencial
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-20">
        <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-6 lg:flex-row">
          <span className="font-bitter text-xl font-bold tracking-tighter opacity-30">
            VON MARINS
          </span>
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
