import { getProductAction } from "@/data/actions/shop-actions";
import type { Product } from "@/data/types/shop-contracts";

export async function fetchProduct(idOrSlug: string): Promise<Product | null> {
  try {
    return await getProductAction(idOrSlug);
  } catch {
    return null;
  }
}

export default fetchProduct;
