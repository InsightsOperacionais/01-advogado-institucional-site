import {
  getCategoriesAction,
  getCategoryAction,
} from "@/data/actions/shop-actions";
import type {
  CategoryTreeResponse,
  ProductCategory,
} from "@/data/types/shop-contracts";

export async function fetchCategories(): Promise<CategoryTreeResponse> {
  try {
    return await getCategoriesAction();
  } catch (error) {
    console.error("❌ Error fetching categories from database:", error);
    return { tree: [], count: 0 };
  }
}

export async function fetchCategory(
  idOrSlug: string,
): Promise<ProductCategory | null> {
  try {
    return await getCategoryAction(idOrSlug);
  } catch (error) {
    console.error("❌ Error fetching category from database:", error);
    return null;
  }
}

export default fetchCategories;
