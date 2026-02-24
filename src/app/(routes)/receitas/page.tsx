/* eslint-disable react/no-unescaped-entities */
// app/receitas/page.tsx
"use client";

import { ElementReveal } from "@/components/layout/element-reveal";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChefHat,
  Clock,
  Filter,
  Flame,
  Search,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { RECIPES } from "./receitas-data";

const CATEGORIES = [
  "Todas",
  "Café da Manhã",
  "Almoço",
  "Jantar",
  "Petiscos",
  "Sobremesas",
  "Molhos",
  "Saladas",
];

export default function RecipesPage() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((recipe) => {
      const matchesCategory =
        activeCategory === "Todas" || recipe.category === activeCategory;
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.products.some((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Busca a primeira receita marcada como destaque para o banner inferior
  const featuredRecipe = useMemo(() => RECIPES.find((r) => r.featured), []);

  return (
    <main className="min-h-screen bg-[#F8F8F8] pt-32 pb-24">
      {/* SECTION: HERO & SEARCH */}
      <section className="container mx-auto mb-20 max-w-7xl px-8">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ElementReveal>
              <span className="text-[10px] font-black tracking-[0.5em] text-[#fbb725] uppercase">
                Caderno de Segredos
              </span>
            </ElementReveal>
            <h1 className="font-bitter mt-6 text-[clamp(3rem,10vw,7rem)] leading-[0.85] font-light tracking-tighter text-[#141414]">
              A Arte da <br />
              <span className="font-black text-[#fbb725]">
                Cozinha de Roça.
              </span>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pb-4">
            <div className="group relative">
              <Search
                className="absolute top-1/2 left-4 -translate-y-1/2 text-[#141414]/30 transition-colors group-focus-within:text-[#fbb725]"
                size={18}
              />
              <input
                type="text"
                placeholder="Buscar por receita ou produto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-[#141414]/5 bg-white py-5 pr-6 pl-12 text-[10px] tracking-widest uppercase shadow-sm transition-all outline-none focus:border-[#fbb725]/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FILTERS */}
      <section className="container mx-auto mb-16 max-w-7xl px-8">
        <div className="flex flex-wrap items-center gap-3 border-b border-[#141414]/5 pb-10">
          <div className="mr-4 flex items-center gap-2 text-[#fbb725]">
            <Filter size={14} />
            <span className="text-[9px] font-black tracking-widest uppercase">
              Filtrar
            </span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full border px-6 py-2.5 text-[9px] font-black tracking-[0.2em] uppercase transition-all duration-300",
                activeCategory === cat
                  ? "border-[#141414] bg-[#141414] text-[#fbb725] shadow-xl"
                  : "border-[#141414]/5 bg-white text-[#141414]/40 hover:border-[#fbb725]/40 hover:text-[#141414]",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* SECTION: RECIPES GRID */}
      <section className="container mx-auto min-h-[400px] max-w-7xl px-8">
        <AnimatePresence mode="popLayout">
          {filteredRecipes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="mb-6 rounded-full bg-[#fbb725]/10 p-8">
                <ChefHat size={48} className="text-[#fbb725]" strokeWidth={1} />
              </div>
              <h3 className="font-bitter mb-2 text-2xl font-medium text-[#141414]">
                Nenhum segredo encontrado
              </h3>
              <p className="text-sm font-light tracking-widest text-[#141414]/40 uppercase">
                Tente buscar por "Queijo", "Defumados" ou mude a categoria.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {filteredRecipes.map((recipe, index) => (
                <motion.div
                  layout
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link
                    href={`/receitas/${recipe.slug}`}
                    className="group block h-full"
                  >
                    <div className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-[#141414]/5 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)]">
                      {/* Image Area */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={recipe.imageGallery[0]}
                          alt={recipe.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />

                        {/* Badges */}
                        <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                          <div className="flex items-center gap-1.5 rounded-full bg-[#141414]/90 px-3 py-1.5 text-[8px] font-bold text-[#fbb725] backdrop-blur-md">
                            <Clock size={10} />
                            {recipe.time}
                          </div>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="flex flex-1 flex-col p-10">
                        <span className="mb-3 text-[9px] font-black tracking-[0.3em] text-[#fbb725] uppercase">
                          {recipe.category}
                        </span>

                        <h3 className="font-bitter mb-4 text-2xl leading-tight font-medium text-[#141414] transition-colors group-hover:text-[#fbb725]">
                          {recipe.title}
                        </h3>

                        <p className="mb-8 line-clamp-3 text-sm leading-relaxed font-light text-[#141414]/50">
                          {recipe.description}
                        </p>

                        {/* Products Used */}
                        <div className="mb-8 flex flex-wrap gap-2">
                          {recipe.products.slice(0, 3).map((p, i) => (
                            <span
                              key={i}
                              className="flex items-center gap-1.5 rounded-md border border-[#fbb725]/10 bg-[#fbb725]/5 px-2 py-1 text-[8px] font-bold text-[#fbb725]/80 uppercase"
                            >
                              <Utensils size={8} />
                              {p.name}
                            </span>
                          ))}
                        </div>

                        {/* Card Footer */}
                        <div className="mt-auto flex items-center justify-between border-t border-[#141414]/5 pt-6">
                          <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-[#141414] text-[10px] font-black text-[#fbb725]">
                              {recipe.author.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[8px] font-black tracking-widest text-[#141414]/20 uppercase">
                                Curadoria
                              </span>
                              <span className="text-xs font-medium text-[#141414]">
                                {recipe.author}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-[#141414]/20 transition-colors group-hover:text-[#fbb725]">
                            <span className="text-[10px] font-black tracking-widest uppercase">
                              Explorar
                            </span>
                            <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION: FEATURED RECIPE (MASTER BANNER) */}
      {featuredRecipe && (
        <section className="container mx-auto mt-32 max-w-7xl px-8">
          <ElementReveal distance={50}>
            <div className="relative overflow-hidden rounded-[3rem] bg-[#141414] text-[#f1f1f1]">
              {/* Background Decorativo */}
              <div className="pointer-events-none absolute top-0 right-0 hidden h-full w-1/2 opacity-20 lg:block">
                <Image
                  src={
                    featuredRecipe.imageGallery[1] ||
                    featuredRecipe.imageGallery[0]
                  }
                  alt="Background"
                  fill
                  className="object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-l from-[#141414] to-transparent" />
              </div>

              <div className="relative z-20 grid grid-cols-1 gap-8 p-12 lg:grid-cols-12 lg:p-20">
                <div className="flex flex-col justify-center lg:col-span-7">
                  <span className="mb-6 flex items-center gap-3 text-[10px] font-black tracking-[0.5em] text-[#fbb725] uppercase">
                    <Flame size={14} strokeWidth={3} />
                    Receita Master
                  </span>

                  <h2 className="font-bitter mb-6 text-4xl leading-[0.9] font-light tracking-tighter lg:text-6xl">
                    {featuredRecipe.title}
                  </h2>

                  <p className="mb-10 max-w-lg text-base leading-relaxed font-light text-[#f1f1f1]/50">
                    {featuredRecipe.description}
                  </p>

                  <Link
                    href={`/receitas/${featuredRecipe.slug}`}
                    className="group inline-flex w-fit items-center gap-6 rounded-full bg-[#fbb725] px-10 py-5 text-[11px] font-black tracking-[0.4em] text-[#141414] uppercase shadow-2xl transition-all hover:bg-white active:scale-95"
                  >
                    Revelar Preparo
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-2"
                    />
                  </Link>
                </div>
              </div>

              {/* Número Editorial de Fundo */}
              <span className="font-bitter pointer-events-none absolute right-12 bottom-0 hidden text-[18rem] leading-none font-black text-white/[0.03] select-none lg:block">
                01
              </span>
            </div>
          </ElementReveal>
        </section>
      )}

      {/* SECTION: NEWSLETTER / SHARE */}
      <section className="container mx-auto mt-32 max-w-7xl px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-[#141414] p-12 text-center shadow-2xl lg:p-24">
          {/* Textura de fundo sutil */}
          <div className="pointer-events-none absolute inset-0 bg-[url('/textura-papel.png')] bg-repeat opacity-5 mix-blend-overlay" />

          <ElementReveal>
            <ChefHat
              size={48}
              className="mx-auto mb-8 text-[#fbb725]"
              strokeWidth={1}
            />
            <h2 className="font-bitter mb-6 text-4xl font-light tracking-tighter text-[#f1f1f1] lg:text-6xl">
              Sua receita pode ser <br />
              <span className="font-black text-[#fbb725]">
                nossa próxima história.
              </span>
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-sm leading-loose font-light tracking-[0.3em] text-[#f1f1f1]/40 uppercase">
              Compartilhe como você utiliza os produtos ROCERIA e ajude a
              preservar nossa cultura.
            </p>

            <button className="group inline-flex items-center gap-6 rounded-full border border-[#fbb725]/30 bg-transparent px-12 py-6 text-[11px] font-black tracking-[0.4em] text-[#fbb725] transition-all hover:bg-[#fbb725] hover:text-[#141414] active:scale-95">
              Enviar minha receita
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-2"
              />
            </button>
          </ElementReveal>
        </div>
      </section>

      {/* SECTION: STATS - Finalizando com autoridade */}
      <section className="container mx-auto mt-32 max-w-7xl border-t border-[#141414]/5 px-8 pt-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          {[
            { number: RECIPES.length, label: "Receitas" },
            { number: "12k", label: "Cozinheiros" },
            { number: CATEGORIES.length - 1, label: "Categorias" },
            { number: "100%", label: "Artesanal" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-bitter text-5xl font-black tracking-tighter text-[#141414] lg:text-6xl">
                {stat.number}
              </div>
              <div className="mt-4 text-[10px] font-bold tracking-[0.4em] text-[#fbb725] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
