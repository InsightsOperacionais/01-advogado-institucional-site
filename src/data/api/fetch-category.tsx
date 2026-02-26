import { getCategoryAction } from "@/data/actions/shop-actions";
import type { ProductCategory } from "@/data/types/shop-contracts";

export async function fetchCategory(
  idOrSlug: string,
): Promise<ProductCategory | null> {
  try {
    return await getCategoryAction(idOrSlug);
  } catch {
    return null;
  }
}

export default fetchCategory;
