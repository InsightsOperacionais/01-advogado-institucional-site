// components/layout/io-drawer/mounteds/filter-drawer.tsx
"use client";

import { DEFAULT_FILTERS } from "@/data/utils/constants";
import { cn } from "@/lib/utils";
import { useRegisterDrawer } from "@/providers/drawer-context";
import {
  ArrowRight,
  Award,
  Clock,
  DollarSign,
  Flame,
  Heart,
  SlidersHorizontal,
  Tag,
  Wheat,
  X,
} from "lucide-react";
import {
  IoDrawerButton,
  IoDrawerContentSection,
  IoDrawerFooter,
} from "../io-drawer";

// ===== CONFIGURAÇÃO DO DRAWER =====
const DRAWER_ID = "filters";
const DRAWER_TITLE = "Filtros";
const DRAWER_THEME = "light";
const DRAWER_DIRECTION = "right";

// ===== CONTEÚDO DO DRAWER =====
export interface FilterDrawerContentProps {
  // Estados de filtro
  ordenacao: string;
  setOrdenacao: (value: string) => void;
  categoriaSelecionada: string;
  setCategoriaSelecionada: (value: string) => void;
  precoMin: number;
  setPrecoMin: (value: number) => void;
  precoMax: number;
  setPrecoMax: (value: number) => void;
  apenasDestaques: boolean;
  setApenasDestaques: (value: boolean) => void;
  apenasArtesanal: boolean;
  setApenasArtesanal: (value: boolean) => void;
  apenasDefumado: boolean;
  setApenasDefumado: (value: boolean) => void;
  apenasFavoritos: boolean;
  setApenasFavoritos: (value: boolean) => void;

  // Dados
  CATEGORIAS: Array<{ id: string; nome: string }>;
  ORDENACAO: Array<{ id: string; nome: string }>;
  totalProdutos: number;

  // Funções
  limparFiltros: () => void;
  onClose?: () => void;
  theme?: "light" | "dark";
}

function FilterDrawerContent(props: FilterDrawerContentProps) {
  const {
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
    ORDENACAO,
    totalProdutos,
    limparFiltros,
    onClose,
    theme = "light",
  } = props;

  const isDark = theme === "dark";

  // Verificar se há filtros ativos
  const hasActiveFilters =
    categoriaSelecionada !== "todos" ||
    precoMin > DEFAULT_FILTERS.minPrice ||
    precoMax < DEFAULT_FILTERS.maxPrice ||
    apenasDestaques ||
    apenasArtesanal ||
    apenasDefumado ||
    apenasFavoritos;

  return (
    <div
      className={cn(
        "flex h-full flex-col",
        isDark ? "text-[#f1f1f1]" : "text-[#141414]",
      )}
    >
      {/* Header interno com botão limpar filtros */}
      <div
        className={cn(
          "flex items-center justify-between border-b px-6 py-4",
          isDark ? "border-[#fbb725]/10" : "border-[#fbb725]/10",
        )}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#fbb725]" />
          <h2 className="font-bitter text-lg font-light">Filtros</h2>
        </div>

        {/* Botão limpar todos os filtros (só aparece se houver filtros ativos) */}
        {hasActiveFilters && (
          <button
            onClick={limparFiltros}
            className={cn(
              "flex items-center gap-1 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors hover:text-[#fbb725]",
              isDark ? "text-[#f1f1f1]/40" : "text-[#141414]/40",
            )}
          >
            <X className="h-3 w-3" />
            Limpar todos
          </button>
        )}
      </div>

      {/* Conteúdo scrollável */}
      <IoDrawerContentSection theme={theme}>
        <div className="space-y-8 px-6 py-4">
          {/* Ordenação */}
          <div>
            <h3 className="mb-3 flex items-center gap-1 text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">
              <Clock className="h-4 w-4 text-[#fbb725]" />
              Ordenar por
            </h3>
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className={cn(
                "w-full border-0 border-b bg-transparent py-2 text-sm focus:border-[#fbb725] focus:ring-0 focus:outline-none",
                isDark
                  ? "border-[#fbb725]/20 text-[#f1f1f1]"
                  : "border-[#fbb725]/20 text-[#141414]",
              )}
            >
              {ORDENACAO.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="mb-3 flex items-center gap-1 text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">
              <Tag className="h-4 w-4 text-[#fbb725]" />
              Categorias
            </h3>
            <div className="space-y-2">
              {CATEGORIAS.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaSelecionada(cat.id)}
                  className={cn(
                    "block w-full text-left text-sm transition-colors",
                    categoriaSelecionada === cat.id
                      ? "font-medium text-[#fbb725]"
                      : isDark
                        ? "text-[#f1f1f1]/60 hover:text-[#f1f1f1]"
                        : "text-[#141414]/60 hover:text-[#141414]",
                  )}
                >
                  {cat.nome}
                </button>
              ))}
            </div>
          </div>

          {/* Faixa de preço */}
          <div>
            <h3 className="mb-3 flex items-center gap-1 text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">
              <DollarSign className="h-4 w-4 text-[#fbb725]" />
              Faixa de preço
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={precoMin}
                  onChange={(e) => setPrecoMin(Number(e.target.value))}
                  min={DEFAULT_FILTERS.minPrice}
                  className={cn(
                    "w-full border-0 border-b bg-transparent py-2 text-sm placeholder:opacity-30 focus:border-[#fbb725] focus:ring-0 focus:outline-none",
                    isDark
                      ? "border-[#fbb725]/20 text-[#f1f1f1]"
                      : "border-[#fbb725]/20 text-[#141414]",
                  )}
                />
                <span className="text-[#fbb725]">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={precoMax}
                  onChange={(e) => setPrecoMax(Number(e.target.value))}
                  max={DEFAULT_FILTERS.maxPrice}
                  className={cn(
                    "w-full border-0 border-b bg-transparent py-2 text-sm placeholder:opacity-30 focus:border-[#fbb725] focus:ring-0 focus:outline-none",
                    isDark
                      ? "border-[#fbb725]/20 text-[#f1f1f1]"
                      : "border-[#fbb725]/20 text-[#141414]",
                  )}
                />
              </div>
              <input
                type="range"
                min={DEFAULT_FILTERS.minPrice}
                max={DEFAULT_FILTERS.maxPrice}
                value={precoMax}
                onChange={(e) => setPrecoMax(Number(e.target.value))}
                className="h-0.5 w-full bg-[#fbb725]/20 accent-[#fbb725]"
              />
            </div>
          </div>

          {/* Selos de Qualidade */}
          <div>
            <h3 className="mb-3 flex items-center gap-1 text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">
              <Award className="h-4 w-4 text-[#fbb725]" />
              Qualidade
            </h3>
            <div className="space-y-2">
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-2 text-sm transition-colors",
                  isDark
                    ? "text-[#f1f1f1]/70 hover:text-[#f1f1f1]"
                    : "text-[#141414]/70 hover:text-[#141414]",
                )}
              >
                <input
                  type="checkbox"
                  checked={apenasDestaques}
                  onChange={(e) => setApenasDestaques(e.target.checked)}
                  className="h-4 w-4 rounded border-[#fbb725]/30 text-[#fbb725] focus:ring-[#fbb725]"
                />
                <span className="flex items-center gap-1">
                  <Award className="h-3 w-3 text-[#fbb725]" />
                  Destaques da Roça
                </span>
              </label>
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-2 text-sm transition-colors",
                  isDark
                    ? "text-[#f1f1f1]/70 hover:text-[#f1f1f1]"
                    : "text-[#141414]/70 hover:text-[#141414]",
                )}
              >
                <input
                  type="checkbox"
                  checked={apenasArtesanal}
                  onChange={(e) => setApenasArtesanal(e.target.checked)}
                  className="h-4 w-4 rounded border-[#fbb725]/30 text-[#fbb725] focus:ring-[#fbb725]"
                />
                <span className="flex items-center gap-1">
                  <Wheat className="h-3 w-3 text-[#fbb725]" />
                  Produção Artesanal
                </span>
              </label>
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-2 text-sm transition-colors",
                  isDark
                    ? "text-[#f1f1f1]/70 hover:text-[#f1f1f1]"
                    : "text-[#141414]/70 hover:text-[#141414]",
                )}
              >
                <input
                  type="checkbox"
                  checked={apenasDefumado}
                  onChange={(e) => setApenasDefumado(e.target.checked)}
                  className="h-4 w-4 rounded border-[#fbb725]/30 text-[#fbb725] focus:ring-[#fbb725]"
                />
                <span className="flex items-center gap-1">
                  <Flame className="h-3 w-3 text-[#fbb725]" />
                  Defumado no Fumeiro
                </span>
              </label>
            </div>
          </div>

          {/* Apenas favoritos */}
          <div>
            <label
              className={cn(
                "flex cursor-pointer items-center gap-2 text-sm transition-colors",
                isDark
                  ? "text-[#f1f1f1]/70 hover:text-[#f1f1f1]"
                  : "text-[#141414]/70 hover:text-[#141414]",
              )}
            >
              <input
                type="checkbox"
                checked={apenasFavoritos}
                onChange={(e) => setApenasFavoritos(e.target.checked)}
                className="h-4 w-4 rounded border-[#fbb725]/30 text-[#fbb725] focus:ring-[#fbb725]"
              />
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3 text-[#fbb725]" />
                Apenas favoritos
              </span>
            </label>
          </div>
        </div>
      </IoDrawerContentSection>

      {/* Rodapé fixo com botão */}
      <IoDrawerFooter
        className={cn(
          "border-t px-6 py-4",
          isDark ? "border-[#fbb725]/10" : "border-[#fbb725]/10",
        )}
      >
        <button
          onClick={onClose}
          className="group relative w-full overflow-hidden rounded-full bg-[#141414] py-3 text-sm font-medium text-[#f1f1f1] transition-all hover:bg-[#fbb725] hover:text-[#141414]"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Ver {totalProdutos} produtos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </button>
      </IoDrawerFooter>
    </div>
  );
}

// ===== BOTÃO DO DRAWER COM AUTO-REGISTRO =====
interface FilterDrawerButtonProps {
  children?: React.ReactNode;
  className?: string;
  drawerProps: FilterDrawerContentProps; // Obrigatório para o filter
}

export function FilterDrawerButton({
  children,
  className,
  drawerProps,
}: FilterDrawerButtonProps) {
  // Registra o drawer automaticamente quando o botão é montado
  useRegisterDrawer({
    id: DRAWER_ID,
    component: FilterDrawerContent,
    title: DRAWER_TITLE,
    theme: DRAWER_THEME,
    direction: DRAWER_DIRECTION,
  });

  return (
    <IoDrawerButton
      drawerId={DRAWER_ID}
      className={className}
      drawerProps={drawerProps}
    >
      {children}
    </IoDrawerButton>
  );
}
