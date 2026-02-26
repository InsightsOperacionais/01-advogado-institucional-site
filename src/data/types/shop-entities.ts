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

export interface ProductAttribute {
  id: string;
  productId: string;
  valueId: string;
  value: AttributeValue;
  showInFilter?: boolean;
  createdAt?: string;
  productAttributeId?: string | null;
}

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

export interface ProductVariation {
  id: string;
  sku: string;
  price: string;
  salePrice: string | null;
  stock: number;
  stockStatus: "IN_STOCK" | "OUT_OF_STOCK" | "LOW_STOCK";
  stockAlert: number | null;
  weight: number;
  width: number;
  height: number;
  depth: number;
  productId: string;
  createdAt: string;
  updatedAt: string;
  optionValues: unknown[];
  images: unknown[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  content: string;
  type: "SIMPLE" | "VARIABLE";
  status: "PUBLISHED" | "ARCHIVED";
  visibility: "PUBLIC" | "PRIVATE";
  categoryId: string | null;
  properties: {
    tags?: string[];
    label?: {
      new?: { state: boolean; value: string };
      sale?: { state: boolean; value: string };
    };
    tamanho?: string;
    artesanal?: boolean;
    minQuantity?: number;
    multiQuantity?: number;
    [key: string]: any;
  } | null;
  metaTitle: string | null;
  metaDescription: string | null;
  tags: string[];
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
  category: ProductCategory | null;
  attributes: ProductAttribute[];
  options: unknown[];
  variations: ProductVariation[];
  reviews?: unknown[];
}

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
