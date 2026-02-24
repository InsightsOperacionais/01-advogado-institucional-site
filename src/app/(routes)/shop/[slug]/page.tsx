// app/(projetos)/(routes)/shop/[slug]/page.tsx
/* eslint-disable @next/next/no-img-element */
"use client";

import { useProduct, useProducts } from "@/data/hooks/use-products";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  Check,
  ChevronRight,
  Clock,
  Flame,
  Package,
  ShoppingCart,
  Star,
  Users,
  Wheat,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

interface CardProduct {
  id: string;
  nome: string;
  imagem: string;
  preco: number;
}

function adaptProductToCardProduct(product: any): CardProduct {
  return {
    id: product.id,
    nome: product.name,
    imagem: product.images?.find((img: any) => img.role === "COVER")?.url || product.images?.[0]?.url || "/placeholder.jpg",
    preco: product.variations?.[0]?.salePrice ? parseFloat(product.variations[0].salePrice) : parseFloat(product.variations?.[0]?.price || "0"),
  };
}

export default function ProdutoDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [quantidade, setQuantidade] = useState(1);
  const [ativoTab, setAtivoTab] = useState<
    "descricao" | "ingredientes" | "produtor"
  >("descricao");

  const slug = params?.slug as string;

  // ✅ TODOS OS HOOKS NO TOP LEVEL - antes de qualquer retorno condicional
  const { data: produto, isLoading, error } = useProduct(slug);

  const { data: relatedProductsData } = useProducts({
    categoryId: produto?.categoryId,
    limit: 4,
    enabled: !!produto?.categoryId, // Só executa se tiver categoryId
  });

  // ✅ useMemo hooks - todos no top level
  const ingredientes = useMemo(() => {
    if (!produto?.attributes) return [];
    return produto.attributes
      .filter(
        (attr) =>
          attr.value?.attribute?.name?.toLowerCase() === "ingredientes" ||
          attr.value?.label?.toLowerCase().includes("ingrediente"),
      )
      .map((attr) => attr.value.label || attr.value.value);
  }, [produto]);

  const defumado = useMemo(() => {
    if (!produto?.attributes) return false;
    return (
      produto.attributes.some(
        (attr) =>
          attr.value.label?.toLowerCase().includes("defumado") ||
          attr.value.value?.toLowerCase().includes("defumado"),
      ) ||
      produto.properties?.defumado ||
      false
    );
  }, [produto]);

  const producaoFamiliar = produto?.properties?.producaoFamiliar || false;

  const semConservantes = useMemo(() => {
    if (!produto?.attributes) return false;
    return !produto.attributes.some(
      (attr) =>
        attr.value.label?.toLowerCase().includes("conservante") ||
        attr.value.value?.toLowerCase().includes("conservante"),
    );
  }, [produto]);

  const preco = useMemo(() => {
    if (!produto?.variations || produto.variations.length === 0) return null;
    return produto.variations.reduce((min, current) => {
      const currentPrice = parseFloat(current.salePrice || current.price);
      const minPrice = parseFloat(min.salePrice || min.price);
      return currentPrice < minPrice ? current : min;
    }, produto.variations[0]);
  }, [produto]);

  const precoFormatado = preco ? parseFloat(preco.salePrice || preco.price) : 0;
  const tamanho = produto?.properties?.tamanho || "";
  const formato = produto?.properties?.formato || "Embalagem tradicional";

  const relatedProducts = useMemo(() => {
    if (!relatedProductsData?.pages) return [];
    const allProducts = relatedProductsData.pages.flatMap((page) => {
      if (Array.isArray(page)) return page;
      if (page && "products" in page) return page.products;
      return [];
    });
    return allProducts
      .filter((p) => p.id !== produto?.id)
      .slice(0, 4)
      .map(adaptProductToCardProduct);
  }, [relatedProductsData, produto?.id]);

  // ✅ AGORA podemos ter retornos condicionais
  const handleBack = () => {
    startTransition(() => {
      router.back();
    });
  };

  if (isPending || isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f1f1f1]">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#fbb725] border-t-transparent"></div>
      </div>
    );
  }

  if (error || !produto) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f1f1f1]">
        <h2 className="font-bitter text-2xl text-[#141414]">
          Produto não encontrado
        </h2>
        <button
          onClick={handleBack}
          className="mt-4 rounded-full bg-[#141414] px-6 py-2 text-sm text-[#f1f1f1] hover:bg-[#fbb725] hover:text-[#141414]"
        >
          Voltar
        </button>
      </div>
    );
  }

  const corCategoria = produto.category?.name || "";
  const corCategoriaBg =
    corCategoria.toLowerCase().includes("queijo") ||
    corCategoria.toLowerCase().includes("tempero") ||
    corCategoria.toLowerCase().includes("kit")
      ? "#fbb725"
      : "#141414";

  const isDark = corCategoriaBg === "#141414";

  return (
    <div className="min-h-screen bg-[#f1f1f1]">
      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-8 pt-2 lg:py-12">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-[#141414] transition-colors hover:text-[#fbb725]"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Imagem do produto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-lg">
              <img
                src={
                  produto.images?.find((img) => img.role === "COVER")?.url ||
                  produto.images?.[0]?.url ||
                  "/placeholder.jpg"
                }
                alt={produto.name}
                className="h-full w-full object-cover"
              />

              {/* Selos sobrepostos */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {produto.properties?.label?.sale?.state && (
                  <span className="flex items-center gap-1 rounded-full bg-[#fbb725] px-3 py-1.5 text-[10px] font-bold text-[#141414] uppercase shadow-lg">
                    <Award className="h-3 w-3" />
                    Destaque
                  </span>
                )}
                {produto.properties?.artesanal && (
                  <span className="flex items-center gap-1 rounded-full bg-[#141414] px-3 py-1.5 text-[10px] font-bold text-[#f1f1f1] uppercase shadow-lg">
                    <Wheat className="h-3 w-3" />
                    Artesanal
                  </span>
                )}
              </div>

              {/* Categoria */}
              <div
                className="absolute right-4 bottom-4 rounded-full px-4 py-2 text-xs font-bold uppercase shadow-lg"
                style={{
                  backgroundColor: corCategoriaBg,
                  color: isDark ? "#f1f1f1" : "#141414",
                }}
              >
                {produto.category?.name || "Produto"}
              </div>
            </div>
          </motion.div>

          {/* Informações do produto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            {/* Breadcrumb */}
            <div className="mb-4 flex items-center gap-2 text-xs text-[#141414]/40">
              <Link href="/shop" className="hover:text-[#fbb725]">
                Produtos
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-[#141414]/60">
                {produto.category?.name || "Categoria"}
              </span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-[#fbb725]">{produto.name}</span>
            </div>

            {/* Nome e avaliação */}
            <h1 className="font-bitter text-3xl font-light text-[#141414] lg:text-4xl">
              {produto.name}
            </h1>

            {/* Nota - ainda não temos rating no modelo, podemos adicionar depois */}
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4 text-[#141414]/20")} />
                ))}
              </div>
              <span className="text-sm text-[#141414]/60">(0 avaliações)</span>
            </div>

            {/* Preço */}
            <div className="mt-6">
              <span className="font-bitter text-3xl font-bold text-[#141414]">
                R$ {precoFormatado.toFixed(2)}
              </span>
              {tamanho && (
                <span className="ml-2 text-sm text-[#141414]/40">
                  / {tamanho}
                </span>
              )}
            </div>

            {/* Selos de qualidade em grid */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {produto.properties?.artesanal && (
                <div className="flex items-center gap-2 rounded-lg border border-[#fbb725]/10 bg-white p-3">
                  <Wheat className="h-5 w-5 text-[#fbb725]" />
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-[#141414]/40 uppercase">
                      Produção
                    </p>
                    <p className="text-sm font-medium text-[#141414]">
                      Artesanal
                    </p>
                  </div>
                </div>
              )}
              {defumado && (
                <div className="flex items-center gap-2 rounded-lg border border-[#fbb725]/10 bg-white p-3">
                  <Flame className="h-5 w-5 text-[#fbb725]" />
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-[#141414]/40 uppercase">
                      Defumação
                    </p>
                    <p className="text-sm font-medium text-[#141414]">
                      No Fumeiro
                    </p>
                  </div>
                </div>
              )}
              {producaoFamiliar && (
                <div className="flex items-center gap-2 rounded-lg border border-[#fbb725]/10 bg-white p-3">
                  <Users className="h-5 w-5 text-[#fbb725]" />
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-[#141414]/40 uppercase">
                      Família
                    </p>
                    <p className="text-sm font-medium text-[#141414]">
                      Produtora
                    </p>
                  </div>
                </div>
              )}
              {semConservantes && (
                <div className="flex items-center gap-2 rounded-lg border border-[#fbb725]/10 bg-white p-3">
                  <Check className="h-5 w-5 text-[#fbb725]" />
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-[#141414]/40 uppercase">
                      Sem
                    </p>
                    <p className="text-sm font-medium text-[#141414]">
                      Conservantes
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs de informação */}
            <div className="mt-8">
              <div className="flex border-b border-[#fbb725]/10">
                <button
                  onClick={() => setAtivoTab("descricao")}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors",
                    ativoTab === "descricao"
                      ? "border-b-2 border-[#fbb725] text-[#141414]"
                      : "text-[#141414]/40 hover:text-[#141414]",
                  )}
                >
                  Descrição
                </button>
                <button
                  onClick={() => setAtivoTab("ingredientes")}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors",
                    ativoTab === "ingredientes"
                      ? "border-b-2 border-[#fbb725] text-[#141414]"
                      : "text-[#141414]/40 hover:text-[#141414]",
                  )}
                >
                  Ingredientes
                </button>
                <button
                  onClick={() => setAtivoTab("produtor")}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors",
                    ativoTab === "produtor"
                      ? "border-b-2 border-[#fbb725] text-[#141414]"
                      : "text-[#141414]/40 hover:text-[#141414]",
                  )}
                >
                  Produtor
                </button>
              </div>

              <div className="mt-4 min-h-30">
                {ativoTab === "descricao" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm leading-relaxed text-[#141414]/70"
                    dangerouslySetInnerHTML={{
                      __html: produto.content || produto.description || "",
                    }}
                  />
                )}
                {ativoTab === "ingredientes" && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="list-inside list-disc space-y-1 text-sm text-[#141414]/70"
                  >
                    {ingredientes.length > 0 ? (
                      ingredientes.map((ing, index) => (
                        <li key={index}>{ing}</li>
                      ))
                    ) : (
                      <li>Informações não disponíveis</li>
                    )}
                  </motion.ul>
                )}
                {ativoTab === "produtor" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2 text-sm text-[#141414]/70"
                  >
                    <p>
                      <span className="font-medium text-[#141414]">
                        Produção:
                      </span>{" "}
                      {produto.properties?.artesanal
                        ? "Artesanal"
                        : "Tradicional"}
                    </p>
                    <p>
                      <span className="font-medium text-[#141414]">
                        Região:
                      </span>{" "}
                      Serra da Mantiqueira, Minas Gerais
                    </p>
                    <p>
                      <span className="font-medium text-[#141414]">
                        Tradição:
                      </span>{" "}
                      Receita passada por gerações
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Quantidade e compra */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center rounded-full border border-[#fbb725]/20 bg-white">
                <button
                  onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                  className="flex h-10 w-10 items-center justify-center text-[#141414] transition-colors hover:text-[#fbb725]"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-medium text-[#141414]">
                  {quantidade}
                </span>
                <button
                  onClick={() => setQuantidade(quantidade + 1)}
                  className="flex h-10 w-10 items-center justify-center text-[#141414] transition-colors hover:text-[#fbb725]"
                >
                  +
                </button>
              </div>

              <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-medium text-[#f1f1f1] transition-all hover:bg-[#fbb725] hover:text-[#141414]">
                <ShoppingCart className="h-4 w-4" />
                Adicionar ao Carrinho
              </button>
            </div>

            {/* Informações extras */}
            <div className="mt-6 flex items-center gap-4 text-xs text-[#141414]/40">
              <div className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                <span>{formato}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Entrega em até 7 dias</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Produtos relacionados */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-20"
          >
            <h2 className="font-bitter mb-8 text-2xl font-light text-[#141414]">
              Você também pode gostar
            </h2>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((relacionado) => (
                <Link
                  key={relacionado.id}
                  href={`/shop/${relacionado.id}`}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-md transition-all group-hover:shadow-lg">
                    <img
                      src={relacionado.imagem}
                      alt={relacionado.nome}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-[#141414] to-transparent p-4">
                      <h3 className="line-clamp-1 text-sm font-medium text-white">
                        {relacionado.nome}
                      </h3>
                      <p className="text-xs text-[#fbb725]">
                        R$ {relacionado.preco.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
