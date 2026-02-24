"use client";

import { ElementReveal } from "@/components/layout/element-reveal";
import { RoceriaButton } from "@/components/layout/roceria-button";
import { adaptProductsToCardProducts } from "@/data/adapters/product-adapter";
import { useProducts } from "@/data/hooks/use-products";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "../../../../components/layout/product-card";

// ===== KIT_SUBSCRIPTION SECTION - Assinatura de Kits Mensais =====

export function KitSubscriptionSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<
    "mensal" | "trimestral" | "anual"
  >("trimestral");

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Buscar produtos da categoria kits com o ID correto
  const { data, isLoading, error } = useProducts({
    categoryId: "cmltqt1t80009rxb8fgvubiii", // ID correto da categoria Kits
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

  // Adaptar produtos para o formato do Card
  const kitsDisponiveis = useMemo(() => {
    const cardProducts = adaptProductsToCardProducts(allProducts);
    console.log("Kits encontrados:", cardProducts.length); // Debug
    return cardProducts;
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
      const gap = 32;
      const step = (cardWidth + gap) * (isMobile ? 1 : 5);

      carouselRef.current.scrollBy({
        left: direction === "left" ? -step : step,
        behavior: "smooth",
      });

      if (isMobile) {
        setCurrentIndex((prev) => {
          const newIndex =
            direction === "left"
              ? Math.max(prev - 1, 0)
              : Math.min(prev + 1, kitsDisponiveis.length - 1);
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
        const cardWidth = 320 + 32;
        const newIndex = Math.round(scrollLeft / cardWidth);
        setCurrentIndex(newIndex);
      }
    };

    const container = carouselRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const planos = [
    {
      id: "mensal",
      nome: "Plano Mensal",
      periodo: "mês",
      preco: 129.9,
      precoOriginal: 159.9,
      economia: "15%",
      beneficios: [
        "1 kit surpresa por mês",
        "Frete incluso para todo o Brasil",
        "Cancelamento a qualquer momento",
        "10% off em toda a loja",
      ],
    },
    {
      id: "trimestral",
      nome: "Plano Trimestral",
      periodo: "mês",
      preco: 116.6,
      precoOriginal: 159.9,
      economia: "27%",
      destaque: true,
      beneficios: [
        "Curadoria prioritária",
        "Kit bônus no 3º mês",
        "15% off em toda a loja",
        "Acesso VIP a novos lotes",
      ],
    },
    {
      id: "anual",
      nome: "Plano Anual",
      periodo: "mês",
      preco: 99.9,
      precoOriginal: 159.9,
      economia: "37%",
      beneficios: [
        "Melhor custo-benefício",
        "Caixa de madeira exclusiva",
        "20% off em toda a loja",
        "Convite para visita à fazenda",
      ],
    },
  ];

  const beneficiosCards = [
    {
      Icon: Truck,
      title: "Entrega Segura",
      desc: "Logística especializada para manter a frescura dos queijos e embutidos até sua mesa.",
    },
    {
      Icon: ShieldCheck,
      title: "Sem Fidelidade",
      desc: "Altere seu plano ou pause sua assinatura quando precisar, sem burocracias ou letras miúdas.",
    },
    {
      Icon: Star,
      title: "Safra Selecionada",
      desc: "Você recebe produtos que não estão no catálogo comum, vindo direto de lotes limitados.",
    },
  ];

  if (error) {
    console.error("Erro ao carregar kits:", error);
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden">
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#fbb725]/70 to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-[#fbb725]/5 blur-[120px]" />

      <div className="container mx-auto">
        {/* HEADER */}
        <div className="mt-12 mb-12 grid grid-cols-1 gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <ElementReveal>
              <span className="text-[10px] font-black tracking-[0.5em] text-[#fbb725] uppercase">
                Clube de Experiências
              </span>
            </ElementReveal>

            <h2 className="font-bitter text-4xl leading-none font-light text-[#141414] lg:text-7xl">
              A roça na sua porta
              <br />
              <span className="font-black text-[#fbb725]">todo santo mês.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <ElementReveal delay={0.2}>
              <p className="text-base leading-relaxed font-light text-[#141414]/60">
                Assine e receba uma curadoria artesanal que respeita o tempo da
                terra e o saber das famílias produtoras.
              </p>
            </ElementReveal>
          </div>
        </div>

        {/* CARDS DE BENEFÍCIOS ULTRA-MINIMALISTAS */}
        <div className="container mx-auto mb-12">
          <div className="flex items-center justify-between">
            {beneficiosCards.map((item, i) => (
              <div
                key={i}
                className="group relative flex flex-1 flex-col items-center px-2 text-center"
              >
                {/* Ícone sutil */}
                <div className="mb-2 text-[#fbb725]">
                  <item.Icon size={18} strokeWidth={1.2} />
                </div>

                {/* Título compacto - Ajustado para não quebrar linha bruscamente */}
                <h4 className="text-[9px] font-bold tracking-wider text-[#141414] uppercase lg:text-xs">
                  {item.title}
                </h4>

                {/* Descrição (Somente Desktop para manter o mobile limpo) */}
                <p className="mt-1 hidden max-w-[150px] text-[10px] leading-tight font-light text-[#141414]/40 lg:block">
                  {item.desc}
                </p>

                {/* Divisor vertical entre os itens */}
                {i < beneficiosCards.length - 1 && (
                  <div className="absolute top-1/2 right-0 h-4 w-px -translate-y-1/2 bg-[#141414]/10" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* GRID DE PLANOS */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3 lg:items-center">
          {planos.map((plano, index) => (
            <ElementReveal
              key={plano.id}
              delay={0.3 + index * 0.1}
              className="h-full"
            >
              <div
                className={cn(
                  "group relative mb-1 flex h-full flex-col overflow-hidden rounded-3xl bg-white p-8 transition-all duration-500 lg:p-10",
                  plano.destaque
                    ? "border-2 border-[#fbb725] shadow-[0_40px_80px_-20px_rgba(251,183,37,0.15)] lg:py-16"
                    : "border border-[#141414]/5 shadow-sm hover:border-[#fbb725]/20 hover:shadow-xl",
                )}
              >
                {plano.destaque && (
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 rounded-full bg-[#141414] px-4 py-1.5 text-[8px] font-black tracking-widest whitespace-nowrap text-[#fbb725] uppercase">
                    Recomendação da Casa
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="font-bitter text-xl font-medium text-[#141414] lg:text-2xl">
                    {plano.nome}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1 lg:mt-6">
                    <span className="text-xs font-light text-[#141414]/40 italic lg:text-sm">
                      R$
                    </span>
                    <span className="font-bitter text-4xl font-bold tracking-tighter text-[#141414] lg:text-5xl">
                      {plano.preco.toFixed(2).split(".")[0]}
                    </span>
                    <span className="text-lg font-medium text-[#141414] lg:text-xl">
                      ,{plano.preco.toFixed(2).split(".")[1]}
                    </span>
                    <span className="ml-1 text-[10px] font-light tracking-widest text-[#141414]/40 uppercase lg:ml-2 lg:text-xs">
                      /{plano.periodo}
                    </span>
                  </div>
                  <div className="mt-3 inline-flex rounded-full bg-[#fbb725]/10 px-2 py-1 text-[8px] font-bold text-[#fbb725] lg:px-3 lg:text-[10px]">
                    Economia de {plano.economia}
                  </div>
                </div>

                <ul className="mb-8 flex-1 space-y-3 border-t border-[#141414]/5 pt-6 lg:mb-10 lg:space-y-4 lg:pt-8">
                  {plano.beneficios.map((beneficio, i) => (
                    <li key={i} className="flex items-start gap-2 lg:gap-3">
                      <div className="mt-1 flex size-3 shrink-0 items-center justify-center rounded-full bg-[#fbb725]/20 lg:size-4">
                        <Check
                          size={8}
                          className="text-[#fbb725] lg:size-[10px]"
                          strokeWidth={4}
                        />
                      </div>
                      <span className="text-xs leading-tight font-light text-[#141414]/70 lg:text-sm">
                        {beneficio}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={cn(
                    "group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-full transition-all duration-500 active:scale-95 lg:h-14",
                    plano.destaque
                      ? "bg-[#141414] text-[#fbb725] hover:bg-[#fbb725] hover:text-[#141414]"
                      : "border border-[#fbb725]/30 bg-transparent text-[#141414] hover:bg-[#141414] hover:text-[#fbb725]",
                  )}
                >
                  <span className="z-10 text-[9px] font-black tracking-[0.2em] uppercase lg:text-[10px] lg:tracking-[0.3em]">
                    Assinar Plano
                  </span>
                  <ArrowRight
                    size={12}
                    className="z-10 ml-2 transition-transform group-hover:translate-x-1 lg:size-[14px]"
                  />
                </button>
              </div>
            </ElementReveal>
          ))}
        </div>

        {/* ===== SEÇÃO "O QUE VEM NA CAIXA?" COM CARROSSEL ===== */}
        {kitsDisponiveis.length > 0 && (
          <div className="mt-12">
            <div className="container mx-auto">
              {/* Header da seção */}
              <div>
                <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
                  <div>
                    <span className="text-[8px] font-bold tracking-[0.4em] text-[#fbb725] uppercase lg:text-[10px]">
                      Curadoria Exclusiva
                    </span>
                    <h3 className="font-bitter mt-2 text-3xl font-light text-[#141414] lg:text-4xl">
                      O que vem na <span className="font-bold">caixa?</span>
                    </h3>
                    <p className="mt-2 text-xs font-light text-[#141414]/40 lg:text-sm">
                      Conheça os kits que fazem parte das nossas assinaturas
                    </p>
                  </div>

                  {/* Controles Desktop */}
                  <div className="hidden items-center gap-3 lg:flex">
                    <RoceriaButton
                      variant="carousel-control"
                      size="icon"
                      onClick={() => scroll("left")}
                      aria-label="Voltar kits"
                    >
                      <ChevronLeft size={20} />
                    </RoceriaButton>

                    <RoceriaButton
                      variant="carousel-control"
                      size="icon"
                      onClick={() => scroll("right")}
                      aria-label="Avançar kits"
                    >
                      <ChevronRight size={20} />
                    </RoceriaButton>
                  </div>
                </div>
                {/* Link para ver todos os kits */}
                <div className="mb-8 flex w-full justify-end">
                  <Link
                    href="/shop?categoria=kits"
                    className="group flex items-center gap-4 text-[9px] font-black tracking-[0.3em] text-[#141414]/40 uppercase transition-colors hover:text-[#fbb725]"
                  >
                    Ver todos os kits
                    <span className="h-px w-12 bg-[#fbb725]/30 transition-all group-hover:w-20 group-hover:bg-[#fbb725]" />
                  </Link>
                </div>
              </div>

              {/* Container do Carrossel de Kits */}
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
                      {kitsDisponiveis.map((kit, index) => (
                        <div
                          key={kit.id}
                          className={cn(
                            "relative shrink-0 snap-center",
                            isMobile
                              ? "w-full first:ml-4 last:mr-4"
                              : "w-70 lg:w-70",
                          )}
                          onClick={() => handleProductClick(kit.id)}
                        >
                          <ElementReveal
                            delay={index * 0.02}
                            distance={10}
                            width="full"
                          >
                            <div className={cn("mx-auto", isMobile ? "" : "")}>
                              <Card
                                id={kit.id}
                                nome={kit.nome}
                                descricao={kit.descricao}
                                conteudo={kit.conteudo || ""}
                                preco={kit.preco}
                                imagem={kit.imagem}
                                categoria={kit.categoria}
                                subcategoria={kit.subcategoria}
                                formato={kit.formato}
                                tamanho={kit.tamanho}
                                ingredientes={kit.ingredientes}
                                artesanal={kit.artesanal}
                                defumado={kit.defumado}
                                producaoFamiliar={kit.producaoFamiliar}
                                destaque={kit.destaque}
                                rating={kit.rating}
                                reviews={kit.reviews}
                                favorito={favoritos.includes(kit.id)}
                                onFavorito={(e: React.MouseEvent) => {
                                  e.stopPropagation();
                                  toggleFavorito(kit.id);
                                }}
                              />
                            </div>
                          </ElementReveal>
                        </div>
                      ))}
                    </div>

                    {/* CONTROLES MOBILE */}
                    {isMobile && !isLoading && kitsDisponiveis.length > 0 && (
                      <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center gap-2">
                          {kitsDisponiveis.map((_, i) => (
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
                              aria-label={`Ir para kit ${i + 1}`}
                            />
                          ))}
                        </div>

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
                            {currentIndex + 1} / {kitsDisponiveis.length}
                          </span>

                          <RoceriaButton
                            variant="carousel-control"
                            size="icon"
                            onClick={() => scroll("right")}
                            disabled={
                              currentIndex === kitsDisponiveis.length - 1
                            }
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

              {/* Selos de qualidade dos kits (fora do carrossel) */}
              {/* <div className="mt-6 hidden grid-cols-2 gap-4 lg:grid lg:grid-cols-4">
                {[
                  {
                    label: "Seleção Artesanal",
                    desc: "Produtos escolhidos a dedo",
                  },
                  { label: "Entrega Programada", desc: "Receba todo mês" },
                  { label: "Edição Limitada", desc: "Lotes exclusivos" },
                  { label: "Frete Incluso", desc: "Em todo Brasil" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center"
                  >
                    <span className="text-[8px] font-black tracking-[0.2em] text-[#fbb725] uppercase lg:text-[9px]">
                      {item.label}
                    </span>
                    <span className="mt-1 text-[9px] font-light text-[#141414]/40 lg:text-[10px]">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
