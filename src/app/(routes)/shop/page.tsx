// app/(projetos)/(routes)/shop/page.tsx
"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  DollarSign,
  Flame,
  Grid3x3,
  Heart,
  LayoutList,
  Search,
  SlidersHorizontal,
  Tag,
  Wheat,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { FilterDrawerButton } from "@/components/layout/io-drawer/mounteds/filter-drawer";
import { adaptProductsToCardProducts } from "@/data/adapters/product-adapter";
import { useCategories } from "@/data/hooks/use-categories";
import { useProducts } from "@/data/hooks/use-products";
import { CardProduct, ProductFilters } from "@/data/types/shop";
import { DEFAULT_FILTERS, SORT_OPTIONS } from "@/data/utils/constants";
import { Card } from "../../../components/layout/product-card";

type GridCols = 2 | 3 | 4;

// Componente FiltrosAtivos
const FiltrosAtivos = ({
  categoriaSelecionada,
  busca,
  precoMin,
  precoMax,
  apenasDestaques,
  apenasArtesanal,
  apenasDefumado,
  apenasFavoritos,
  produtosFiltrados,
  categorias,
  removerFiltro,
  limparFiltros,
}: {
  categoriaSelecionada: string;
  busca: string;
  precoMin: number;
  precoMax: number;
  apenasDestaques: boolean;
  apenasArtesanal: boolean;
  apenasDefumado: boolean;
  apenasFavoritos: boolean;
  produtosFiltrados: CardProduct[];
  categorias: Array<{ id: string; nome: string }>;
  removerFiltro: (tipo: string) => void;
  limparFiltros: () => void;
}) => {
  const filtros = [];

  if (categoriaSelecionada !== "todos") {
    const cat = categorias.find((c) => c.id === categoriaSelecionada);
    filtros.push({
      tipo: "categoria",
      label: cat?.nome || categoriaSelecionada,
      icone: <Tag className="h-3 w-3" />,
    });
  }

  if (busca) {
    filtros.push({
      tipo: "busca",
      label: `"${busca}"`,
      icone: <Search className="h-3 w-3" />,
    });
  }

  if (
    precoMin > DEFAULT_FILTERS.minPrice ||
    precoMax < DEFAULT_FILTERS.maxPrice
  ) {
    filtros.push({
      tipo: "preco",
      label: `R$ ${precoMin} - R$ ${precoMax}`,
      icone: <DollarSign className="h-3 w-3" />,
    });
  }

  if (apenasDestaques) {
    filtros.push({
      tipo: "destaques",
      label: "Destaques da Roça",
      icone: <Award className="h-3 w-3" />,
    });
  }

  if (apenasArtesanal) {
    filtros.push({
      tipo: "artesanal",
      label: "Produção Artesanal",
      icone: <Wheat className="h-3 w-3" />,
    });
  }

  if (apenasDefumado) {
    filtros.push({
      tipo: "defumado",
      label: "Defumado no Fumeiro",
      icone: <Flame className="h-3 w-3" />,
    });
  }

  if (apenasFavoritos) {
    filtros.push({
      tipo: "favoritos",
      label: "Apenas favoritos",
      icone: <Heart className="h-3 w-3" />,
    });
  }

  if (filtros.length === 0) return null;

  return (
    <div className="container mx-auto border-t border-[#141414]/10 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#fbb725]/60 uppercase">
            Filtros ativos:
          </span>
          <div className="flex flex-wrap gap-2">
            {filtros.map((filtro) => (
              <motion.div
                key={`${filtro.tipo}-${filtro.label}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group flex items-center gap-1 rounded-full border border-[#fbb725]/20 bg-[#f1f1f1] px-3 py-1.5 text-xs shadow-sm"
              >
                <span className="text-[#fbb725]">{filtro.icone}</span>
                <span className="text-[10px] font-medium text-[#141414]/80">
                  {filtro.label}
                </span>
                <button
                  onClick={() => removerFiltro(filtro.tipo)}
                  className="ml-1 rounded-full p-0.5 text-[#141414]/30 transition-colors hover:bg-[#fbb725]/10 hover:text-[#fbb725]"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            ))}

            {filtros.length > 1 && (
              <button
                onClick={limparFiltros}
                className="group flex items-center gap-1 rounded-full border border-[#fbb725]/20 bg-[#f1f1f1] px-3 py-1.5 text-[10px] text-[#141414]/40 transition-colors hover:text-[#fbb725]"
              >
                <X className="h-3 w-3" />
                Limpar todos
              </button>
            )}
          </div>
        </div>
        <div className="text-[10px] font-light text-[#141414]/40">
          <span className="font-medium text-[#fbb725]">
            {produtosFiltrados.length}
          </span>{" "}
          produtos encontrados
        </div>
      </div>
    </div>
  );
};

export default function ShopPage() {
  const router = useRouter();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todos");
  const [ordenacao, setOrdenacao] = useState("relevancia");
  const [busca, setBusca] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [gridCols, setGridCols] = useState<GridCols>(3);
  const [favoritos, setFavoritos] = useState<string[]>([]);

  // Filtros avançados
  const [precoMin, setPrecoMin] = useState(DEFAULT_FILTERS.minPrice);
  const [precoMax, setPrecoMax] = useState(DEFAULT_FILTERS.maxPrice);
  const [apenasDestaques, setApenasDestaques] = useState(false);
  const [apenasArtesanal, setApenasArtesanal] = useState(false);
  const [apenasDefumado, setApenasDefumado] = useState(false);
  const [apenasFavoritos, setApenasFavoritos] = useState(false);

  // Buscar categorias
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();
  const categories = useMemo(
    () => categoriesData?.tree || [],
    [categoriesData],
  );

  // Preparar filtros para a API
  const filters: ProductFilters = useMemo(() => {
    const f: ProductFilters = {
      limit: 12,
    };

    if (categoriaSelecionada !== "todos") {
      f.categoryId = categoriaSelecionada;
    }

    if (precoMin > DEFAULT_FILTERS.minPrice) {
      f.minPrice = precoMin;
    }

    if (precoMax < DEFAULT_FILTERS.maxPrice) {
      f.maxPrice = precoMax;
    }

    if (busca) {
      f.search = busca;
    }

    if (apenasArtesanal) {
      f.artesanal = true;
    }

    if (apenasDestaques) {
      f.destaque = true;
    }

    return f;
  }, [
    categoriaSelecionada,
    precoMin,
    precoMax,
    busca,
    apenasArtesanal,
    apenasDestaques,
  ]);

  // Buscar produtos com filtros
  const {
    data,
    isLoading: productsLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts(filters);

  // Extrair todos os produtos das páginas
  const allProducts = useMemo(() => {
    if (!data?.pages) return [];

    return data.pages.flatMap((page: { products: any }) => {
      if (Array.isArray(page)) {
        return page;
      }
      if (page && "products" in page) {
        return page.products;
      }
      return [];
    });
  }, [data]);

  // Adaptar produtos para o formato do Card
  const cardProducts = useMemo(() => {
    return adaptProductsToCardProducts(allProducts);
  }, [allProducts]);

  // Mapear categorias para o formato do filtro
  const CATEGORIAS = useMemo(() => {
    return [
      { id: "todos", nome: "Todos os produtos" },
      ...categories.map((cat: { id: any; name: any }) => ({
        id: cat.id,
        nome: cat.name,
      })),
    ];
  }, [categories]);

  const handleProductClick = (id: string) => {
    router.push(`/shop/${id}`);
  };

  // Aplicar ordenação e filtros locais adicionais
  const produtosFiltrados = useMemo(() => {
    let filtered = [...cardProducts];

    // Ordenação
    switch (ordenacao) {
      case "menor_preco":
        filtered.sort((a, b) => a.preco - b.preco);
        break;
      case "maior_preco":
        filtered.sort((a, b) => b.preco - a.preco);
        break;
      case "avaliacao":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Manter ordem da API (relevancia)
        break;
    }

    // Filtros locais (que não estão na API)
    if (apenasDefumado) {
      filtered = filtered.filter((p) => p.defumado);
    }

    if (apenasFavoritos) {
      filtered = filtered.filter((p) => favoritos.includes(p.id));
    }

    return filtered;
  }, [cardProducts, ordenacao, apenasDefumado, apenasFavoritos, favoritos]);

  const toggleFavorito = (id: string) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const limparFiltros = () => {
    setCategoriaSelecionada("todos");
    setOrdenacao("relevancia");
    setBusca("");
    setPrecoMin(DEFAULT_FILTERS.minPrice);
    setPrecoMax(DEFAULT_FILTERS.maxPrice);
    setApenasDestaques(false);
    setApenasArtesanal(false);
    setApenasDefumado(false);
    setApenasFavoritos(false);
  };

  const removerFiltro = (tipo: string) => {
    switch (tipo) {
      case "categoria":
        setCategoriaSelecionada("todos");
        break;
      case "busca":
        setBusca("");
        break;
      case "preco":
        setPrecoMin(DEFAULT_FILTERS.minPrice);
        setPrecoMax(DEFAULT_FILTERS.maxPrice);
        break;
      case "destaques":
        setApenasDestaques(false);
        break;
      case "artesanal":
        setApenasArtesanal(false);
        break;
      case "defumado":
        setApenasDefumado(false);
        break;
      case "favoritos":
        setApenasFavoritos(false);
        break;
    }
  };

  const gridColsClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  const totalFiltrosAtivos = () => {
    let count = 0;
    if (categoriaSelecionada !== "todos") count++;
    if (busca) count++;
    if (
      precoMin > DEFAULT_FILTERS.minPrice ||
      precoMax < DEFAULT_FILTERS.maxPrice
    )
      count++;
    if (apenasDestaques) count++;
    if (apenasArtesanal) count++;
    if (apenasDefumado) count++;
    if (apenasFavoritos) count++;
    return count;
  };

  const isLoading = productsLoading || categoriesLoading;

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f1f1f1]">
        <div className="text-center">
          <p className="text-lg font-light text-[#141414]/40">
            Erro ao carregar produtos
          </p>
          <button
            onClick={() => window.location.reload()}
            className="group mt-4 flex items-center gap-2 text-sm text-[#fbb725] transition-colors hover:text-[#141414]"
          >
            Tentar novamente
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f1f1]">
      {/* Hero minimalista */}
      <div className="relative overflow-hidden bg-[#141414] pt-12 pb-12">
        <div className="absolute -top-24 left-1/2 size-125 -translate-x-1/2 rounded-full bg-[#fbb725]/5 blur-[120px]" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#fbb725] uppercase">
              Curadoria Especial
            </span>
            <h1 className="font-bitter mt-4 text-5xl leading-none font-light text-[#f1f1f1] lg:text-7xl">
              Produtos
              <span className="block font-black text-[#fbb725]">da Roça</span>
            </h1>
            <p className="mt-6 max-w-md text-sm font-light text-[#f1f1f1]/60">
              Direto do produtor rural para sua casa. Preservamos receitas
              tradicionais passadas por gerações, com o cuidado de quem valoriza
              a boa comida.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#fbb725]/20 to-transparent" />
      </div>

      {/* Barra de filtros sticky */}
      <div className="sticky top-0 z-40 border-b border-[#fbb725]/10 bg-[#f1f1f1]/90 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 py-4">
            {/* Busca */}
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#fbb725]" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full border-0 border-b border-[#fbb725]/20 bg-transparent py-2 pr-4 pl-10 text-sm text-[#141414] placeholder:text-[#141414]/30 focus:border-[#fbb725] focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Controles de visualização */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "rounded p-1.5 transition-colors",
                  viewMode === "list"
                    ? "bg-[#fbb725] text-[#141414]"
                    : "text-[#141414]/30 hover:text-[#fbb725]",
                )}
              >
                <LayoutList className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "rounded p-1.5 transition-colors",
                  viewMode === "grid"
                    ? "bg-[#fbb725] text-[#141414]"
                    : "text-[#141414]/30 hover:text-[#fbb725]",
                )}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
            </div>

            {/* Seletor de colunas */}
            {viewMode === "grid" && (
              <div className="hidden items-center gap-1 sm:flex">
                {([2, 3, 4] as GridCols[]).map((cols) => (
                  <button
                    key={cols}
                    onClick={() => setGridCols(cols)}
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded text-xs transition-colors",
                      gridCols === cols
                        ? "bg-[#fbb725] font-medium text-[#141414]"
                        : "text-[#141414]/30 hover:text-[#fbb725]",
                    )}
                  >
                    {cols}
                  </button>
                ))}
              </div>
            )}

            {/* Botão Filtros usando o novo sistema unificado */}
            <FilterDrawerButton
              drawerProps={{
                ordenacao,
                setOrdenacao,
                categoriaSelecionada,
                setCategoriaSelecionada,
                precoMin,
                setPrecoMin,
                precoMax,
                setPrecoMax,
                apenasDestaques,
                setApenasDestaques,
                apenasArtesanal,
                setApenasArtesanal,
                apenasDefumado,
                setApenasDefumado,
                apenasFavoritos,
                setApenasFavoritos,
                CATEGORIAS,
                ORDENACAO: SORT_OPTIONS,
                totalProdutos: produtosFiltrados.length,
                limparFiltros,
              }}
            >
              <div className="relative">
                <button className="group flex h-10 items-center justify-center gap-2 rounded-full border border-[#fbb725]/30 bg-[#141414]/90 px-6 text-[#fbb725] backdrop-blur-md transition-colors hover:bg-[#fbb725] hover:text-[#141414]">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                    Filtros
                  </span>
                  <SlidersHorizontal size={18} />
                  {totalFiltrosAtivos() > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#fbb725] text-xs text-[#141414]">
                      {totalFiltrosAtivos()}
                    </span>
                  )}
                </button>
              </div>
            </FilterDrawerButton>
          </div>
        </div>

        {/* Filtros ativos */}
        <FiltrosAtivos
          categoriaSelecionada={categoriaSelecionada}
          busca={busca}
          precoMin={precoMin}
          precoMax={precoMax}
          apenasDestaques={apenasDestaques}
          apenasArtesanal={apenasArtesanal}
          apenasDefumado={apenasDefumado}
          apenasFavoritos={apenasFavoritos}
          produtosFiltrados={produtosFiltrados}
          categorias={CATEGORIAS}
          removerFiltro={removerFiltro}
          limparFiltros={limparFiltros}
        />
      </div>

      {/* Grid de Produtos */}
      <div className="container mx-auto px-4 py-12">
        {isLoading && produtosFiltrados.length === 0 ? (
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#fbb725]"></div>
              <p className="mt-4 text-sm text-[#141414]/60">
                Carregando produtos...
              </p>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${gridCols}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {viewMode === "grid" ? (
                <div
                  className={cn(
                    "grid gap-6 md:gap-8",
                    gridColsClasses[gridCols],
                  )}
                >
                  {produtosFiltrados.map((produto) => (
                    <motion.div
                      key={produto.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleProductClick(produto.id)}
                      className="cursor-pointer"
                    >
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
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {produtosFiltrados.map((produto) => (
                    <motion.div
                      key={produto.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => handleProductClick(produto.id)}
                      className="group cursor-pointer border-b border-[#fbb725]/10 pb-6 transition-colors hover:border-[#fbb725]/30"
                    >
                      <div className="flex gap-6">
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#fbb725]/5 sm:h-32 sm:w-32">
                          <Image
                            src={produto.imagem}
                            alt={produto.nome}
                            width={128}
                            height={128}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="font-bitter font-medium text-[#141414] transition-colors group-hover:text-[#fbb725]">
                              {produto.nome}
                            </h3>
                            <p className="mt-1 line-clamp-2 text-sm text-[#141414]/60">
                              {produto.descricao}
                            </p>
                            {produto.artesanal && (
                              <span className="mt-2 inline-block rounded-full bg-[#fbb725]/10 px-2 py-0.5 text-[8px] font-medium text-[#fbb725]">
                                Artesanal
                              </span>
                            )}
                          </div>
                          <div className="mt-2 flex items-center justify-between sm:mt-0">
                            <span className="font-bitter text-base font-light text-[#141414] sm:text-lg">
                              R$ {produto.preco.toFixed(2)}
                            </span>
                            <button
                              onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                toggleFavorito(produto.id);
                              }}
                              className={cn(
                                "flex items-center gap-1 text-xs transition-colors",
                                favoritos.includes(produto.id)
                                  ? "text-[#fbb725]"
                                  : "text-[#141414]/30 hover:text-[#fbb725]",
                              )}
                            >
                              <Heart
                                className={cn(
                                  "h-4 w-4",
                                  favoritos.includes(produto.id) &&
                                    "fill-[#fbb725]",
                                )}
                              />
                              Favorito
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Botão Carregar Mais */}
        {hasNextPage && !isLoading && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="group flex items-center gap-2 rounded-full border border-[#fbb725]/30 bg-[#141414]/90 px-8 py-3 text-[#fbb725] backdrop-blur-md transition-colors hover:bg-[#fbb725] hover:text-[#141414] disabled:opacity-50"
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase">
                {isFetchingNextPage ? "Carregando..." : "Carregar mais"}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && produtosFiltrados.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-96 flex-col items-center justify-center"
          >
            <p className="text-lg font-light text-[#141414]/40">
              Nenhum produto encontrado
            </p>
            <button
              onClick={limparFiltros}
              className="group mt-4 flex items-center gap-2 text-sm text-[#fbb725] transition-colors hover:text-[#141414]"
            >
              Limpar filtros
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
