"use server";

import type {
  Attribute,
  AttributesResponse,
  CategoryTreeResponse,
  Product,
  ProductCategory,
  ProductFilters,
  ProductsResponse,
} from "@/data/types/shop-contracts";
import {
  getAttributeFromDatabase,
  getAttributesFromDatabase,
  getCategoriesFromDatabase,
  getCategoryFromDatabase,
  getProductFromDatabase,
  getProductsFromDatabase,
} from "@/data/server/shop-repository";

export async function getProductsAction(
  filters?: ProductFilters,
): Promise<ProductsResponse> {
  return getProductsFromDatabase(filters);
}

export async function getProductAction(idOrSlug: string): Promise<Product | null> {
  return getProductFromDatabase(idOrSlug);
}

export async function getCategoriesAction(): Promise<CategoryTreeResponse> {
  return getCategoriesFromDatabase();
}

export async function getCategoryAction(
  idOrSlug: string,
): Promise<ProductCategory | null> {
  return getCategoryFromDatabase(idOrSlug);
}

export async function getAttributesAction(): Promise<AttributesResponse> {
  return getAttributesFromDatabase();
}

export async function getAttributeAction(idOrSlug: string): Promise<Attribute | null> {
  return getAttributeFromDatabase(idOrSlug);
}
