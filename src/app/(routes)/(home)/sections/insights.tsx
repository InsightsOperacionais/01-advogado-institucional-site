import { ElementReveal } from "@/components/layout/element-reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { insightArticles } from "../../insights/articles";

export function InsightsSection() {
  // Exibimos apenas os 2 artigos mais recentes para o destaque da Home
  const featuredPosts = insightArticles.slice(0, 2);

  return (
    <section className="text-[#0a0a0b]">
      <div className="container mx-auto px-4">
        {/* HEADER DA SEÇÃO EDITORAL */}
        <div className="mb-20 flex flex-col items-start justify-between gap-8 border-b border-black/5 lg:flex-row lg:items-end lg:gap-16">
          <div className="flex flex-col gap-3">
            <ElementReveal delay={0.3}>
              <span className="mb-4 block text-[10px] font-bold tracking-[0.5em] text-[#c5a47e] uppercase">
                Pensamento Jurídico
              </span>
            </ElementReveal>

            <ElementReveal delay={0.4}>
              <h2 className="font-bitter text-5xl font-light lg:text-7xl">
                Insights <br />
                <span className="text-[#c5a47e] italic">Jurídicos.</span>
              </h2>
            </ElementReveal>
          </div>

          <ElementReveal variant="button" distance="14px">
            <Link
              href="/insights"
              className="group flex items-center gap-4 border-b border-[#0a0a0b]/10 pb-2 transition-colors hover:border-[#c5a47e]"
            >
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#0a0a0b] uppercase transition-colors group-hover:text-[#c5a47e]">
                Acessar Biblioteca de Teses
              </span>
              <ArrowRight
                size={14}
                className="text-[#c5a47e] transition-transform group-hover:translate-x-2"
              />
            </Link>
          </ElementReveal>
        </div>

        {/* GRID DE CARDS REFINADOS */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {featuredPosts.map((post, i) => (
            <ElementReveal
              key={post.slug}
              width="full"
              delay={i * 0.08}
              distance="26px"
              variant="card"
              className="h-full"
            >
              <Link
                href={`/insights/${post.slug}`}
                className="group interactive-card relative flex h-full flex-col justify-between rounded-[2.5rem] border border-black/[0.06] bg-white p-10 transition-all duration-500 hover:border-[#c5a47e]/40 hover:shadow-[0_20px_50px_rgba(197,164,126,0.08)]"
              >
                <div>
                  <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-bitter text-xs font-bold text-[#c5a47e]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="h-px w-8 bg-[#c5a47e]/20" />
                      <span className="text-[9px] font-black tracking-[0.2em] text-[#0a0a0b]/40 uppercase transition-colors group-hover:text-[#c5a47e]">
                        {post.category}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-[#0a0a0b]/20">
                      {post.dateLabel}
                    </span>
                  </div>

                  <h3 className="font-bitter text-2xl leading-tight font-light text-[#0a0a0b] transition-colors group-hover:text-[#c5a47e] lg:text-4xl">
                    {post.title}
                  </h3>
                </div>

                <div className="mt-16">
                  <div className="mb-6 h-px w-full bg-black/[0.05] transition-colors group-hover:bg-[#c5a47e]/20" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-[#0a0a0b]/30 uppercase transition-colors group-hover:text-[#0a0a0b]">
                      Ler Análise Técnica
                    </span>
                    <div className="flex size-11 items-center justify-center rounded-full border border-black/5 text-[#0a0a0b] transition-all group-hover:border-[#0a0a0b] group-hover:bg-[#0a0a0b] group-hover:text-white">
                      <ArrowRight size={20} className="transition-transform" />
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none absolute top-10 right-10 select-none">
                  <span className="font-bitter text-6xl font-black text-black/[0.01] transition-colors group-hover:text-[#c5a47e]/5">
                    VON
                  </span>
                </div>
              </Link>
            </ElementReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
