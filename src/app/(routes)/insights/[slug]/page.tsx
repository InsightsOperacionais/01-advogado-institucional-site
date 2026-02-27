import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Clock } from "lucide-react";
import { insightArticleBySlug, insightArticles } from "../articles";
import { siteConfig } from "@/lib/site-config";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return insightArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  props: InsightPageProps,
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = insightArticleBySlug[slug];

  if (!article) {
    return {
      title: "Insight não encontrado",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/insights/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `${siteConfig.url}/insights/${article.slug}`,
      images: [
        {
          url: article.image,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function InsightArticlePage(props: InsightPageProps) {
  const { slug } = await props.params;
  const article = insightArticleBySlug[slug];

  if (!article) {
    notFound();
  }

  return (
    <main className="bg-[#f4f4f5] px-6 py-16 lg:py-24">
      <article className="mx-auto max-w-4xl rounded-[2rem] border border-black/5 bg-white p-8 shadow-2xl shadow-black/5 lg:p-14">
        <Link
          href="/insights"
          className="mb-10 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-black/50 uppercase transition-colors hover:text-[#c5a47e]"
        >
          <ArrowLeft size={14} />
          Voltar para insights
        </Link>

        <div className="mb-8 flex flex-wrap items-center gap-4">
          <span className="rounded-full bg-[#c5a47e]/15 px-4 py-1 text-[10px] font-black tracking-widest text-[#c5a47e] uppercase">
            {article.category}
          </span>
          <span className="text-[11px] font-medium text-black/40">
            {article.dateLabel}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-medium text-black/40">
            <Clock size={12} />
            {article.readTime} de leitura
          </span>
        </div>

        <h1 className="font-bitter text-4xl leading-tight font-light text-[#0a0a0b] lg:text-6xl">
          {article.title}
        </h1>

        <p className="mt-8 border-l-2 border-[#c5a47e]/30 pl-6 text-lg leading-relaxed font-light text-black/60">
          {article.excerpt}
        </p>

        <div className="mt-10 space-y-6">
          {article.content.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-relaxed font-light text-[#0a0a0b]/80"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}
