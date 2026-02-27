"use client";

import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Instagram,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  CaptionModal,
  Post1,
  Post2,
  Post3,
  Post4,
  Post5,
  Post6,
  Post7,
  Post8,
  Post9,
} from "./posts";
import { StoriesSection } from "./stories";

export default function InstagramCampaign1() {
  const [selectedPost, setSelectedPost] = useState<{
    title: string;
    caption: string[];
    hashtags: string[];
    imagePrompt: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0b] font-sans text-white">
      {/* Modal */}
      {selectedPost && (
        <CaptionModal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          caption={selectedPost.caption}
          hashtags={selectedPost.hashtags}
          postTitle={selectedPost.title}
          imagePrompt={selectedPost.imagePrompt}
        />
      )}

      {/* HEADER */}
      <nav className="border-b border-white/5 py-6">
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link
            href="/campanha-1/estrategia"
            className="flex items-center gap-3 text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            <span className="text-xs font-bold tracking-wider uppercase">
              Voltar para Estratégia
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

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5 py-20">
        <div className="absolute top-1/3 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5a47e]/5 blur-[120px]" />

        <div className="relative container mx-auto max-w-4xl px-6 text-center">
          <span className="mb-4 inline-block text-[10px] font-bold tracking-[0.6em] text-[#c5a47e] uppercase">
            Instagram Strategy
          </span>

          <h1 className="font-bitter mb-6 text-5xl leading-tight font-light lg:text-6xl">
            Autoridade e Excelência <br />
            <span className="text-[#c5a47e] italic">no feed do Instagram</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/40">
            Estratégia de conteúdo para posicionar a Von Marins como referência
            em advocacia de alto padrão, combinando storytelling institucional,
            educação jurídica e cases de sucesso em um grid visualmente
            impactante.
          </p>
        </div>
      </section>

      {/* OBJETIVOS ESPECÍFICOS INSTAGRAM */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-bitter text-3xl font-light lg:text-4xl">
              Objetivos para{" "}
              <span className="text-[#c5a47e] italic">o Instagram</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: <Target size={24} />,
                title: "Posicionamento de Autoridade",
                desc: "Estabelecer a Von Marins como referência em direito societário, sucessório e tributário.",
              },
              {
                icon: <Users size={24} />,
                title: "Engajamento Qualificado",
                desc: "Atrair e engajar empresários, investidores e family offices com conteúdo relevante.",
              },
              {
                icon: <Zap size={24} />,
                title: "Tráfego para o Site",
                desc: "Direcionar seguidores para a landing page e artigos do blog através do link da bio.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/5 bg-[#0d0d0e] p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#c5a47e]/10 text-[#c5a47e]">
                  {item.icon}
                </div>
                <h3 className="font-bitter mb-2 text-lg font-bold">
                  {item.title}
                </h3>
                <p className="text-sm text-white/40">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOM DE VOZ */}
      <section className="border-y border-white/5 bg-[#0d0d0e] py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <span className="mb-2 block text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
              Personalidade da Marca
            </span>
            <h2 className="font-bitter text-3xl font-light lg:text-4xl">
              Tom de <span className="text-[#c5a47e] italic">Voz</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c5a47e]/10 text-xs font-bold text-[#c5a47e]">
                  1
                </div>
                <div>
                  <h4 className="font-bitter mb-1 font-bold">
                    Autoridade sem arrogância
                  </h4>
                  <p className="text-sm text-white/40">
                    Conteúdo técnico e profundo, mas acessível. Demonstrar
                    expertise sem jargões desnecessários.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c5a47e]/10 text-xs font-bold text-[#c5a47e]">
                  2
                </div>
                <div>
                  <h4 className="font-bitter mb-1 font-bold">
                    Elegância e sofisticação
                  </h4>
                  <p className="text-sm text-white/40">
                    Linguagem refinada, alinhada ao público de alta renda.
                    Evitar termos populares ou informais.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c5a47e]/10 text-xs font-bold text-[#c5a47e]">
                  3
                </div>
                <div>
                  <h4 className="font-bitter mb-1 font-bold">
                    Humanizada e acolhedora
                  </h4>
                  <p className="text-sm text-white/40">
                    Mostrar o time, os bastidores e a cultura da banca.
                    Conectar-se emocionalmente com o público.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c5a47e]/10 text-xs font-bold text-[#c5a47e]">
                  4
                </div>
                <div>
                  <h4 className="font-bitter mb-1 font-bold">
                    Educativa e esclarecedora
                  </h4>
                  <p className="text-sm text-white/40">
                    Explicar conceitos jurídicos complexos de forma clara,
                    mostrando a importância do planejamento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALENDÁRIO EDITORIAL DETALHADO - 3 SEMANAS */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                Planejamento
              </span>
              <h2 className="font-bitter text-3xl font-light lg:text-4xl">
                Calendário{" "}
                <span className="text-[#c5a47e] italic">
                  Editorial • 3 Semanas
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#c5a47e]/30 px-4 py-2">
              <Calendar size={14} className="text-[#c5a47e]" />
              <span className="text-xs font-bold tracking-wider text-[#c5a47e] uppercase">
                3 Semanas • 9 Posts
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                week: "Semana 1",
                theme: "Apresentação da Banca",
                color: "border-l-[#c5a47e]",
                posts: [
                  { day: "Terça", title: "História e fundação (1994)" },
                  {
                    day: "Quinta",
                    title: "Sede Av. Paulista - Infraestrutura",
                  },
                  { day: "Sábado", title: "Os sócios e o time" },
                ],
              },
              {
                week: "Semana 2",
                theme: "Pilares de Atuação",
                color: "border-l-[#c5a47e]/80",
                posts: [
                  { day: "Terça", title: "Societário e M&A" },
                  { day: "Quinta", title: "Engenharia Fiscal" },
                  { day: "Sábado", title: "Governança Sucessória" },
                ],
              },
              {
                week: "Semana 3",
                theme: "Diferenciais e Cases",
                color: "border-l-[#c5a47e]/60",
                posts: [
                  { day: "Terça", title: "IA Jurídica e Inovação" },
                  { day: "Quinta", title: "Presença Global" },
                  { day: "Sábado", title: "Legado e Call to Action" },
                ],
              },
            ].map((week, index) => (
              <div
                key={index}
                className={`rounded-2xl border border-l-4 border-white/5 bg-[#0d0d0e] p-6 ${week.color}`}
              >
                <div className="mb-4">
                  <span className="text-xs font-bold text-[#c5a47e]">
                    {week.week}
                  </span>
                  <h3 className="font-bitter text-lg font-bold">
                    {week.theme}
                  </h3>
                </div>
                <div className="space-y-4">
                  {week.posts.map((post, i) => (
                    <div
                      key={i}
                      className="border-b border-white/5 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="text-[10px] font-bold tracking-wider text-white/30 uppercase">
                        {post.day}
                      </div>
                      <div className="mt-1 text-sm text-white/80">
                        {post.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES SECTION - Importada do stories.tsx */}
      <StoriesSection />

      {/* GRID DE POSTS 3x3 */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                Visual do Feed
              </span>
              <h2 className="font-bitter text-3xl font-light lg:text-4xl">
                Grid 3x3{" "}
                <span className="text-[#c5a47e] italic">@vonmarins</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span className="flex items-center justify-center gap-3">
                Clique no ícone{" "}
                <div className="flex items-center justify-center rounded-full bg-white/5 p-2 text-[#c5a47e]">
                  <BookOpen size={14} className="text-[#c5a47e]" />{" "}
                </div>
                para ver a sugestão de legenda
              </span>
            </div>
          </div>

          {/* GRID 3x3 com posts importados individualmente */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Post1 onOpenCaption={setSelectedPost} />
            <Post2 onOpenCaption={setSelectedPost} />
            <Post3 onOpenCaption={setSelectedPost} />
            <Post4 onOpenCaption={setSelectedPost} />
            <Post5 onOpenCaption={setSelectedPost} />
            <Post6 onOpenCaption={setSelectedPost} />
            <Post7 onOpenCaption={setSelectedPost} />
            <Post8 onOpenCaption={setSelectedPost} />
            <Post9 onOpenCaption={setSelectedPost} />
          </div>
        </div>
      </section>

      {/* MÉTRICAS E ACOMPANHAMENTO */}
      <section className="border-y border-white/5 bg-[#0d0d0e] py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
                Acompanhamento
              </span>
              <h2 className="font-bitter mt-4 text-3xl font-light lg:text-4xl">
                Métricas de{" "}
                <span className="text-[#c5a47e] italic">desempenho</span>
              </h2>

              <div className="mt-8 space-y-6">
                {[
                  {
                    metric: "Taxa de engajamento",
                    target: "> 5%",
                    desc: "Curtidas, comentários e compartilhamentos por post",
                  },
                  {
                    metric: "Alcance",
                    target: "10K+",
                    desc: "Contas alcançadas por semana",
                  },
                  {
                    metric: "Cliques no link da bio",
                    target: "+30%",
                    desc: "Comparado ao período anterior",
                  },
                  {
                    metric: "Novos seguidores",
                    target: "+1.000",
                    desc: "Ao final das 3 semanas",
                  },
                  {
                    metric: "Mensagens diretas",
                    target: "15+",
                    desc: "Contatos qualificados via DM",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-white/5 pb-4"
                  >
                    <div>
                      <div className="font-bold text-white/80">
                        {item.metric}
                      </div>
                      <div className="text-xs text-white/40">{item.desc}</div>
                    </div>
                    <div className="rounded-full bg-[#c5a47e]/10 px-4 py-2 text-sm font-bold text-[#c5a47e]">
                      {item.target}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/5 bg-[#0a0a0b] p-8">
              <div className="mb-6 flex items-center gap-3">
                <Clock size={20} className="text-[#c5a47e]" />
                <h3 className="font-bitter text-xl font-bold">
                  Frequência de Posts
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Feed (posts no grid)</span>
                    <span className="text-[#c5a47e]">3x por semana</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5">
                    <div className="h-2 w-3/4 rounded-full bg-[#c5a47e]" />
                  </div>
                  <p className="mt-2 text-xs text-white/40">
                    Terças, quintas e sábados • 9h
                  </p>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Stories</span>
                    <span className="text-[#c5a47e]">4-6x por semana</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5">
                    <div className="h-2 w-5/6 rounded-full bg-[#c5a47e]" />
                  </div>
                  <p className="mt-2 text-xs text-white/40">
                    Bastidores, cases e interação diária
                  </p>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Reels</span>
                    <span className="text-[#c5a47e]">1x por semana</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5">
                    <div className="h-2 w-1/4 rounded-full bg-[#c5a47e]" />
                  </div>
                  <p className="mt-2 text-xs text-white/40">
                    Conteúdo educativo e institucional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HASHTAGS ESTRATÉGICAS */}
      <section className="border-t border-white/5 bg-[#0d0d0e] py-12">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-6 text-center">
            <h3 className="font-bitter text-2xl font-light">
              Hashtags{" "}
              <span className="text-[#c5a47e] italic">estratégicas</span>
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-xs text-white/30">
            {[
              "#VonMarins",
              "#AdvocaciaBoutique",
              "#DireitoSocietário",
              "#PlanejamentoSucessório",
              "#EngenhariaFiscal",
              "#M&A",
              "#HoldingsFamiliares",
              "#AvPaulista",
              "#DireitoTributário",
              "#FamilyOffice",
              "#LegacyPlanning",
              "#CorporateLaw",
              "#PrivateEquity",
              "#GovernançaCorporativa",
              "#AltoPadrão",
            ].map((tag, index) => (
              <span
                key={index}
                className="rounded-full border border-white/5 px-4 py-2 transition-colors hover:border-[#c5a47e]/30 hover:text-[#c5a47e]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-bitter mb-6 text-3xl font-light lg:text-4xl">
            Pronto para <span className="text-[#c5a47e] italic">começar</span>?
          </h2>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              href="/campanha-1/landing-page"
              className="group flex items-center gap-4 rounded-full border border-[#c5a47e]/30 bg-transparent px-10 py-5 text-xs font-bold tracking-[0.3em] uppercase transition-all hover:bg-[#c5a47e] hover:text-[#0a0a0b]"
            >
              Ver Landing Page
            </Link>

            <Link
              href="/campanha-1/estrategia"
              className="group flex items-center gap-4 rounded-full bg-[#c5a47e] px-10 py-5 text-xs font-bold tracking-[0.3em] text-[#0a0a0b] uppercase transition-all hover:bg-[#d4b594]"
            >
              Voltar à Estratégia
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
