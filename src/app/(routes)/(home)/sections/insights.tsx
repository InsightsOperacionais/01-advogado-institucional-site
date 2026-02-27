"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const POSTS = [
  {
    title: "Impactos da Reforma Tributária no Setor de Serviços",
    date: "24 FEV, 2026",
    cat: "TRIBUTÁRIO",
  },
  {
    title: "Governança Corporativa: Novos Padrões de Compliance",
    date: "18 FEV, 2026",
    cat: "CORPORATIVO",
  },
];

export function InsightsSection() {
  return (
    <div className="container mx-auto">
      <div className="mb-16 flex items-end justify-between">
        <h2 className="font-bitter text-4xl font-light lg:text-6xl">
          Insights <br />
          <span className="text-[#c5a47e] italic">Jurídicos</span>
        </h2>
        <Link
          href="/insights"
          className="border-b border-[#c5a47e] pb-2 text-[10px] font-bold tracking-widest transition-colors hover:text-[#c5a47e]"
        >
          VER TODAS AS PUBLICAÇÕES
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {POSTS.map((post, i) => (
          <Link
            href="#"
            key={i}
            className="group flex flex-col justify-between rounded-3xl border border-black/5 bg-white p-10 transition-all hover:border-[#c5a47e]/30 hover:shadow-2xl hover:shadow-[#c5a47e]/5"
          >
            <div>
              <span className="text-[9px] font-black tracking-[0.3em] text-[#c5a47e] uppercase">
                {post.cat}
              </span>
              <h3 className="font-bitter mt-4 text-2xl font-light transition-colors group-hover:text-[#c5a47e]">
                {post.title}
              </h3>
            </div>
            <div className="mt-12 flex items-center justify-between">
              <span className="text-[10px] font-medium text-black/40">
                {post.date}
              </span>
              <ArrowRight className="size-5 -translate-x-4 text-[#c5a47e] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
