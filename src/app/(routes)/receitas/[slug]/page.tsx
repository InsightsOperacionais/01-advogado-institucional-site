/* eslint-disable react/no-unescaped-entities */
// app/receitas/[slug]/page.tsx
"use client";

import { ElementReveal } from "@/components/layout/element-reveal";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  Bookmark,
  ChefHat,
  Clock,
  Flame,
  Heart,
  Printer,
  Share2,
  ShoppingBag,
  Users,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { RECIPES } from "../receitas-data";

// Função segura para formatar slug
function formatSlug(text: string | undefined): string {
  if (!text) return "";
  try {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  } catch (error) {
    // Fallback caso normalize não funcione
    return text
      .toLowerCase()
      .replace(/[àáâãäå]/g, "a")
      .replace(/[èéêë]/g, "e")
      .replace(/[ìíîï]/g, "i")
      .replace(/[òóôõö]/g, "o")
      .replace(/[ùúûü]/g, "u")
      .replace(/[ç]/g, "c")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }
}

export default function RecipeDetailPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  // Encontra a receita pelo slug com segurança
  const recipe = useMemo(() => {
    if (!slug) return null;

    return RECIPES.find((r) => {
      // Comparação direta primeiro
      if (r.slug === slug) return true;

      // Depois tenta com formatação (segura)
      try {
        const formattedSlug = formatSlug(slug);
        const formattedRecipeSlug = formatSlug(r.slug);
        return formattedRecipeSlug === formattedSlug;
      } catch (error) {
        return false;
      }
    });
  }, [slug]);

  // Receitas relacionadas (mesma categoria, excluindo a atual)
  const relatedRecipes = useMemo(() => {
    if (!recipe) return [];
    return RECIPES.filter(
      (r) => r.category === recipe.category && r.id !== recipe.id,
    ).slice(0, 3);
  }, [recipe]);

  useEffect(() => {
    // Se não encontrou a receita, redireciona para 404
    if (slug && !recipe) {
      notFound();
    }
    // Reset image errors when recipe changes
    setImageError({});
  }, [recipe, slug]);

  if (!recipe) {
    return null; // Isso será substituído pelo useEffect que chama notFound()
  }

  // Manipulador de erro de imagem
  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  // Imagem de fallback
  const getImageSrc = (src: string | undefined, index: number) => {
    if (imageError[index] || !src) {
      return "/roceria_logo.png"; // Fallback para o logo
    }
    return src;
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8]">
      {/* HERO SECTION COM IMAGEM PRINCIPAL */}
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        {/* Imagem Principal */}
        <div className="absolute inset-0 bg-[#141414]">
          <Image
            src={getImageSrc(recipe.imageGallery?.[selectedImage], 999)}
            alt={recipe.title}
            fill
            className="object-cover opacity-90"
            priority
            onError={() => handleImageError(999)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent" />
        </div>

        {/* Overlay com informações */}
        <div className="absolute right-0 bottom-0 left-0 z-20">
          <div className="container mx-auto max-w-7xl px-4 pb-12 md:px-8 md:pb-20">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Link
                    href="/receitas"
                    className="group mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[8px] font-bold tracking-widest text-[#f1f1f1] backdrop-blur-md transition-all hover:bg-[#fbb725] hover:text-[#141414] md:mb-6 md:px-4 md:py-2 md:text-[10px]"
                  >
                    <ArrowLeft
                      size={10}
                      className="transition-transform group-hover:-translate-x-1 md:size-3"
                    />
                    VOLTAR PARA RECEITAS
                  </Link>

                  <div className="flex flex-wrap gap-2 md:gap-3">
                    <span className="rounded-full bg-[#fbb725] px-3 py-1.5 text-[8px] font-black tracking-widest text-[#141414] uppercase md:px-4 md:py-2 md:text-[9px]">
                      {recipe.category}
                    </span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[8px] font-black tracking-widest text-white uppercase backdrop-blur-md md:px-4 md:py-2 md:text-[9px]">
                      {recipe.difficulty}
                    </span>
                  </div>

                  <h1 className="font-bitter mt-4 text-3xl font-light text-white md:mt-6 md:text-5xl lg:text-7xl">
                    {recipe.title}
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-relaxed font-light text-white/70 md:mt-4 md:text-base lg:text-lg">
                    {recipe.description}
                  </p>

                  {/* Stats rápidas */}
                  <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8 md:gap-6">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <div className="rounded-full bg-white/10 p-1.5 backdrop-blur-sm md:p-2">
                        <Clock size={14} className="text-[#fbb725] md:size-4" />
                      </div>
                      <span className="text-xs font-medium text-white md:text-sm">
                        {recipe.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <div className="rounded-full bg-white/10 p-1.5 backdrop-blur-sm md:p-2">
                        <Users size={14} className="text-[#fbb725] md:size-4" />
                      </div>
                      <span className="text-xs font-medium text-white md:text-sm">
                        {recipe.servings}{" "}
                        {recipe.servings === 1 ? "porção" : "porções"}
                      </span>
                    </div>
                    {recipe.calories && (
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <div className="rounded-full bg-white/10 p-1.5 backdrop-blur-sm md:p-2">
                          <Flame
                            size={14}
                            className="text-[#fbb725] md:size-4"
                          />
                        </div>
                        <span className="text-xs font-medium text-white md:text-sm">
                          {recipe.calories} kcal
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Ações */}
                  <div className="mt-6 flex flex-wrap items-center gap-2 md:mt-8 md:gap-3">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[9px] font-bold tracking-widest backdrop-blur-md transition-all md:gap-2 md:px-6 md:py-3 md:text-xs",
                        isLiked
                          ? "border-red-500/30 bg-red-500/20 text-red-500"
                          : "text-white hover:bg-white/20",
                      )}
                    >
                      <Heart size={12} className="md:size-4" />
                      <span className="hidden sm:inline">
                        {isLiked ? "CURTIDO" : "CURTIR"}
                      </span>
                      <span className="sm:hidden">{isLiked ? "✔" : "♥"}</span>
                    </button>
                    <button
                      onClick={() => setIsSaved(!isSaved)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[9px] font-bold tracking-widest backdrop-blur-md transition-all md:gap-2 md:px-6 md:py-3 md:text-xs",
                        isSaved
                          ? "border-[#fbb725]/30 bg-[#fbb725]/20 text-[#fbb725]"
                          : "text-white hover:bg-white/20",
                      )}
                    >
                      <Bookmark size={12} className="md:size-4" />
                      <span className="hidden sm:inline">
                        {isSaved ? "SALVO" : "SALVAR"}
                      </span>
                      <span className="sm:hidden">{isSaved ? "📌" : "🔖"}</span>
                    </button>
                    <button className="rounded-full border border-white/20 bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:bg-white/20 md:p-3">
                      <Share2 size={12} className="md:size-4" />
                    </button>
                    <button className="rounded-full border border-white/20 bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:bg-white/20 md:p-3">
                      <Printer size={12} className="md:size-4" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Galeria de miniaturas */}
              {recipe.imageGallery && recipe.imageGallery.length > 1 && (
                <div className="hidden lg:col-span-4 lg:block">
                  <div className="flex justify-end gap-3">
                    {recipe.imageGallery.map((img, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                          "relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-all xl:h-20 xl:w-20",
                          selectedImage === index
                            ? "scale-110 border-[#fbb725] shadow-lg"
                            : "border-white/20 opacity-60 hover:opacity-100",
                        )}
                      >
                        <Image
                          src={getImageSrc(img, index)}
                          alt={`${recipe.title} - imagem ${index + 1}`}
                          fill
                          className="object-cover"
                          onError={() => handleImageError(index)}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <section className="container mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* COLUNA PRINCIPAL - INGREDIENTES E MODO DE PREPARO */}
          <div className="lg:col-span-8">
            {/* Sobre o autor */}
            <ElementReveal>
              <div className="mb-8 flex flex-col items-start gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row md:mb-12 md:p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#141414] text-xl font-black text-[#fbb725] md:h-16 md:w-16 md:text-2xl">
                  {recipe.author?.charAt(0) || "R"}
                </div>
                <div>
                  <span className="text-[8px] font-black tracking-widest text-[#fbb725] uppercase md:text-[9px]">
                    Receita por
                  </span>
                  <h3 className="font-bitter text-xl font-medium text-[#141414] md:text-2xl">
                    {recipe.author}
                  </h3>
                  {recipe.authorBio && (
                    <p className="mt-1 text-xs font-light text-[#141414]/50 md:text-sm">
                      {recipe.authorBio}
                    </p>
                  )}
                </div>
              </div>
            </ElementReveal>

            {/* História da receita */}
            {recipe.history && (
              <ElementReveal delay={0.1}>
                <div className="mb-8 rounded-2xl bg-[#fbb725]/5 p-6 md:mb-12 md:p-8">
                  <Award
                    size={20}
                    className="mb-3 text-[#fbb725] md:mb-4 md:size-6"
                  />
                  <h4 className="font-bitter mb-2 text-lg font-medium text-[#141414] md:text-xl">
                    História dessa receita
                  </h4>
                  <p className="text-sm leading-relaxed font-light text-[#141414]/70 md:text-base">
                    {recipe.history}
                  </p>
                </div>
              </ElementReveal>
            )}

            {/* Ingredientes */}
            <ElementReveal delay={0.2}>
              <div className="mb-8 md:mb-12">
                <div className="mb-4 flex items-center gap-2 md:mb-6 md:gap-3">
                  <div className="h-6 w-1 bg-[#fbb725] md:h-8 md:w-1" />
                  <h2 className="font-bitter text-2xl font-light text-[#141414] md:text-3xl">
                    Ingredientes
                  </h2>
                </div>

                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
                  {recipe.ingredients?.map((ingredient, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="flex items-start gap-2 md:gap-3"
                    >
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#fbb725] md:h-2 md:w-2" />
                      <span className="text-sm font-light text-[#141414]/70 md:text-base">
                        {ingredient}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </ElementReveal>

            {/* Modo de preparo */}
            <ElementReveal delay={0.3}>
              <div>
                <div className="mb-4 flex items-center gap-2 md:mb-6 md:gap-3">
                  <div className="h-6 w-1 bg-[#fbb725] md:h-8 md:w-1" />
                  <h2 className="font-bitter text-2xl font-light text-[#141414] md:text-3xl">
                    Modo de preparo
                  </h2>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {recipe.steps?.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onMouseEnter={() => setActiveStep(index)}
                      className={cn(
                        "group relative overflow-hidden rounded-xl border border-[#141414]/5 bg-white p-4 transition-all md:rounded-2xl md:p-6",
                        activeStep === index && "border-[#fbb725]/30 shadow-lg",
                      )}
                    >
                      <div className="flex gap-3 md:gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fbb725] text-sm font-black text-[#141414] md:h-10 md:w-10 md:text-base">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed font-light text-[#141414]/70 md:text-base">
                            {step.description}
                          </p>
                          {step.tip && (
                            <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-[#fbb725]/10 p-2 md:mt-3 md:gap-2 md:p-3">
                              <AlertCircle
                                size={12}
                                className="mt-0.5 flex-shrink-0 text-[#fbb725] md:size-4"
                              />
                              <span className="text-xs font-light text-[#141414]/60 md:text-sm">
                                {step.tip}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ElementReveal>

            {/* Dicas extras */}
            {recipe.tips && recipe.tips.length > 0 && (
              <ElementReveal delay={0.4}>
                <div className="mt-8 md:mt-12">
                  <h3 className="font-bitter mb-3 text-xl font-medium text-[#141414] md:mb-4 md:text-2xl">
                    Dicas da Cozinha
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
                    {recipe.tips.map((tip, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-[#141414]/5 bg-white p-4 md:p-5"
                      >
                        <div className="mb-2 text-xl md:text-2xl">💡</div>
                        <p className="text-xs font-light text-[#141414]/70 md:text-sm">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ElementReveal>
            )}
          </div>

          {/* COLUNA LATERAL - PRODUTOS */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <ElementReveal>
                <div className="rounded-xl bg-white p-5 shadow-lg md:rounded-2xl md:p-8">
                  <div className="mb-4 flex items-center gap-2 md:mb-6">
                    <ShoppingBag
                      size={18}
                      className="text-[#fbb725] md:size-5"
                    />
                    <h3 className="font-bitter text-lg font-medium text-[#141414] md:text-xl">
                      Produtos utilizados
                    </h3>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    {recipe.products?.map((product, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group flex items-center gap-3 border-b border-[#141414]/5 pb-3 last:border-0 last:pb-0"
                      >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[#141414]/5 md:h-14 md:w-14">
                          <Image
                            src={getImageSrc(product.image, index + 100)}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={() => handleImageError(index + 100)}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-xs font-medium text-[#141414] md:text-sm">
                            {product.name}
                          </h4>
                          <p className="text-[10px] font-light text-[#141414]/50 md:text-xs">
                            {product.quantity}
                          </p>
                          {product.link && (
                            <Link
                              href={product.link}
                              className="mt-0.5 inline-flex items-center gap-1 text-[7px] font-bold tracking-widest text-[#fbb725] uppercase md:mt-1 md:text-[8px]"
                            >
                              Ver produto
                              <ArrowRight size={6} className="md:size-2" />
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-[#141414]/5 pt-4 md:mt-6 md:pt-6">
                    <Link
                      href="/shop"
                      className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#141414] px-4 py-3 text-[8px] font-black tracking-widest text-white uppercase transition-colors hover:bg-[#fbb725] hover:text-[#141414] md:gap-2 md:py-4 md:text-[9px]"
                    >
                      <ShoppingBag size={12} className="md:size-4" />
                      COMPRAR INGREDIENTES
                    </Link>
                  </div>
                </div>
              </ElementReveal>

              {/* Informações nutricionais */}
              {recipe.calories && (
                <ElementReveal delay={0.2}>
                  <div className="mt-4 rounded-xl bg-[#141414] p-5 text-white md:mt-6 md:rounded-2xl md:p-8">
                    <h4 className="mb-3 text-[10px] font-bold tracking-widest text-[#fbb725] uppercase md:mb-4 md:text-xs">
                      Informação Nutricional
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-white/10 pb-2 text-xs md:text-sm">
                        <span>Calorias</span>
                        <span className="font-bold">
                          {recipe.calories} kcal
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2 text-xs md:text-sm">
                        <span>Porções</span>
                        <span className="font-bold">{recipe.servings}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2 text-xs md:text-sm">
                        <span>Tempo de preparo</span>
                        <span className="font-bold">{recipe.time}</span>
                      </div>
                      <div className="flex justify-between text-xs md:text-sm">
                        <span>Dificuldade</span>
                        <span className="font-bold">{recipe.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </ElementReveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* RECEITAS RELACIONADAS */}
      {relatedRecipes.length > 0 && (
        <section className="border-t border-[#141414]/5 bg-white py-12 md:py-20">
          <div className="container mx-auto max-w-7xl px-4 md:px-8">
            <ElementReveal>
              <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:mb-12">
                <div className="flex items-center gap-2 md:gap-3">
                  <Utensils size={20} className="text-[#fbb725] md:size-6" />
                  <h2 className="font-bitter text-2xl font-light text-[#141414] md:text-3xl">
                    Você também pode gostar
                  </h2>
                </div>
                <Link
                  href="/receitas"
                  className="group flex items-center gap-2 text-[8px] font-bold tracking-widest text-[#141414] uppercase transition-colors hover:text-[#fbb725] md:text-[9px]"
                >
                  Ver todas
                  <ArrowRight
                    size={10}
                    className="transition-transform group-hover:translate-x-1 md:size-3"
                  />
                </Link>
              </div>
            </ElementReveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {relatedRecipes.map((related, index) => (
                <ElementReveal key={related.id} delay={0.2 + index * 0.1}>
                  <Link
                    href={`/receitas/${related.slug}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-xl border border-[#141414]/5 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-xl md:rounded-2xl">
                      <div className="relative h-40 overflow-hidden md:h-48">
                        <Image
                          src={related.imageGallery?.[0] || "/roceria_logo.png"}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={() => handleImageError(index + 200)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className="rounded-full bg-[#fbb725] px-2 py-1 text-[7px] font-bold text-[#141414] uppercase md:text-[8px]">
                            {related.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 md:p-6">
                        <h3 className="font-bitter mb-2 line-clamp-2 text-base font-medium text-[#141414] md:text-lg">
                          {related.title}
                        </h3>
                        <p className="mb-3 line-clamp-2 text-xs font-light text-[#141414]/50 md:text-sm">
                          {related.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Clock
                              size={12}
                              className="text-[#fbb725] md:size-3"
                            />
                            <span className="text-[9px] text-[#141414]/40 md:text-xs">
                              {related.time}
                            </span>
                          </div>
                          <span className="text-[8px] font-bold tracking-widest text-[#fbb725] uppercase md:text-[9px]">
                            Ver receita
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ElementReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CALL TO ACTION - COMPARTILHE SUA RECEITA */}
      <section className="bg-[#fbb725] py-12 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center md:px-8">
          <ElementReveal>
            <ChefHat
              size={32}
              className="mx-auto mb-4 text-[#141414] md:mb-6 md:size-12"
            />
            <h2 className="font-bitter mb-3 text-2xl font-light text-[#141414] md:mb-4 md:text-4xl lg:text-5xl">
              Tem uma receita com produtos <br className="hidden sm:block" />
              <span className="font-black">ROCERIA</span>?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed font-light text-[#141414]/70 md:mb-8 md:text-base">
              Compartilhe sua criação e apareça aqui! Use #RoceriaNaCozinha e
              marque @roceriaoficial.
            </p>
            <button className="group inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-[8px] font-black tracking-widest text-white uppercase transition-all hover:bg-white hover:text-[#141414] md:gap-3 md:px-10 md:py-5 md:text-[9px]">
              Enviar minha receita
              <ArrowRight
                size={10}
                className="transition-transform group-hover:translate-x-1 md:size-3"
              />
            </button>
          </ElementReveal>
        </div>
      </section>
    </main>
  );
}
