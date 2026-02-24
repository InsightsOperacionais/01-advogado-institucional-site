"use client";

import { ElementReveal } from "@/components/layout/element-reveal";
import { RoceriaButton } from "@/components/layout/roceria-button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { RECIPES } from "../../receitas/receitas-data";

// ===== RECIPES SECTION - Estilo Manifesto Gastronômico =====

export function RecipesSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-play do carrossel de destaque
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % RECIPES.slice(0, 6).length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // 6 receitas para o grid lateral
  const sideRecipes = useMemo(() => {
    return RECIPES.slice(0, 6);
  }, []);

  // Receita em destaque no carrossel
  const featuredRecipe = useMemo(() => {
    return sideRecipes[featuredIndex];
  }, [featuredIndex, sideRecipes]);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const clientWidth = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -clientWidth : clientWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current && isMobile) {
        const { scrollLeft, clientWidth } = carouselRef.current;
        setCurrentIndex(Math.round(scrollLeft / clientWidth));
      }
    };
    carouselRef.current?.addEventListener("scroll", handleScroll);
    return () =>
      carouselRef.current?.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="container mx-auto">
        {/* HEADER */}
        <div className="mb-12 flex w-full items-end justify-between pb-8">
          <div>
            <ElementReveal>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#fbb725] uppercase">
                Culinária Ancestral
              </span>
            </ElementReveal>
            <h2 className="font-bitter text-4xl leading-none font-light text-[#141414] lg:text-6xl">
              <ElementReveal delay={0.2}>
                A alma da roça <br />
                <span className="font-black text-[#fbb725]">em sua mesa</span>
              </ElementReveal>
            </h2>
          </div>

          <Link
            href="/receitas"
            className="group hidden items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-[#141414]/40 uppercase transition-colors hover:text-[#fbb725] lg:flex"
          >
            Ver acervo completo
            <span className="h-px w-8 bg-[#fbb725]/30 transition-all group-hover:w-12 group-hover:bg-[#fbb725]" />
          </Link>
        </div>

        <div className="flex flex-col-reverse gap-4 lg:grid lg:grid-cols-6">
          {/* Área de Cards Menores (Esquerda) */}
          <div className="flex flex-col lg:col-span-3">
            <div
              ref={carouselRef}
              className={cn(
                "flex gap-4 overflow-hidden lg:grid lg:grid-cols-3",
                isMobile ? "snap-x snap-mandatory overflow-x-hidden" : "",
              )}
            >
              {sideRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className={cn(
                    "flex shrink-0 cursor-pointer",
                    isMobile ? "w-full snap-center" : "h-full",
                  )}
                >
                  <Link
                    href={`/receitas/${recipe.slug}`}
                    className="group block h-full w-full"
                  >
                    <div className="relative flex h-95 flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)]">
                      <div className="relative h-60 overflow-hidden">
                        <Image
                          src={recipe.imageGallery[1]}
                          alt={recipe.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-60" />
                        <div className="absolute top-5 left-5 flex flex-col gap-2">
                          <div className="flex items-center gap-1.5 rounded-full bg-[#141414]/90 px-3 py-1.5 text-[8px] font-bold text-[#fbb725] backdrop-blur-md">
                            <Clock size={10} /> {recipe.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <span className="mb-2 text-[8px] font-black tracking-[0.2em] text-[#fbb725] uppercase">
                          {recipe.category}
                        </span>
                        <h3 className="font-bitter mb-3 line-clamp-2 text-xl leading-tight font-medium text-[#141414] transition-colors group-hover:text-[#fbb725]">
                          {recipe.title}
                        </h3>
                        <p className="mb-3 line-clamp-2 text-xs leading-relaxed font-light text-[#141414]/50">
                          {recipe.description}
                        </p>
                        <div className="mb-3 flex flex-wrap gap-1.5">
                          {recipe.products.slice(0, 2).map((p, i) => (
                            <span
                              key={i}
                              className="rounded-md border border-[#fbb725]/10 bg-[#fbb725]/5 text-[7px] font-bold text-[#fbb725]/80 uppercase"
                            >
                              {p.name}
                            </span>
                          ))}
                        </div>
                        <div className="mt-auto flex items-center justify-between border-t border-[#141414]/5 pt-5">
                          <div className="flex items-center gap-2">
                            <div className="flex size-7 items-center justify-center rounded-full bg-[#141414] text-[10px] font-black text-[#fbb725]">
                              {recipe.author.charAt(0)}
                            </div>
                            <span className="text-[9px] font-bold tracking-widest text-[#141414]/30 uppercase">
                              {recipe.author.slice(0)}
                            </span>
                          </div>
                          <ArrowRight
                            size={16}
                            className="text-[#141414]/20 transition-colors group-hover:text-[#fbb725]"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* CONTROLES MOBILE */}
            {isMobile && (
              <div className="mt-8 flex flex-col items-center gap-6">
                <div className="flex items-center gap-2">
                  {sideRecipes.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        currentIndex === i
                          ? "w-8 bg-[#fbb725]"
                          : "w-1.5 bg-[#141414]/10",
                      )}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <RoceriaButton
                    variant="carousel-control"
                    size="icon"
                    onClick={() => scroll("left")}
                    disabled={currentIndex === 0}
                    className="size-12 border-[#141414]/10"
                  >
                    <ChevronLeft size={20} />
                  </RoceriaButton>
                  <span className="text-[10px] font-bold tracking-widest text-[#141414]/40 uppercase">
                    {currentIndex + 1} / {sideRecipes.length}
                  </span>
                  <RoceriaButton
                    variant="carousel-control"
                    size="icon"
                    onClick={() => scroll("right")}
                    disabled={currentIndex === sideRecipes.length - 1}
                    className="size-12 border-[#141414]/10"
                  >
                    <ChevronRight size={20} />
                  </RoceriaButton>
                </div>
              </div>
            )}
          </div>

          {/* Banner Lateral - h-full garante que ele estique para preencher a coluna da grid */}
          <div className="group relative min-h-95 w-full overflow-hidden rounded-3xl bg-[#141414] lg:col-span-3 lg:h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                /* absolute inset-0 é VITAL aqui: ele força o motion.div a preencher 
         o container pai sem depender do volume do conteúdo interno */
                className="absolute inset-0 z-10 flex flex-col justify-between p-8"
              >
                {/* Imagem de Fundo Centralizada */}
                <Image
                  src={
                    featuredRecipe?.imageGallery[2] ||
                    featuredRecipe?.imageGallery[0] ||
                    ""
                  }
                  alt={featuredRecipe?.title || "Receita"}
                  fill
                  /* object-cover + object-center mantém a proporção e centraliza a imagem */
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* Overlay e Conteúdo */}
                <div className="absolute inset-0 z-10 bg-[#141414]/60 transition-opacity group-hover:opacity-70" />
                <div className="relative z-20">
                  <span className="text-[10px] font-bold tracking-[0.5em] text-[#fbb725] uppercase">
                    Tesouro de Família
                  </span>
                  <h3 className="font-bitter mt-4 text-4xl font-light text-white lg:text-6xl">
                    {featuredRecipe?.title.split(" ").slice(0, 2).join(" ")}{" "}
                    <br />
                    <span className="font-black text-[#fbb725]">
                      {featuredRecipe?.title.split(" ").slice(2).join(" ")}
                    </span>
                  </h3>

                  <div className="mt-6 flex gap-6">
                    <div>
                      <span className="text-[8px] font-black tracking-widest text-[#fbb725]/50 uppercase">
                        Nível
                      </span>
                      <p className="text-sm font-medium text-white">
                        {featuredRecipe?.difficulty}
                      </p>
                    </div>
                    <div>
                      <span className="text-[8px] font-black tracking-widest text-[#fbb725]/50 uppercase">
                        Tempo
                      </span>
                      <p className="text-sm font-medium text-white">
                        {featuredRecipe?.time}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative z-20">
                  <Link
                    href={`/receitas/${featuredRecipe?.slug}`}
                    className="inline-flex items-center gap-4 text-[10px] font-bold tracking-widest text-white uppercase"
                  >
                    <span className="underline decoration-[#fbb725] underline-offset-8">
                      Descobrir Segredo
                    </span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>

                {/* Indicadores do Carrossel */}
                <div className="absolute right-10 bottom-10 z-20 flex gap-2">
                  {sideRecipes.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setFeaturedIndex(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        featuredIndex === i
                          ? "w-8 bg-[#fbb725]"
                          : "w-1.5 bg-white/50 hover:bg-white/80",
                      )}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA COMUNIDADE */}
        <div className="mt-20 flex flex-col items-center text-center">
          <ElementReveal>
            <div className="mb-10 flex items-center justify-center -space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex size-16 items-center justify-center rounded-full border-4 border-[#F8F8F8] bg-[#141414] text-2xl shadow-2xl"
                >
                  {["👨‍🍳", "👩‍🍳", "👴", "👵", "🍯"][i - 1]}
                </div>
              ))}
            </div>
            <h4 className="font-bitter mb-6 text-3xl font-light text-[#141414]">
              Sua receita merece ser{" "}
              <span className="font-bold italic">patrimônio.</span>
            </h4>
            <Link
              href="/receitas/compartilhar"
              className="group inline-flex items-center gap-8 rounded-full bg-[#fbb725] px-12 py-6 text-[11px] font-black tracking-[0.4em] text-[#141414] uppercase shadow-2xl transition-all hover:bg-[#141414] hover:text-[#fbb725] active:scale-95"
            >
              Compartilhar Receita
              <ChefHat
                size={20}
                className="transition-transform group-hover:rotate-12"
              />
            </Link>
          </ElementReveal>
        </div>
      </div>
    </section>
  );
}
