"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { insightArticles } from "../articles";

const CATEGORIES = ["Todos", "Tributário", "Corporativo", "Digital", "Cível"];

export function InsightsCatalog() {
  const [activeTab, setActiveTab] = useState("Todos");

  const filteredPosts =
    activeTab === "Todos"
      ? insightArticles
      : insightArticles.filter((post) => post.category === activeTab);

  return (
    <section className="text-[#0a0a0b]">
      <div className="container mx-auto px-4 pb-24">
        {/* FILTROS EDITORIAIS */}
        <div className="mb-20 flex flex-wrap items-center justify-center gap-6 lg:gap-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "relative px-2 py-4 text-[10px] font-bold tracking-[0.4em] uppercase transition-all",
                  isActive
                    ? "text-[#c5a47e]"
                    : "text-[#0a0a0b]/40 hover:text-[#0a0a0b]",
                )}
              >
                {cat}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderlineLight"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-[#c5a47e]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* GRID DE TESES JURÍDICAS */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                key={post.slug}
              >
                <Link
                  href={`/insights/${post.slug}`}
                  className="group interactive-card relative flex h-full flex-col justify-between rounded-[2.5rem] border border-black/[0.06] bg-white p-10 transition-all duration-500 hover:border-[#c5a47e]/40 hover:shadow-[0_20px_50px_rgba(197,164,126,0.08)]"
                >
                  <div>
                    {/* HEADER DO CARD */}
                    <div className="mb-12 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="font-bitter text-xs font-bold text-[#c5a47e]">
                          {String(index + 1).padStart(2, "0")}
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

                    {/* TÍTULO MONUMENTAL */}
                    <h3 className="font-bitter text-2xl leading-tight font-light text-[#0a0a0b] transition-colors group-hover:text-[#c5a47e] lg:text-3xl">
                      {post.title}
                    </h3>
                  </div>

                  {/* FOOTER DO CARD */}
                  <div className="mt-16">
                    <div className="mb-6 h-px w-full bg-black/[0.05] transition-colors group-hover:bg-[#c5a47e]/20" />
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.3em] text-[#0a0a0b]/30 uppercase transition-colors group-hover:text-[#0a0a0b]">
                        Explorar Tese
                      </span>
                      <div className="flex size-11 items-center justify-center rounded-full border border-black/5 text-[#0a0a0b] transition-all group-hover:border-[#0a0a0b] group-hover:bg-[#0a0a0b] group-hover:text-white">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Marca d'água sutil (O luxo está nos detalhes) */}
                  <div className="pointer-events-none absolute top-10 right-10 select-none">
                    <span className="font-bitter text-6xl font-black text-black/[0.01] transition-colors group-hover:text-[#c5a47e]/5">
                      VON
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
