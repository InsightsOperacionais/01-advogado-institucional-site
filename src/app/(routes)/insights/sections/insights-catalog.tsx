"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";

const CATEGORIES = ["Todos", "Tributário", "Corporativo", "Digital", "Cível"];

const POSTS = [
  {
    title: "Stock Options: Aspectos Fiscais e Societários",
    cat: "Corporativo",
    date: "24 FEV",
  },
  {
    title: "LGPD em Grupos Econômicos: Gestão de Dados Compartilhados",
    cat: "Digital",
    date: "20 FEV",
  },
  {
    title: "Planejamento Sucessório via Holding Offshore",
    cat: "Tributário",
    date: "15 FEV",
  },
  {
    title: "Arbitragem em Contratos de Infraestrutura",
    cat: "Cível",
    date: "10 FEV",
  },
];

export function InsightsCatalog() {
  const [activeTab, setActiveTab] = useState("Todos");

  return (
    <div>
      <div className="mb-20 flex flex-wrap gap-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={cn(
              "rounded-full border px-6 py-3 text-[10px] font-bold tracking-widest uppercase transition-all",
              activeTab === cat
                ? "border-[#0a0a0b] bg-[#0a0a0b] text-white"
                : "border-black/10 bg-transparent text-black/40 hover:border-[#c5a47e]",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {POSTS.map((post, i) => (
          <div
            key={i}
            className="group cursor-pointer rounded-[2rem] border border-black/5 bg-white p-12 transition-all hover:border-[#c5a47e]/30"
          >
            <div className="mb-10 flex items-start justify-between">
              <span className="text-[9px] font-black tracking-widest text-[#c5a47e] uppercase">
                {post.cat}
              </span>
              <span className="text-[10px] font-bold text-black/20">
                {post.date}
              </span>
            </div>
            <h3 className="font-bitter text-2xl leading-snug font-light text-[#0a0a0b] transition-colors group-hover:text-[#c5a47e]">
              {post.title}
            </h3>
            <div className="mt-10 h-px w-full bg-black/5 transition-colors group-hover:bg-[#c5a47e]/20" />
            <p className="mt-8 text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase transition-colors group-hover:text-[#0a0a0b]">
              Continuar Lendo
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
