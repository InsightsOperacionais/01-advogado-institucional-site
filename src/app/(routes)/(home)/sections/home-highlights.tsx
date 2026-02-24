"use client";

import { ElementReveal } from "@/components/layout/element-reveal";
import { RoceriaButton } from "@/components/layout/roceria-button";
import { adaptProductsToCardProducts } from "@/data/adapters/product-adapter";
import { useProducts } from "@/data/hooks/use-products";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "../../../../components/layout/product-card";

export function CollectionHighlightsSection() {
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { data, isLoading, error } = useProducts({ destaque: true, limit: 6 });

  const allProducts = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page: any) => page.products || page || []);
  }, [data]);

  const produtosDestaque = useMemo(() => {
    return adaptProductsToCardProducts(allProducts).slice(0, 6);
  }, [allProducts]);

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

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
          {/* Banner Lateral */}
          <div className="group relative min-h-[380px] overflow-hidden rounded-3xl lg:col-span-3 lg:min-h-full">
            <div className="relative z-10 flex h-full flex-col justify-between bg-[url('/assets/others/queijo-canastra-3.png')] bg-cover bg-center p-10">
              <div className="absolute inset-0 z-10 bg-[#141414]/40 transition-opacity group-hover:opacity-60" />
              <div className="relative z-20">
                <span className="text-[10px] font-bold tracking-[0.5em] text-[#fbb725] uppercase">
                  Produção Familiar
                </span>
                <h3 className="font-bitter mt-4 text-4xl font-light text-white lg:text-6xl">
                  DIRETO DO <br />
                  <span className="font-black text-[#fbb725]">PRODUTOR</span>
                </h3>
              </div>
              <div className="relative z-20">
                <Link
                  href="/shop/produtores"
                  className="inline-flex items-center gap-4 text-[10px] font-bold tracking-widest text-white uppercase"
                >
                  <span className="underline decoration-[#fbb725] underline-offset-8">
                    Produtos Selecionados
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
                isMobile ? "snap-x snap-mandatory overflow-x-hidden" : "",
              )}
            >
              {isLoading ? (
                <div className="h-[450px] w-full animate-pulse rounded-2xl bg-[#141414]/5" />
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
            {isMobile && !isLoading && (
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
