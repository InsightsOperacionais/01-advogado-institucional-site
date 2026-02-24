// app/(projetos)/(routes)/shop/product-card.tsx
"use client";

import { cn } from "@/lib/utils";
import { useCart } from "@/providers/shop-context";
import {
  Award,
  Clock,
  Heart,
  ShoppingCart,
  Sparkles,
  Wheat,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner"; // Import do toast

interface CardProps {
  id: string;
  nome: string;
  descricao: string; // Descrição curta (vai abaixo do nome)
  conteudo: string; // Conteúdo HTML/rich text (vai no painel)
  preco: number;
  imagem: string;
  categoria: string;
  subcategoria: string;
  formato: string;
  tamanho: string;
  ingredientes: string[]; // Array de ingredientes
  artesanal?: boolean;
  defumado?: boolean;
  producaoFamiliar?: boolean;
  destaque?: boolean;
  rating?: number;
  reviews?: number;
  favorito?: boolean;
  variant?: "default" | "fit";
  onFavorito?: (e: React.MouseEvent) => void;
}

const getTipoFromCategoria = (categoria: string): string => {
  const tipos: Record<string, string> = {
    Queijos: "Maturado",
    Embutidos: "Defumado",
    Temperos: "Artesanal",
    Conservas: "Caseiro",
    "Doces e Geleias": "Caseiro",
    Kits: "Seleção",
    Variados: "Especial",
  };
  return tipos[categoria] || "Artesanal";
};

const getTempoMaturacao = (categoria: string): string => {
  const tempos: Record<string, string> = {
    Queijos: "Cura: 21-60 dias",
    Embutidos: "Defumação: 12h",
    Conservas: "Safra Atual",
    Temperos: "Moído na Hora",
    "Doces e Geleias": "Fogo de Chão",
  };
  return tempos[categoria] || "Feito à mão";
};

export function Card({
  id,
  nome,
  descricao,
  conteudo,
  preco,
  imagem,
  categoria,
  subcategoria,
  formato,
  tamanho,
  ingredientes,
  artesanal = true,
  destaque,
  rating,
  favorito = false,
  variant = "default",
  onFavorito,
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorito, setIsFavorito] = useState(favorito);

  const tipo = getTipoFromCategoria(categoria);
  const infoExtra = getTempoMaturacao(categoria);

  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que o clique no botão também navegue para a página do produto
    addItem({
      productId: id,
      id: id, // Pode ser o mesmo ID
      nome,
      preco,
      imagem,
      quantidade: 1,
      tamanho,
      subcategoria,
      categoria,
    });

    // Toast de sucesso
    toast.success("Adicionado ao carrinho!", {
      description: `${nome} foi adicionado à sua cesta.`,
      duration: 3000,
    });
  };

  // Função para limpar tags HTML do conteúdo (se necessário)
  const stripHtml = (html: string) => {
    if (typeof window === "undefined") return html;
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Versão limpa do conteúdo para exibição (remove HTML)
  const conteudoLimpo = conteudo ? stripHtml(conteudo) : "";

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-[#fbb725]/10 bg-[#141414] shadow-sm transition-all duration-500 hover:border-[#fbb725]/30 hover:shadow-md",
        variant === "fit" ? "h-full w-full" : "w-full",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* AREA DA IMAGEM */}
      <div
        className={cn(
          "relative",
          variant === "fit"
            ? "aspect-square"
            : "aspect-8/9 w-full overflow-hidden",
        )}
      >
        <Image
          src={imagem}
          alt={nome}
          fill
          className={cn(
            "object-cover transition-all duration-700 ease-in-out",
            isHovered
              ? "scale-110 opacity-60 blur-[1px]"
              : "scale-100 opacity-90",
          )}
        />

        {/* Badges Superiores */}
        <div className="pointer-events-none absolute top-4 left-4 z-30 flex flex-col gap-2">
          {artesanal && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#fbb725] px-2.5 py-1 text-[8px] font-black tracking-widest text-[#141414] uppercase shadow-sm">
              <Award className="size-3" />
              <span>Artesanal</span>
            </div>
          )}
          {destaque && (
            <div className="flex items-center gap-1.5 rounded-full border border-[#fbb725]/20 bg-[#141414]/60 px-2.5 py-1 text-[8px] font-black tracking-widest text-[#fbb725] uppercase shadow-sm backdrop-blur-md">
              <Sparkles className="size-3" />
              <span>Destaque</span>
            </div>
          )}
        </div>

        {/* Botão Favorito */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorito(!isFavorito);
            onFavorito?.(e);
          }}
          className="absolute top-4 right-4 z-30 flex size-10 items-center justify-center rounded-full border border-[#fbb725]/30 bg-[#141414]/80 text-[#fbb725] shadow-sm backdrop-blur-md transition-all hover:bg-[#fbb725] hover:text-[#141414]"
        >
          <Heart
            className={cn(
              "size-4 transition-transform",
              isFavorito && "scale-110 fill-current",
            )}
          />
        </button>

        {/* PAINEL DESLIZANTE - AGORA COM CONTENT */}
        <div
          className={cn(
            "absolute right-0 bottom-0 left-0 z-20 flex flex-col justify-end bg-gradient-to-t from-[#141414] via-[#141414]/90 to-transparent p-5 pt-12 backdrop-blur-[2px] transition-all duration-500 ease-in-out",
            isHovered
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-[60%] opacity-0",
          )}
        >
          <div
            className={cn(
              "flex flex-col gap-4 transition-all delay-100 duration-500",
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
          >
            {/* CONTEÚDO (RICO) NO PAINEL */}
            {variant !== "fit" && conteudoLimpo && (
              <p className="line-clamp-3 text-xs leading-relaxed font-light text-[#f1f1f1]/80">
                {conteudoLimpo}
              </p>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#fbb725] uppercase">
                <Clock className="size-3" />
                {infoExtra}
              </div>

              {/* INGREDIENTES - Agora sempre visível no painel */}
              {ingredientes && ingredientes.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {ingredientes.slice(0, 4).map((ing, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-[#f1f1f1]/10 px-2 py-0.5 text-[8px] text-[#f1f1f1]/50 uppercase"
                    >
                      {ing}
                    </span>
                  ))}
                  {ingredientes.length > 4 && (
                    <span className="text-[8px] text-[#f1f1f1]/30">
                      +{ingredientes.length - 4}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex h-10 flex-1 items-center justify-center gap-3 rounded-full border border-[#fbb725]/30 bg-[#141414]/90 px-4 text-[9px] font-bold tracking-[0.2em] text-[#fbb725] uppercase backdrop-blur-md transition-colors hover:bg-[#fbb725] hover:text-[#141414] active:scale-95"
              >
                <ShoppingCart size={14} />
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RODAPÉ ESTÁTICO */}
      <div className="relative z-30 flex flex-col justify-between border-t border-[#fbb725]/5 bg-[#141414] p-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[8px] font-bold tracking-widest text-[#f1f1f1]/40 uppercase">
              <span className="text-[#fbb725]/80">{tipo}</span>
              <span className="h-0.5 w-0.5 rounded-full bg-[#fbb725]/30" />
              <span className="line-clamp-1">{subcategoria}</span>
            </div>
            {rating && (
              <div className="flex items-center gap-0.5 text-[9px] font-bold text-[#fbb725]">
                <span>★</span>
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-2 overflow-hidden">
              {/* NOME DO PRODUTO */}
              <h3 className="font-bitter line-clamp-2 text-sm font-medium tracking-tight text-[#f1f1f1] lg:text-base">
                {nome}
              </h3>

              {/* DESCRIÇÃO CURTA - SÓ APARECE NO MODO DEFAULT */}
              {variant === "default" && descricao && (
                <p className="line-clamp-2 text-[10px] leading-relaxed text-[#f1f1f1]/60">
                  {descricao}
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1">
              <div className="flex items-center gap-1.5 text-[9px] tracking-tighter text-[#f1f1f1]/30 uppercase">
                <Wheat className="size-2.5 text-[#fbb725]/40" />
                <span className="line-clamp-1">{tamanho}</span>
              </div>
              <span className="font-bitter text-sm font-bold whitespace-nowrap text-[#fbb725] lining-nums lg:text-base">
                R$ {preco.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
