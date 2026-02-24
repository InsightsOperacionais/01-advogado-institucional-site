// /data/utils/constants.ts

// Configurações de paginação e filtros padrão
export const DEFAULT_FILTERS = {
  page: 1,
  limit: 12,
  minPrice: 0,
  maxPrice: 200,
};

// Opções de ordenação
export const SORT_OPTIONS = [
  { id: "relevancia", nome: "Mais Relevantes" },
  { id: "menor_preco", nome: "Menor Preço" },
  { id: "maior_preco", nome: "Maior Preço" },
  { id: "avaliacao", nome: "Melhor Avaliados" },
];

// Categoria "Todos"
export const CATEGORY_ALL = { id: "todos", nome: "Todos os produtos" };

// Endpoints da API
export const API_ENDPOINTS = {
  PRODUCTS: "/shop/products",
  PRODUCT: (id: string) => `/shop/products/${id}`,
  PRODUCT_BY_SLUG: (slug: string) => `/shop/products/slug/${slug}`,
  CATEGORIES: "/shop/categories",
  CATEGORY: (id: string) => `/shop/categories/${id}`,
  CATEGORY_BY_SLUG: (slug: string) => `/shop/categories/slug/${slug}`,
  ATTRIBUTES: "/shop/attributes",
  ATTRIBUTE: (id: string) => `/shop/attributes/${id}`,
  ATTRIBUTE_BY_SLUG: (slug: string) => `/shop/attributes/slug/${slug}`,
} as const;

// Tempos de cache (em segundos)
export const CACHE_TIMES = {
  SPECIALTIES: 300, // 5 minutos
  PRODUCTS: 300, // 5 minutos
  PRODUCT_DETAIL: 3600, // 1 hora
  CATEGORIES: 3600, // 1 hora
  ATTRIBUTES: 7200, // 2 horas
} as const;

// Status dos produtos
export const PRODUCT_STATUS = {
  PUBLISHED: "PUBLISHED",
  DRAFT: "DRAFT",
} as const;

// Tipos de produtos
export const PRODUCT_TYPES = {
  SIMPLE: "SIMPLE",
  VARIABLE: "VARIABLE",
} as const;

// Visibilidade dos produtos
export const PRODUCT_VISIBILITY = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
} as const;

// Roles das imagens
export const IMAGE_ROLES = {
  COVER: "COVER",
  HOVER: "HOVER",
  GALLERY: "GALLERY",
} as const;

// Status de estoque
export const STOCK_STATUS = {
  IN_STOCK: "IN_STOCK",
  OUT_OF_STOCK: "OUT_OF_STOCK",
} as const;

// Labels de destaque
export const PRODUCT_LABELS = {
  NEW: "new",
  SALE: "sale",
} as const;

// Faixas de preço pré-definidas para filtros
export const PRICE_RANGES = [
  { id: "ate-50", nome: "Até R$ 50", min: 0, max: 50 },
  { id: "50-100", nome: "R$ 50 a R$ 100", min: 50, max: 100 },
  { id: "100-150", nome: "R$ 100 a R$ 150", min: 100, max: 150 },
  { id: "150-200", nome: "R$ 150 a R$ 200", min: 150, max: 200 },
  { id: "acima-200", nome: "Acima de R$ 200", min: 200, max: 9999 },
] as const;

// Limites de produtos por página
export const PRODUCTS_PER_PAGE = [12, 24, 36, 48] as const;

// Mensagens de erro
export const ERROR_MESSAGES = {
  FETCH_PRODUCTS: "Erro ao carregar produtos",
  FETCH_PRODUCT: "Erro ao carregar produto",
  FETCH_CATEGORIES: "Erro ao carregar categorias",
  FETCH_ATTRIBUTES: "Erro ao carregar atributos",
  PRODUCT_NOT_FOUND: "Produto não encontrado",
  CATEGORY_NOT_FOUND: "Categoria não encontrada",
  API_CONNECTION: "Erro de conexão com a API",
  INVALID_TOKEN: "Token de API inválido ou expirado",
} as const;

// Placeholders e textos padrão
export const PLACEHOLDERS = {
  PRODUCT_IMAGE: "/images/placeholder-product.jpg",
  CATEGORY_IMAGE: "/images/placeholder-category.jpg",
  NO_DESCRIPTION: "Sem descrição disponível",
  NO_CONTENT: "Conteúdo não disponível",
  NO_IMAGE: "Imagem não disponível",
} as const;

// Configurações de SEO padrão
export const DEFAULT_SEO = {
  TITLE: "Roçaria - Produtos Artesanais",
  DESCRIPTION:
    "Descubra os melhores produtos artesanais da roça: queijos, embutidos, conservas, temperos e muito mais.",
  KEYWORDS:
    "produtos artesanais, queijo artesanal, embutidos, conservas, temperos, roça",
} as const;

// Mapeamento de slugs para nomes amigáveis
export const CATEGORY_SLUG_TO_NAME: Record<string, string> = {
  queijos: "Queijos Artesanais",
  embutidos: "Embutidos Defumados",
  conservas: "Conservas Caseiras",
  temperos: "Temperos da Roça",
  kits: "Kits e Cestas",
  "doces-e-geleias": "Doces e Geleias",
  variados: "Produtos Variados",
} as const;

// Ordem padrão das categorias na navegação
export const CATEGORY_ORDER = [
  "queijos",
  "embutidos",
  "conservas",
  "temperos",
  "doces-e-geleias",
  "kits",
  "variados",
] as const;

// Configurações de frete
export const SHIPPING = {
  FREE_SHIPPING_MIN_PRICE: 150, // Frete grátis para compras acima de R$ 150
  DEFAULT_SHIPPING_PRICE: 15, // Valor padrão do frete
} as const;
