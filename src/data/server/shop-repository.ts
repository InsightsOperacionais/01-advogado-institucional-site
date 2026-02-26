import "server-only";

import type {
  Attribute,
  AttributesResponse,
  CategoryTreeResponse,
  Product,
  ProductAttribute,
  ProductCategory,
  ProductFilters,
  ProductImage,
  ProductVariation,
  ProductsResponse,
} from "@/data/types/shop-contracts";
import type { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/prisma-db";

const PRODUCT_INCLUDE = {
  category: {
    include: {
      _count: {
        select: {
          children: true,
          products: true,
        },
      },
    },
  },
  images: {
    orderBy: {
      order: "asc" as const,
    },
  },
  variations: {
    include: {
      images: {
        orderBy: {
          order: "asc" as const,
        },
      },
      optionValues: true,
    },
    orderBy: {
      createdAt: "asc" as const,
    },
  },
  attributes: {
    include: {
      value: {
        include: {
          attribute: true,
        },
      },
    },
  },
  options: {
    include: {
      option: {
        include: {
          values: true,
        },
      },
    },
  },
  reviews: true,
} as const;

async function findProductRows(where: Prisma.ProductWhereInput) {
  return db.product.findMany({
    where,
    include: PRODUCT_INCLUDE,
    orderBy: [
      {
        sortOrder: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
}

type ProductRow = Awaited<ReturnType<typeof findProductRows>>[number];
type CategoryRow = NonNullable<ProductRow["category"]>;
type JsonRecord = Record<string, unknown>;

function isJsonRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toIso(date: Date): string {
  return date.toISOString();
}

function normalizeProperties(value: unknown): Product["properties"] {
  if (!isJsonRecord(value)) return null;
  return value as Product["properties"];
}

function mapImage(image: {
  id: string;
  url: string;
  altText: string | null;
  role: "COVER" | "HOVER" | "GALLERY";
  order: number;
  productId: string;
  variationId: string | null;
  createdAt: Date;
  updatedAt: Date;
}): ProductImage {
  return {
    id: image.id,
    url: image.url,
    altText: image.altText ?? "",
    role: image.role,
    order: image.order,
    productId: image.productId,
    variationId: image.variationId,
    createdAt: toIso(image.createdAt),
    updatedAt: toIso(image.updatedAt),
  };
}

function mapVariation(variation: ProductRow["variations"][number]): ProductVariation {
  return {
    id: variation.id,
    sku: variation.sku ?? "",
    price: variation.price.toString(),
    salePrice: variation.salePrice ? variation.salePrice.toString() : null,
    stock: variation.stock,
    stockStatus: variation.stockStatus,
    stockAlert: variation.stockAlert,
    weight: variation.weight ?? 0,
    width: variation.width ?? 0,
    height: variation.height ?? 0,
    depth: variation.depth ?? 0,
    productId: variation.productId,
    createdAt: toIso(variation.createdAt),
    updatedAt: toIso(variation.updatedAt),
    optionValues: variation.optionValues.map((optionValue) => ({
      id: optionValue.id,
      label: optionValue.label,
      name: optionValue.name,
      optionId: optionValue.optionId,
      order: optionValue.order,
      value: optionValue.value,
    })),
    images: variation.images.map(mapImage),
  };
}

function mapCategory(category: CategoryRow): ProductCategory {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    imageUrl: category.imageUrl,
    parentId: category.parentId,
    visibility: category.visibility,
    order: category.order,
    createdAt: toIso(category.createdAt),
    updatedAt: toIso(category.updatedAt),
    _count: {
      products: category._count.products,
      children: category._count.children,
    },
    children: [],
  };
}

function mapProductAttribute(attribute: ProductRow["attributes"][number]): ProductAttribute {
  return {
    id: attribute.id,
    productId: attribute.productId,
    valueId: attribute.valueId,
    createdAt: toIso(attribute.createdAt),
    productAttributeId: attribute.productAttributeId,
    showInFilter: attribute.value.attribute.showInFilter,
    value: {
      id: attribute.value.id,
      value: attribute.value.value,
      label: attribute.value.label ?? attribute.value.value,
      attributeId: attribute.value.attributeId,
      order: attribute.value.order,
      createdAt: toIso(attribute.value.createdAt),
      updatedAt: toIso(attribute.value.updatedAt),
      attribute: {
        id: attribute.value.attribute.id,
        name: attribute.value.attribute.name,
        slug: attribute.value.attribute.slug,
        showInFilter: attribute.value.attribute.showInFilter,
        showInProduct: attribute.value.attribute.showInProduct,
      },
    },
  };
}

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    content: row.content ?? "",
    type: row.type,
    status: row.status,
    visibility: row.visibility,
    categoryId: row.categoryId,
    properties: normalizeProperties(row.properties),
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    tags: row.tags,
    sortOrder: row.sortOrder,
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
    images: row.images.map(mapImage),
    category: row.category ? mapCategory(row.category) : null,
    attributes: row.attributes.map(mapProductAttribute),
    options: row.options.map((option) => ({
      optionId: option.optionId,
      order: option.order,
      productId: option.productId,
      option: {
        id: option.option.id,
        name: option.option.name,
        order: option.option.order,
        type: option.option.type,
      },
    })),
    variations: row.variations.map(mapVariation),
    reviews: row.reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
    })),
  };
}

function getLowestVariationPrice(product: Product): number {
  if (!product.variations.length) return 0;

  return product.variations.reduce((lowest, variation) => {
    const value = Number.parseFloat(variation.salePrice ?? variation.price);
    if (Number.isNaN(value)) return lowest;
    return Math.min(lowest, value);
  }, Number.POSITIVE_INFINITY);
}

function getAverageRating(product: Product): number {
  if (!product.reviews?.length) return 0;

  const ratings = product.reviews
    .map((review) => {
      if (typeof review === "object" && review !== null && "rating" in review) {
        return Number((review as { rating: unknown }).rating);
      }
      return 0;
    })
    .filter((rating) => Number.isFinite(rating));

  if (!ratings.length) return 0;
  return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
}

function hasArtesanalFlag(product: Product): boolean {
  return Boolean(product.properties?.artesanal);
}

function hasDestaqueFlag(product: Product): boolean {
  const label = product.properties?.label;
  if (!label || typeof label !== "object") return false;

  const sale = (label as { sale?: { state?: unknown } }).sale;
  return Boolean(sale?.state);
}

function hasStock(product: Product): boolean {
  return product.variations.some(
    (variation) => variation.stock > 0 && variation.stockStatus !== "OUT_OF_STOCK",
  );
}

function matchesAttributeFilter(product: Product, valueIds: string[]): boolean {
  if (!valueIds.length) return true;

  const productValueIds = new Set(product.attributes.map((attribute) => attribute.valueId));
  return valueIds.every((valueId) => productValueIds.has(valueId));
}

function applyLocalFilters(products: Product[], filters: ProductFilters): Product[] {
  let result = [...products];

  if (typeof filters.minPrice === "number") {
    result = result.filter((product) => getLowestVariationPrice(product) >= filters.minPrice!);
  }

  if (typeof filters.maxPrice === "number") {
    result = result.filter((product) => getLowestVariationPrice(product) <= filters.maxPrice!);
  }

  if (filters.artesanal) {
    result = result.filter(hasArtesanalFlag);
  }

  if (filters.destaque) {
    result = result.filter(hasDestaqueFlag);
  }

  if (filters.inStock) {
    result = result.filter(hasStock);
  }

  if (filters.attributes?.length) {
    result = result.filter((product) =>
      matchesAttributeFilter(product, filters.attributes ?? []),
    );
  }

  switch (filters.sort) {
    case "menor_preco":
      result.sort((a, b) => getLowestVariationPrice(a) - getLowestVariationPrice(b));
      break;
    case "maior_preco":
      result.sort((a, b) => getLowestVariationPrice(b) - getLowestVariationPrice(a));
      break;
    case "avaliacao":
      result.sort((a, b) => getAverageRating(b) - getAverageRating(a));
      break;
    case "relevancia":
    default:
      result.sort((a, b) => a.sortOrder - b.sortOrder);
      break;
  }

  return result;
}

function applyPagination(products: Product[], page: number, limit: number): ProductsResponse {
  const safePage = Math.max(1, page || 1);
  const safeLimit = Math.max(1, limit || 12);
  const total = products.length;
  const totalPages = total === 0 ? 0 : Math.ceil(total / safeLimit);
  const start = (safePage - 1) * safeLimit;
  const paginatedProducts = products.slice(start, start + safeLimit);

  return {
    products: paginatedProducts,
    total,
    page: safePage,
    totalPages,
  };
}

export async function getProductsFromDatabase(
  filters: ProductFilters = {},
): Promise<ProductsResponse> {
  if (filters.enabled === false) {
    return {
      products: [],
      total: 0,
      page: filters.page ?? 1,
      totalPages: 0,
    };
  }

  const where: Prisma.ProductWhereInput = {
    status: "PUBLISHED",
    visibility: "PUBLIC",
  };

  if (filters.categoryId) {
    where.categoryId = filters.categoryId;
  } else if (filters.categorySlug) {
    where.category = {
      slug: filters.categorySlug,
    };
  }

  if (filters.collectionSlug) {
    where.collections = {
      some: {
        slug: filters.collectionSlug,
        isActive: true,
      },
    };
  }

  if (filters.search?.trim()) {
    const term = filters.search.trim();
    where.OR = [
      {
        name: {
          contains: term,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: term,
          mode: "insensitive",
        },
      },
      {
        content: {
          contains: term,
          mode: "insensitive",
        },
      },
    ];
  }

  const rows = await findProductRows(where);
  const mappedProducts = rows.map(mapProduct);
  const filteredProducts = applyLocalFilters(mappedProducts, filters);

  return applyPagination(filteredProducts, filters.page ?? 1, filters.limit ?? 12);
}

export async function getProductFromDatabase(idOrSlug: string): Promise<Product | null> {
  if (!idOrSlug) return null;

  const row = await db.product.findFirst({
    where: {
      status: "PUBLISHED",
      visibility: "PUBLIC",
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
    },
    include: PRODUCT_INCLUDE,
  });

  return row ? mapProduct(row) : null;
}

function mapCategoryRecord(category: {
  id: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  visibility: boolean;
  order: number;
  parentId: string | null;
  _count: {
    products: number;
    children: number;
  };
}): ProductCategory {
  return {
    id: category.id,
    slug: category.slug,
    name: category.name,
    imageUrl: category.imageUrl,
    description: category.description,
    createdAt: toIso(category.createdAt),
    updatedAt: toIso(category.updatedAt),
    visibility: category.visibility,
    order: category.order,
    parentId: category.parentId,
    _count: {
      products: category._count.products,
      children: category._count.children,
    },
    children: [],
  };
}

export async function getCategoriesFromDatabase(): Promise<CategoryTreeResponse> {
  const rows = await db.productCategory.findMany({
    where: {
      visibility: true,
    },
    include: {
      _count: {
        select: {
          products: true,
          children: true,
        },
      },
    },
    orderBy: [
      {
        order: "asc",
      },
      {
        name: "asc",
      },
    ],
  });

  const categoryMap = new Map<string, ProductCategory>();
  const roots: ProductCategory[] = [];

  rows.forEach((row) => {
    categoryMap.set(row.id, mapCategoryRecord(row));
  });

  categoryMap.forEach((category) => {
    if (category.parentId && categoryMap.has(category.parentId)) {
      categoryMap.get(category.parentId)?.children?.push(category);
      return;
    }

    roots.push(category);
  });

  return {
    tree: roots,
    count: rows.length,
  };
}

export async function getCategoryFromDatabase(
  idOrSlug: string,
): Promise<ProductCategory | null> {
  if (!idOrSlug) return null;

  const row = await db.productCategory.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
    },
    include: {
      _count: {
        select: {
          products: true,
          children: true,
        },
      },
      children: {
        include: {
          _count: {
            select: {
              products: true,
              children: true,
            },
          },
        },
        orderBy: [
          {
            order: "asc",
          },
          {
            name: "asc",
          },
        ],
      },
    },
  });

  if (!row) return null;

  const category = mapCategoryRecord(row);
  category.children = row.children.map(mapCategoryRecord);
  return category;
}

function mapAttribute(record: {
  id: string;
  name: string;
  slug: string;
  showInFilter: boolean;
  showInProduct: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  values: {
    id: string;
    value: string;
    label: string | null;
    attributeId: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}): Attribute {
  return {
    id: record.id,
    name: record.name,
    slug: record.slug,
    showInFilter: record.showInFilter,
    showInProduct: record.showInProduct,
    order: record.order,
    createdAt: toIso(record.createdAt),
    updatedAt: toIso(record.updatedAt),
    values: record.values.map((value) => ({
      id: value.id,
      value: value.value,
      label: value.label ?? value.value,
      attributeId: value.attributeId,
      order: value.order,
      createdAt: toIso(value.createdAt),
      updatedAt: toIso(value.updatedAt),
      attribute: {
        id: record.id,
        name: record.name,
        slug: record.slug,
        showInFilter: record.showInFilter,
        showInProduct: record.showInProduct,
      },
    })),
  };
}

export async function getAttributesFromDatabase(): Promise<AttributesResponse> {
  const rows = await db.productAttribute.findMany({
    include: {
      values: {
        orderBy: [
          {
            order: "asc",
          },
          {
            value: "asc",
          },
        ],
      },
    },
    orderBy: [
      {
        order: "asc",
      },
      {
        name: "asc",
      },
    ],
  });

  return {
    attributes: rows.map(mapAttribute),
    count: rows.length,
  };
}

export async function getAttributeFromDatabase(idOrSlug: string): Promise<Attribute | null> {
  if (!idOrSlug) return null;

  const row = await db.productAttribute.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
    },
    include: {
      values: {
        orderBy: [
          {
            order: "asc",
          },
          {
            value: "asc",
          },
        ],
      },
    },
  });

  return row ? mapAttribute(row) : null;
}
