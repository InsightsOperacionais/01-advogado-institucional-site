import type { Attribute, Product, ProductCategory } from "./shop-entities";

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
  categoryId?: string | null;
  categorySlug?: string | null;
  collectionSlug?: string | null;
  minPrice?: number;
  maxPrice?: number;
  attributes?: string[];
  selectedAttributes?: SelectedAttribute[];
  search?: string;
  page?: number;
  limit?: number;
  sort?: SortOption;
  artesanal?: boolean;
  destaque?: boolean;
  inStock?: boolean;
  enabled?: boolean;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CategoryTreeResponse {
  tree: ProductCategory[];
  count: number;
}

export interface AttributesResponse {
  attributes: Attribute[];
  count: number;
}
