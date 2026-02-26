"use client";

import { ElementReveal } from "@/components/layout/element-reveal";
import { RoceriaButton } from "@/components/layout/roceria-button";
import { adaptProductsToCardProducts } from "@/data/adapters/product-adapter";
import { useProducts } from "@/data/hooks/use-products";
import type { Product } from "@/data/types/shop-contracts";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "../../../../components/layout/product-card";

type CategoryGroup = {
  name: string;
  slug: string;
  products: Product[];
};

const FALLBACK_BANNER_IMAGE = "/assets/others/queijo-canastra-3.png";

export function CollectionHighlightsSection() {
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { data, isLoading, error } = useProducts({ limit: 60 });

  const allProducts = useMemo<Product[]>(() => {
    if (!data?.pages) return [];

    return data.pages.flatMap((page): Product[] => {
      if (Array.isArray(page)) {
        return page as Product[];
      }

      if (page && typeof page === "object" && "products" in page) {
        const products = (page as { products?: Product[] }).products;
        return Array.isArray(products) ? products : [];
      }

      return [];
    });
  }, [data]);

  const categoryGroups = useMemo<CategoryGroup[]>(() => {
    const groups = new Map<string, CategoryGroup>();

    allProducts.forEach((product) => {
      const categoryName = product.category?.name?.trim();
      if (!categoryName) return;

      const key = categoryName.toLowerCase();
      const existingGroup = groups.get(key);

      if (existingGroup) {
        existingGroup.products.push(product);
        return;
      }

      groups.set(key, {
        name: categoryName,
        slug: product.category?.slug ?? "",
        products: [product],
      });
    });

    return Array.from(groups.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "pt-BR"),
    );
  }, [allProducts]);

  const activeCategory = categoryGroups[currentCategoryIndex] ?? null;

  const produtosDestaque = useMemo(() => {
    if (!activeCategory) return [];
    return adaptProductsToCardProducts(activeCategory.products).slice(0, 3);
  }, [activeCategory]);

  const bannerImage = useMemo(() => {
    if (!activeCategory) return FALLBACK_BANNER_IMAGE;

    for (const product of activeCategory.products) {
      const galleryImage = product.images.find((img) => img.role === "GALLERY");
      if (galleryImage?.url) return galleryImage.url;
    }

    for (const product of activeCategory.products) {
      const coverImage = product.images.find((img) => img.role === "COVER");
      if (coverImage?.url) return coverImage.url;
    }

    return FALLBACK_BANNER_IMAGE;
  }, [activeCategory]);

  const activeCategoryShopHref = useMemo(() => {
    if (!activeCategory) return "/shop";

    const params = new URLSearchParams();
    params.set("categoria", activeCategory.slug || activeCategory.name);
    return `/shop?${params.toString()}`;
  }, [activeCategory]);

  useEffect(() => {
    if (!categoryGroups.length) {
      setCurrentCategoryIndex(0);
      return;
    }

    setCurrentCategoryIndex((prev) =>
      prev >= categoryGroups.length ? 0 : prev,
    );
  }, [categoryGroups.length]);

  useEffect(() => {
    setCurrentIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "auto" });
    }
  }, [currentCategoryIndex]);

  useEffect(() => {
    if (categoryGroups.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setCurrentCategoryIndex((prev) => (prev + 1) % categoryGroups.length);
    }, 7000);

    return () => window.clearInterval(intervalId);
  }, [categoryGroups.length]);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const clientWidth = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -clientWidth : clientWidth,
        behavior: "smooth",
      });

      const maxIndex = Math.max(produtosDestaque.length - 1, 0);
      setCurrentIndex((prev) =>
        direction === "left"
          ? Math.max(prev - 1, 0)
          : Math.min(prev + 1, maxIndex),
      );
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

  if (error) return null;

  return (
    <section className="relative w-full overflow-hidden">
      {/* HEADER */}
      <div className="container mx-auto">
        <div className="mb-12 flex w-full items-end justify-between pb-8">
          <div>
            <ElementReveal>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#fbb725] uppercase">
                Curadoria Especial
              </span>
            </ElementReveal>
            <h2 className="font-bitter text-4xl leading-none font-light text-[#141414] lg:text-7xl">
              <ElementReveal delay={0.2}>
                O melhor da <br />
                <span className="font-black text-[#fbb725]">
                  roceria para você
                </span>
              </ElementReveal>
            </h2>
          </div>

          <Link
            href="/shop"
            className="group hidden items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-[#141414]/40 uppercase transition-colors hover:text-[#fbb725] lg:flex"
          >
            Ver acervo completo
            <span className="h-px w-8 bg-[#fbb725]/30 transition-all group-hover:w-12 group-hover:bg-[#fbb725]" />
          </Link>
        </div>

        {!isLoading && categoryGroups.length > 0 && (
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
            {categoryGroups.map((category, index) => (
              <button
                key={category.slug || category.name}
                onClick={() => setCurrentCategoryIndex(index)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors",
                  index === currentCategoryIndex
                    ? "border-[#fbb725] bg-[#fbb725] text-[#141414]"
                    : "border-[#141414]/15 text-[#141414]/60 hover:border-[#fbb725]/50 hover:text-[#fbb725]",
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
          {/* Banner Lateral */}
          <div className="group relative min-h-[380px] overflow-hidden rounded-3xl lg:col-span-3 lg:min-h-full">
            <div
              className="relative z-10 flex h-full flex-col justify-between bg-cover bg-center p-10"
              style={{ backgroundImage: `url(${bannerImage})` }}
            >
              <div className="absolute inset-0 z-10 bg-[#141414]/40 transition-opacity group-hover:opacity-60" />
              <div className="relative z-20">
                <span className="text-[10px] font-bold tracking-[0.5em] text-[#fbb725] uppercase">
                  Categoria em destaque
                </span>
                <h3 className="font-bitter mt-4 text-4xl font-light text-white lg:text-6xl">
                  SABORES DE <br />
                  <span className="font-black text-[#fbb725]">
                    {activeCategory?.name || "ROCERIA"}
                  </span>
                </h3>
              </div>
              <div className="relative z-20">
                <Link
                  href={activeCategoryShopHref}
                  className="inline-flex items-center gap-4 text-[10px] font-bold tracking-widest text-white uppercase"
                >
                  <span className="underline decoration-[#fbb725] underline-offset-8">
                    Ver produtos da categoria
                  </span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Área de Produtos + Controles Mobile */}
          <div className="flex flex-col lg:col-span-3">
            <div
              ref={carouselRef}
              className={cn(
                "flex gap-4 overflow-hidden lg:grid lg:grid-cols-3",
                isMobile ? "snap-x snap-mandatory overflow-x-auto" : "",
              )}
            >
              {isLoading ? (
                <div className="h-[450px] w-full animate-pulse rounded-2xl bg-[#141414]/5" />
              ) : produtosDestaque.length === 0 ? (
                <div className="flex h-[450px] w-full items-center justify-center rounded-2xl border border-[#141414]/10 bg-[#141414]/[0.02] px-6 text-center">
                  <p className="text-sm font-light text-[#141414]/50">
                    Nenhum produto encontrado para as categorias disponíveis.
                  </p>
                </div>
              ) : (
                produtosDestaque.map((produto) => (
                  <div
                    key={produto.id}
                    className={cn(
                      "flex shrink-0 cursor-pointer",
                      isMobile ? "w-full snap-center" : "h-full",
                    )}
                    onClick={() => router.push(`/shop/${produto.id}`)}
                  >
                    <Card
                      {...produto}
                      conteudo={produto.conteudo ?? ""} // Corrigindo erro de string | undefined
                      variant="fit"
                      favorito={favoritos.includes(produto.id)}
                      onFavorito={(e) => {
                        e.stopPropagation();
                        setFavoritos((prev) =>
                          prev.includes(produto.id)
                            ? prev.filter((id) => id !== produto.id)
                            : [...prev, produto.id],
                        );
                      }}
                    />
                  </div>
                ))
              )}
            </div>

            {/* CONTROLES MOBILE - Abaixo do Card */}
            {isMobile && !isLoading && produtosDestaque.length > 0 && (
              <div className="mt-8 flex flex-col items-center gap-6">
                <div className="flex items-center gap-2">
                  {produtosDestaque.map((_, i) => (
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

                {/* Setas de Navegação */}
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
                    {currentIndex + 1} / {produtosDestaque.length}
                  </span>

                  <RoceriaButton
                    variant="carousel-control"
                    size="icon"
                    onClick={() => scroll("right")}
                    disabled={currentIndex === produtosDestaque.length - 1}
                    className="size-12 border-[#141414]/10"
                  >
                    <ChevronRight size={20} />
                  </RoceriaButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
