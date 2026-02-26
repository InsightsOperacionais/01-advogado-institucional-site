/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /data/types/shop.ts

// ============================================
// TIPOS DE IMAGENS
// ============================================

export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  role: "COVER" | "HOVER" | "GALLERY";
  order: number;
  productId?: string;
  variationId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================
// TIPOS DE ATRIBUTOS (VALORES)
// ============================================

export interface AttributeValue {
  id: string;
  value: string;
  label: string;
  attributeId: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  attribute?: {
    id: string;
    name: string;
    slug: string;
    showInFilter: boolean;
    showInProduct: boolean;
  };
}

// ============================================
// TIPOS DE ATRIBUTOS (CATEGORIAS)
// ============================================

export interface Attribute {
  id: string;
  name: string;
  slug: string;
  showInFilter: boolean;
  showInProduct: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  values: AttributeValue[];
}

export interface AttributesResponse {
  attributes: Attribute[];
  count: number;
}

export interface AttributeResponse extends Attribute {}

// ============================================
// TIPOS DE ATRIBUTOS DE PRODUTO
// ============================================

export interface ProductAttribute {
  id: string;
  productId: string;
  valueId: string;
  value: AttributeValue;
  showInFilter?: boolean;
  createdAt?: string;
  productAttributeId?: string | null;
}

// ============================================
// TIPOS DE CATEGORIAS
// ============================================

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  parentId: string | null;
  visibility: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  _count?: {
    products: number;
    children: number;
  };
  children?: ProductCategory[];
}

export interface CategoryTreeResponse {
  tree: ProductCategory[];
  count: number;
}

// ============================================
// TIPOS DE VARIAÇÕES DE PRODUTO
// ============================================

export interface ProductVariation {
  id: string;
  sku: string;
  price: string;
  salePrice: string | null;
  stock: number;
  stockStatus: "IN_STOCK" | "OUT_OF_STOCK";
  stockAlert: number | null;
  weight: number;
  width: number;
  height: number;
  depth: number;
  productId: string;
  createdAt: string;
  updatedAt: string;
  optionValues: any[];
  images: any[];
}

export interface ProductVariationSummary {
  id: string;
  sku: string;
  price: number;
  salePrice: number | null;
  stock: number;
  stockStatus: "IN_STOCK" | "OUT_OF_STOCK";
  weight: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
}

// ============================================
// TIPOS DE PRODUTOS
// ============================================

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  content: string;
  type: "SIMPLE" | "VARIABLE";
  status: "PUBLISHED" | "DRAFT";
  visibility: "PUBLIC" | "PRIVATE";
  categoryId: string;
  properties: {
    tags: string[];
    label: {
      new: { state: boolean; value: string };
      sale: { state: boolean; value: string };
    };
    tamanho?: string;
    artesanal?: boolean;
    minQuantity: number;
    multiQuantity: number;
    [key: string]: any;
  };
  metaTitle: string | null;
  metaDescription: string | null;
  tags: string[];
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
  category: ProductCategory;
  attributes: ProductAttribute[];
  options: any[];
  variations: ProductVariation[];
  reviews?: any[];
}

export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  salePrice: number | null;
  image: string;
  categoryName: string;
  categorySlug: string;
  isArtesanal: boolean;
  rating: number;
  reviewCount: number;
  tamanho?: string;
  attributes?: ProductAttribute[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

// ============================================
// TIPOS PARA CARD DE PRODUTO (ADAPTADO)
// ============================================

export interface CardProduct {
  id: string;
  nome: string;
  descricao: string;
  conteudo?: string;
  preco: number;
  imagem: string;
  categoria: string;
  subcategoria: string;
  formato: string;
  tamanho: string;
  ingredientes: string[];
  artesanal: boolean;
  defumado: boolean;
  producaoFamiliar: boolean;
  destaque: boolean;
  rating: number;
  reviews: number;
}

// ============================================
// TIPOS PARA FILTROS
// ============================================

export type SortOption =
  | "relevancia"
  | "menor_preco"
  | "maior_preco"
  | "avaliacao";

export interface SelectedAttribute {
  attributeId: string;
  attributeName: string;
  valueId: string;
  valueName: string;
}

export interface ProductFilters {
  categoryId?: string;
  categorySlug?: string;
  collectionSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  attributes?: string[]; // Array de IDs de valores de atributos selecionados
  selectedAttributes?: SelectedAttribute[]; // Versão mais detalhada dos atributos selecionados
  search?: string;
  page?: number;
  limit?: number;
  sort?: SortOption;
  artesanal?: boolean;
  destaque?: boolean;
  inStock?: boolean;
  enabled?: boolean;
}

// ============================================
// TIPOS PARA RESPOSTAS PAGINADAS
// ============================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// ============================================
// TIPOS PARA ESTATÍSTICAS
// ============================================

export interface ShopStats {
  totalProducts: number;
  totalCategories: number;
  totalAttributes: number;
  totalAttributeValues: number;
  productsByCategory: Record<string, number>;
  attributesByGroup: Record<string, number>;
}

// ============================================
// TIPOS PARA NAVEGAÇÃO
// ============================================

export interface CategoryMenuItem {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  productCount: number;
  children?: CategoryMenuItem[];
}

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

// ============================================
// TIPOS PARA CONFIGURAÇÃO
// ============================================

export interface ShopConfig {
  name: string;
  description: string;
  currency: string;
  freeShippingMinPrice: number;
  defaultShippingPrice: number;
  contactEmail: string;
  contactPhone: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

// ============================================
// TIPOS PARA REVIEWS/AVALIAÇÕES
// ============================================

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title?: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductReviewsResponse {
  reviews: ProductReview[];
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

// ============================================
// TIPOS PARA CARRINHO
// ============================================

export interface CartItem {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  variationId?: string;
  sku: string;
  price: number;
  salePrice: number | null;
  quantity: number;
  image: string;
  tamanho?: string;
  maxQuantity: number;
  stock: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  itemCount: number;
}

// ============================================
// TIPOS PARA PEDIDOS
// ============================================

export interface OrderItem {
  productId: string;
  productName: string;
  variationId?: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  shippingAddress: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
    document?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// ============================================
// TYPE GUARDS (Funções de verificação de tipo)
// ============================================

export function isProduct(obj: any): obj is Product {
  return (
    obj &&
    typeof obj === "object" &&
    "id" in obj &&
    "name" in obj &&
    "slug" in obj
  );
}

export function isAttribute(obj: any): obj is Attribute {
  return (
    obj &&
    typeof obj === "object" &&
    "id" in obj &&
    "name" in obj &&
    "values" in obj
  );
}

export function isCategory(obj: any): obj is ProductCategory {
  return (
    obj &&
    typeof obj === "object" &&
    "id" in obj &&
    "name" in obj &&
    "slug" in obj
  );
}

export function isProductSummary(obj: any): obj is ProductSummary {
  return (
    obj &&
    typeof obj === "object" &&
    "id" in obj &&
    "price" in obj &&
    "image" in obj
  );
}
