"use client";

import { ElementReveal } from "@/components/layout/element-reveal";
import { RoceriaButton } from "@/components/layout/roceria-button";
import { adaptProductsToCardProducts } from "@/data/adapters/product-adapter";
import { useProducts } from "@/data/hooks/use-products";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "../../../../components/layout/product-card";

// ===== BESTSELLERS SECTION =====
export function BestsellersSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Buscar produtos com filtro de destaque
  const { data, isLoading, error } = useProducts({
    destaque: true,
    limit: 25,
  });

  // Extrair produtos das páginas
  const allProducts = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page: { products: any }) => {
      if (Array.isArray(page)) return page;
      if (page && "products" in page) return page.products;
      return [];
    });
  }, [data]);

  // Adaptar produtos e pegar exatamente 15
  const bestsellers = useMemo(() => {
    const cardProducts = adaptProductsToCardProducts(allProducts);
    return cardProducts.slice(0, 15);
  }, [allProducts]);

  const toggleFavorito = (id: string) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const handleProductClick = (id: string) => {
    router.push(`/shop/${id}`);
  };

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const cardWidth = 320;
      const gap = 32; // Gap de 2rem = 32px
      const step = (cardWidth + gap) * (isMobile ? 1 : 5); // Mobile: 1 produto, Desktop: 5 produtos

      carouselRef.current.scrollBy({
        left: direction === "left" ? -step : step,
        behavior: "smooth",
      });

      // Atualizar índice atual para mobile
      if (isMobile) {
        setCurrentIndex((prev) => {
          const newIndex =
            direction === "left"
              ? Math.max(prev - 1, 0)
              : Math.min(prev + 1, bestsellers.length - 1);
          return newIndex;
        });
      }
    }
  };

  // Sincronizar índice com scroll
  useEffect(() => {
    if (!isMobile || !carouselRef.current) return;

    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollLeft = carouselRef.current.scrollLeft;
        const cardWidth = 320 + 32; // Largura do card + gap
        const newIndex = Math.round(scrollLeft / cardWidth);
        setCurrentIndex(newIndex);
      }
    };

    const container = carouselRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  if (error) {
    return null;
  }

  return (
    <section className="relative container mx-auto w-full overflow-hidden">
      {/* HEADER */}
      <div className="container mx-auto">
        <div className="flex flex-col items-start justify-between gap-8 pb-12 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-4">
            <ElementReveal>
              <span className="text-[10px] font-bold tracking-[0.5em] text-[#fbb725] uppercase">
                Seleção da Roça
              </span>
            </ElementReveal>

            <h2 className="font-bitter text-4xl leading-none font-light text-[#141414] lg:text-7xl">
              <ElementReveal delay={0.1}>
                Favoritos da{" "}
                <span className="font-black text-[#fbb725]">família</span>
              </ElementReveal>
            </h2>
          </div>

          {/* Controles com RoceriaButton - Desktop */}
          <div className="hidden items-center gap-3 lg:flex">
            <RoceriaButton
              variant="carousel-control"
              size="icon"
              onClick={() => scroll("left")}
              aria-label="Voltar produtos"
            >
              <ChevronLeft size={20} />
            </RoceriaButton>

            <RoceriaButton
              variant="carousel-control"
              size="icon"
              onClick={() => scroll("right")}
              aria-label="Avançar produtos"
            >
              <ChevronRight size={20} />
            </RoceriaButton>
          </div>
        </div>

        {/* Link para Loja Completa - Acima dos cards */}
        <div
          className={cn(
            "mx-auto mb-8",
            isMobile
              ? "flex justify-center" // Mobile: centralizado
              : "flex justify-end", // Desktop: à direita
          )}
        >
          <Link
            href="/shop"
            className="group flex items-center gap-4 text-[10px] font-black tracking-[0.4em] text-[#141414]/40 uppercase transition-colors hover:text-[#fbb725]"
          >
            Ver todo o acervo artesanal
            <span className="h-px w-12 bg-[#fbb725]/30 transition-all group-hover:w-20 group-hover:bg-[#fbb725]" />
          </Link>
        </div>
      </div>

      {/* Container do Carrossel */}
      <div className="relative w-full">
        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-[#fbb725]" />
          </div>
        ) : (
          <>
            <div
              ref={carouselRef}
              className={cn(
                "scrollbar-hide flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-10",
                !isMobile && "",
              )}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                scrollSnapType: "x mandatory",
              }}
            >
              {bestsellers.map((produto, index) => (
                <div
                  key={produto.id}
                  className={cn(
                    "relative shrink-0 snap-center",
                    isMobile
                      ? "w-full first:ml-4 last:mr-4" // Mobile: largura total com margens laterais
                      : "w-70 lg:w-70",
                  )}
                  onClick={() => handleProductClick(produto.id)}
                >
                  <ElementReveal
                    delay={index * 0.02}
                    distance={10}
                    width="full"
                  >
                    <div className={cn("mx-auto", isMobile ? "" : "")}>
                      <Card
                        id={produto.id}
                        nome={produto.nome}
                        descricao={produto.descricao}
                        conteudo={produto.conteudo || ""}
                        preco={produto.preco}
                        imagem={produto.imagem}
                        categoria={produto.categoria}
                        subcategoria={produto.subcategoria}
                        formato={produto.formato}
                        tamanho={produto.tamanho}
                        ingredientes={produto.ingredientes}
                        artesanal={produto.artesanal}
                        defumado={produto.defumado}
                        producaoFamiliar={produto.producaoFamiliar}
                        destaque={produto.destaque}
                        rating={produto.rating}
                        reviews={produto.reviews}
                        favorito={favoritos.includes(produto.id)}
                        onFavorito={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          toggleFavorito(produto.id);
                        }}
                      />
                    </div>
                  </ElementReveal>
                </div>
              ))}
            </div>

            {/* CONTROLES MOBILE - Abaixo do Card */}
            {isMobile && !isLoading && bestsellers.length > 0 && (
              <div className="flex flex-col items-center gap-6">
                {/* Dots de Paginação */}
                <div className="flex items-center gap-2">
                  {bestsellers.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (carouselRef.current) {
                          const cardWidth = 320 + 32;
                          carouselRef.current.scrollTo({
                            left: i * cardWidth,
                            behavior: "smooth",
                          });
                        }
                      }}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        currentIndex === i
                          ? "w-8 bg-[#fbb725]"
                          : "w-1.5 bg-[#141414]/10 hover:bg-[#141414]/30",
                      )}
                      aria-label={`Ir para produto ${i + 1}`}
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
                    className="size-12 border-[#141414]/10 disabled:opacity-30"
                  >
                    <ChevronLeft size={20} />
                  </RoceriaButton>

                  <span className="text-[10px] font-bold tracking-widest text-[#141414]/40 uppercase">
                    {currentIndex + 1} / {bestsellers.length}
                  </span>

                  <RoceriaButton
                    variant="carousel-control"
                    size="icon"
                    onClick={() => scroll("right")}
                    disabled={currentIndex === bestsellers.length - 1}
                    className="size-12 border-[#141414]/10 disabled:opacity-30"
                  >
                    <ChevronRight size={20} />
                  </RoceriaButton>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
