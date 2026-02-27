import {
  ArrowLeft,
  BarChart3,
  Briefcase,
  ChevronRight,
  Eye,
  Globe,
  Heart,
  Instagram,
  MessageCircle,
  Scale,
  Share2,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campanha Instagram",
  description:
    "Estratégia de conteúdo para posicionamento institucional da marca no Instagram com foco em autoridade jurídica.",
  alternates: {
    canonical: "/instagram-1",
  },
  robots: {
    index: false,
    follow: false,
  },
};

// Componente de card de post do Instagram
const InstagramPost = ({
  children,
  variant = "dark",
}: {
  children: React.ReactNode;
  variant?: "dark" | "light" | "gold";
}) => {
  const getBgColor = () => {
    switch (variant) {
      case "light":
        return "bg-[#f5f5f5] text-[#0a0a0b]";
      case "gold":
        return "bg-[#c5a47e] text-[#0a0a0b]";
      default:
        return "bg-[#0a0a0b] text-white border border-white/10";
    }
  };

  return (
    <div
      className={`aspect-square rounded-3xl ${getBgColor()} group relative flex flex-col overflow-hidden p-6 transition-all duration-300 hover:scale-[1.02]`}
    >
      {/* Elemento decorativo de gradiente */}
      <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-[#c5a47e]/20 to-transparent" />

      {/* Conteúdo children */}
      {children}
    </div>
  );
};

function getLike(seed: number) {
  return `${10 + ((seed * 7) % 40)}K`;
}

export default function InstagramCampaign1() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] font-sans text-white">
      {/* HEADER */}
      <nav className="border-b border-white/5 py-6">
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-3 text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            <span className="text-xs font-bold tracking-wider uppercase">
              Voltar para Landing Page
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#c5a47e] uppercase">
              Estratégia Instagram
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c5a47e]/10">
              <Instagram size={16} className="text-[#c5a47e]" />
            </div>
          </div>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="container mx-auto max-w-7xl px-6 py-16">
        {/* TÍTULO E DESCRIÇÃO DA CAMPANHA */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 block text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
            Campanha 01 • Institucional
          </span>
          <h1 className="font-bitter mb-6 text-4xl font-light lg:text-5xl">
            Von Marins no Instagram: <br />
            <span className="text-[#c5a47e] italic">
              Autoridade, Legado e Excelência
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-white/40">
            Estratégia de conteúdo para posicionar a banca como referência em
            advocacia de alto padrão, combinando storytelling institucional,
            educação jurídica e cases de sucesso.
          </p>
        </div>

        {/* ESTRATÉGIA DA CAMPANHA - CARDS */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Card 1 - Objetivos */}
          <div className="rounded-2xl border border-white/5 bg-[#0d0d0e] p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#c5a47e]/10">
              <Target size={24} className="text-[#c5a47e]" />
            </div>
            <h3 className="font-bitter mb-4 text-xl font-bold">Objetivos</h3>
            <ul className="space-y-3 text-sm text-white/40">
              <li className="flex items-start gap-3">
                <div className="mt-2 h-1 w-1 rounded-full bg-[#c5a47e]" />
                <span>Posicionar Von Marins como banca de elite</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-2 h-1 w-1 rounded-full bg-[#c5a47e]" />
                <span>
                  Demonstrar expertise em direito societário e sucessório
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-2 h-1 w-1 rounded-full bg-[#c5a47e]" />
                <span>Humanizar a marca mostrando o time e a cultura</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-2 h-1 w-1 rounded-full bg-[#c5a47e]" />
                <span>
                  Gerar leads qualificados para consultas estratégicas
                </span>
              </li>
            </ul>
          </div>

          {/* Card 2 - Público */}
          <div className="rounded-2xl border border-white/5 bg-[#0d0d0e] p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#c5a47e]/10">
              <Users size={24} className="text-[#c5a47e]" />
            </div>
            <h3 className="font-bitter mb-4 text-xl font-bold">Público-Alvo</h3>
            <ul className="space-y-3 text-sm text-white/40">
              <li className="flex items-start gap-3">
                <div className="mt-2 h-1 w-1 rounded-full bg-[#c5a47e]" />
                <span>Empresários e CEOs de médio/grande porte</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-2 h-1 w-1 rounded-full bg-[#c5a47e]" />
                <span>Family offices e herdeiros de grandes fortunas</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-2 h-1 w-1 rounded-full bg-[#c5a47e]" />
                <span>Investidores e private equity</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-2 h-1 w-1 rounded-full bg-[#c5a47e]" />
                <span>Advogados e outros profissionais do direito</span>
              </li>
            </ul>
          </div>

          {/* Card 3 - Métricas */}
          <div className="rounded-2xl border border-white/5 bg-[#0d0d0e] p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#c5a47e]/10">
              <BarChart3 size={24} className="text-[#c5a47e]" />
            </div>
            <h3 className="font-bitter mb-4 text-xl font-bold">
              Métricas de Sucesso
            </h3>
            <ul className="space-y-3 text-sm text-white/40">
              <li className="flex items-start gap-3">
                <div className="mt-2 h-1 w-1 rounded-full bg-[#c5a47e]" />
                <span>Engajamento (curtidas, comentários, shares)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-2 h-1 w-1 rounded-full bg-[#c5a47e]" />
                <span>Cliques no link da bio</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-2 h-1 w-1 rounded-full bg-[#c5a47e]" />
                <span>Novos seguidores qualificados</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-2 h-1 w-1 rounded-full bg-[#c5a47e]" />
                <span>Mensagens diretas solicitando contato</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CALENDÁRIO EDITORIAL */}
        <div className="mb-20 rounded-2xl border border-white/5 bg-[#0d0d0e] p-8">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-bitter text-2xl font-bold">
              Calendário Editorial • 4 Semanas
            </h3>
            <span className="rounded-full border border-[#c5a47e]/30 px-4 py-2 text-[10px] font-bold tracking-wider text-[#c5a47e] uppercase">
              9 Posts • 3 por semana
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              {
                week: "Semana 1",
                theme: "Apresentação da Banca",
                posts: [
                  "História e fundação",
                  "Sede Av. Paulista",
                  "Os sócios",
                ],
              },
              {
                week: "Semana 2",
                theme: "Pilares de Atuação",
                posts: [
                  "Societário e M&A",
                  "Engenharia Fiscal",
                  "Governança Sucessória",
                ],
              },
              {
                week: "Semana 3",
                theme: "Diferenciais",
                posts: [
                  "Capital intelectual",
                  "Tecnologia e IA",
                  "Rigor técnico",
                ],
              },
              {
                week: "Semana 4",
                theme: "Cases e Resultados",
                posts: [
                  "Case holding familiar",
                  "Operação cross-border",
                  "Convite para consulta",
                ],
              },
            ].map((week, index) => (
              <div key={index} className="rounded-xl border border-white/5 p-5">
                <div className="mb-2 text-xs font-bold text-[#c5a47e]">
                  {week.week}
                </div>
                <div className="mb-4 text-sm font-bold">{week.theme}</div>
                <ul className="space-y-2">
                  {week.posts.map((post, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-xs text-white/40"
                    >
                      <div className="h-1 w-1 rounded-full bg-[#c5a47e]" />
                      {post}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* GRID DE POSTS 3x3 */}
        <div>
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-bitter text-3xl font-light">
              Grid de Conteúdo{" "}
              <span className="text-[#c5a47e] italic">@vonmarins</span>
            </h2>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Eye size={16} />
              <span>Visualização dos posts em 1:1</span>
            </div>
          </div>

          {/* GRID 3x3 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Linha 1 */}
            <InstagramPost variant="dark">
              {/* Número de like simulado */}
              <div className="absolute top-4 right-4 flex items-center gap-1 text-xs opacity-50">
                <Heart size={12} />
                <span>{getLike(1)}</span>
              </div>

              <div className="flex flex-1 flex-col">
                <div className="mb-4">
                  <Target size={32} className="text-[#c5a47e]" />
                </div>

                <h3 className="font-bitter mb-2 text-lg font-bold">
                  Von Marins desde 1994
                </h3>
                <p className="flex-1 text-xs leading-relaxed opacity-70">
                  Três décadas de excelência jurídica na Avenida Paulista.
                  Conheça nossa história de solidez e compromisso com o alto
                  padrão.
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase">
                  <span className="text-[#c5a47e]">Nossa história</span>
                  <ChevronRight size={12} className="text-[#c5a47e]" />
                </div>
              </div>

              {/* Simulador de ações do Instagram */}
              <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4 text-white/30">
                <Heart size={14} />
                <MessageCircle size={14} />
                <Share2 size={14} />
              </div>
            </InstagramPost>

            <InstagramPost variant="gold">
              <div className="absolute top-4 right-4 flex items-center gap-1 text-xs opacity-50">
                <Heart size={12} />
                <span>{getLike(1)}</span>
              </div>

              <div className="flex flex-1 flex-col">
                <div className="mb-4">
                  <Users size={32} className="text-[#0a0a0b]" />
                </div>

                <h3 className="font-bitter mb-2 text-lg font-bold">
                  Capital Intelectual
                </h3>
                <p className="flex-1 text-xs leading-relaxed opacity-70">
                  Nossos advogados são selecionados pela capacidade analítica e
                  formação internacional. Educação continuada nas melhores
                  universidades do mundo.
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase">
                  <span className="text-[#0a0a0b]">Conheça o time</span>
                  <ChevronRight size={12} className="text-[#0a0a0b]" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4 text-[#0a0a0b]/30">
                <Heart size={14} />
                <MessageCircle size={14} />
                <Share2 size={14} />
              </div>
            </InstagramPost>

            <InstagramPost variant="light">
              <div className="absolute top-4 right-4 flex items-center gap-1 text-xs opacity-50">
                <Heart size={12} />
                <span>{getLike(1)}</span>
              </div>

              <div className="flex flex-1 flex-col">
                <div className="mb-4">
                  <Building2 size={32} className="text-[#c5a47e]" />
                </div>

                <h3 className="font-bitter mb-2 text-lg font-bold">
                  Sede Av. Paulista
                </h3>
                <p className="flex-1 text-xs leading-relaxed opacity-70">
                  Ambiente high-end equipado com tecnologia de ponta para
                  conexões globais e sigilo profissional absoluto.
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase">
                  <span className="text-[#c5a47e]">Tour virtual</span>
                  <ChevronRight size={12} className="text-[#c5a47e]" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-black/10 pt-4 text-black/30">
                <Heart size={14} />
                <MessageCircle size={14} />
                <Share2 size={14} />
              </div>
            </InstagramPost>

            {/* Linha 2 */}
            <InstagramPost variant="light">
              <div className="absolute top-4 right-4 flex items-center gap-1 text-xs opacity-50">
                <Heart size={12} />
                <span>{getLike(1)}</span>
              </div>

              <div className="flex flex-1 flex-col">
                <div className="mb-4">
                  <Briefcase size={32} className="text-[#c5a47e]" />
                </div>

                <h3 className="font-bitter mb-2 text-lg font-bold">
                  Societário e M&A
                </h3>
                <p className="flex-1 text-xs leading-relaxed opacity-70">
                  Gestão de estruturas de capital, fusões, aquisições e acordos
                  de sócios complexos com excelência técnica.
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase">
                  <span className="text-[#c5a47e]">Saiba mais</span>
                  <ChevronRight size={12} className="text-[#c5a47e]" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-black/10 pt-4 text-black/30">
                <Heart size={14} />
                <MessageCircle size={14} />
                <Share2 size={14} />
              </div>
            </InstagramPost>

            <InstagramPost variant="dark">
              <div className="absolute top-4 right-4 flex items-center gap-1 text-xs opacity-50">
                <Heart size={12} />
                <span>{getLike(1)}</span>
              </div>

              <div className="flex flex-1 flex-col">
                <div className="mb-4">
                  <Landmark size={32} className="text-[#c5a47e]" />
                </div>

                <h3 className="font-bitter mb-2 text-lg font-bold">
                  Engenharia Fiscal
                </h3>
                <p className="flex-1 text-xs leading-relaxed opacity-70">
                  Inteligência tributária avançada para proteção e otimização de
                  ativos de grupos corporativos e grandes fortunas.
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase">
                  <span className="text-[#c5a47e]">Estratégias fiscais</span>
                  <ChevronRight size={12} className="text-[#c5a47e]" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4 text-white/30">
                <Heart size={14} />
                <MessageCircle size={14} />
                <Share2 size={14} />
              </div>
            </InstagramPost>

            <InstagramPost variant="gold">
              <div className="absolute top-4 right-4 flex items-center gap-1 text-xs opacity-50">
                <Heart size={12} />
                <span>{getLike(1)}</span>
              </div>

              <div className="flex flex-1 flex-col">
                <div className="mb-4">
                  <Scale size={32} className="text-[#0a0a0b]" />
                </div>

                <h3 className="font-bitter mb-2 text-lg font-bold">
                  Governança Sucessória
                </h3>
                <p className="flex-1 text-xs leading-relaxed opacity-70">
                  Arquitetura jurídica para preservação de legados, holdings
                  patrimoniais e protocolos de família.
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase">
                  <span className="text-[#0a0a0b]">Proteja seu legado</span>
                  <ChevronRight size={12} className="text-[#0a0a0b]" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4 text-[#0a0a0b]/30">
                <Heart size={14} />
                <MessageCircle size={14} />
                <Share2 size={14} />
              </div>
            </InstagramPost>

            {/* Linha 3 */}
            <InstagramPost variant="gold">
              <div className="absolute top-4 right-4 flex items-center gap-1 text-xs opacity-50">
                <Heart size={12} />
                <span>{getLike(1)}</span>
              </div>

              <div className="flex flex-1 flex-col">
                <div className="mb-4">
                  <Cpu size={32} className="text-[#0a0a0b]" />
                </div>

                <h3 className="font-bitter mb-2 text-lg font-bold">
                  IA Jurídica
                </h3>
                <p className="flex-1 text-xs leading-relaxed opacity-70">
                  Pioneiros na implementação de protocolos de inteligência
                  artificial para análise preditiva de dados e governança.
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase">
                  <span className="text-[#0a0a0b]">Inovação</span>
                  <ChevronRight size={12} className="text-[#0a0a0b]" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4 text-[#0a0a0b]/30">
                <Heart size={14} />
                <MessageCircle size={14} />
                <Share2 size={14} />
              </div>
            </InstagramPost>

            <InstagramPost variant="light">
              <div className="absolute top-4 right-4 flex items-center gap-1 text-xs opacity-50">
                <Heart size={12} />
                <span>{getLike(1)}</span>
              </div>

              <div className="flex flex-1 flex-col">
                <div className="mb-4">
                  <Globe size={32} className="text-[#c5a47e]" />
                </div>

                <h3 className="font-bitter mb-2 text-lg font-bold">
                  Presença Global
                </h3>
                <p className="flex-1 text-xs leading-relaxed opacity-70">
                  Conexão com escritórios correlatos nas principais capitais
                  jurídicas do mundo para operações cross-border.
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase">
                  <span className="text-[#c5a47e]">Alcance internacional</span>
                  <ChevronRight size={12} className="text-[#c5a47e]" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-black/10 pt-4 text-black/30">
                <Heart size={14} />
                <MessageCircle size={14} />
                <Share2 size={14} />
              </div>
            </InstagramPost>

            <InstagramPost variant="dark">
              <div className="absolute top-4 right-4 flex items-center gap-1 text-xs opacity-50">
                <Heart size={12} />
                <span>{getLike(1)}</span>
              </div>

              <div className="flex flex-1 flex-col">
                <div className="mb-4">
                  <Heart size={32} className="text-[#c5a47e]" />
                </div>

                <h3 className="font-bitter mb-2 text-lg font-bold">
                  Legados que perduram
                </h3>
                <p className="flex-1 text-xs leading-relaxed opacity-70">
                  Mais do que resolver litígios, provemos a arquitetura jurídica
                  para que a estratégia encontre a perenidade.
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase">
                  <span className="text-[#c5a47e]">Fale conosco</span>
                  <ChevronRight size={12} className="text-[#c5a47e]" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4 text-white/30">
                <Heart size={14} />
                <MessageCircle size={14} />
                <Share2 size={14} />
              </div>
            </InstagramPost>
          </div>
        </div>

        {/* LEGENDA DAS IMAGENS */}
        <div className="mt-16 rounded-2xl border border-white/5 bg-[#0d0d0e] p-8">
          <h3 className="font-bitter mb-6 text-xl font-bold">
            Descrição dos Posts
          </h3>
          <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-3">
            <div className="space-y-4">
              <div>
                <span className="font-bold text-[#c5a47e]">01.</span>{" "}
                <span className="text-white/60">
                  Apresentação institucional com fundação em 1994
                </span>
              </div>
              <div>
                <span className="font-bold text-[#c5a47e]">02.</span>{" "}
                <span className="text-white/60">
                  Destaque para o capital intelectual e formação internacional
                </span>
              </div>
              <div>
                <span className="font-bold text-[#c5a47e]">03.</span>{" "}
                <span className="text-white/60">
                  Infraestrutura da sede na Avenida Paulista
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="font-bold text-[#c5a47e]">04.</span>{" "}
                <span className="text-white/60">
                  Pilar Societário e M&A com exemplos de atuação
                </span>
              </div>
              <div>
                <span className="font-bold text-[#c5a47e]">05.</span>{" "}
                <span className="text-white/60">
                  Engenharia Fiscal para grandes fortunas
                </span>
              </div>
              <div>
                <span className="font-bold text-[#c5a47e]">06.</span>{" "}
                <span className="text-white/60">
                  Governança Sucessória e holdings familiares
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="font-bold text-[#c5a47e]">07.</span>{" "}
                <span className="text-white/60">
                  Inovação com protocolos de IA jurídica
                </span>
              </div>
              <div>
                <span className="font-bold text-[#c5a47e]">08.</span>{" "}
                <span className="text-white/60">
                  Presença global e operações cross-border
                </span>
              </div>
              <div>
                <span className="font-bold text-[#c5a47e]">09.</span>{" "}
                <span className="text-white/60">
                  Call to action final para consulta estratégica
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* HASHTAGS */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-3 text-xs text-white/30">
            <span className="rounded-full border border-white/5 px-4 py-2">
              #VonMarins
            </span>
            <span className="rounded-full border border-white/5 px-4 py-2">
              #AdvocaciaBoutique
            </span>
            <span className="rounded-full border border-white/5 px-4 py-2">
              #DireitoSocietário
            </span>
            <span className="rounded-full border border-white/5 px-4 py-2">
              #PlanejamentoSucessório
            </span>
            <span className="rounded-full border border-white/5 px-4 py-2">
              #EngenhariaFiscal
            </span>
            <span className="rounded-full border border-white/5 px-4 py-2">
              #M&A
            </span>
            <span className="rounded-full border border-white/5 px-4 py-2">
              #HoldingsFamiliares
            </span>
            <span className="rounded-full border border-white/5 px-4 py-2">
              #AvPaulista
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Ícones adicionais necessários
type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

function Cpu({ size, ...props }: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? 24}
      height={size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
      <rect x="9" y="9" width="6" height="6"></rect>
      <line x1="9" y1="1" x2="9" y2="4"></line>
      <line x1="15" y1="1" x2="15" y2="4"></line>
      <line x1="9" y1="20" x2="9" y2="23"></line>
      <line x1="15" y1="20" x2="15" y2="23"></line>
      <line x1="20" y1="9" x2="23" y2="9"></line>
      <line x1="20" y1="14" x2="23" y2="14"></line>
      <line x1="1" y1="9" x2="4" y2="9"></line>
      <line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
  );
}

function Landmark({ size, ...props }: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? 24}
      height={size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="22" x2="21" y2="22"></line>
      <line x1="6" y1="18" x2="6" y2="11"></line>
      <line x1="10" y1="18" x2="10" y2="11"></line>
      <line x1="14" y1="18" x2="14" y2="11"></line>
      <line x1="18" y1="18" x2="18" y2="11"></line>
      <polygon points="12 2 20 7 4 7 12 2"></polygon>
    </svg>
  );
}

function Building2({ size, ...props }: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? 24}
      height={size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
      <path d="M10 6h4"></path>
      <path d="M10 10h4"></path>
      <path d="M10 14h4"></path>
      <path d="M10 18h4"></path>
    </svg>
  );
}

