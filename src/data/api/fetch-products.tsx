import { getProductAction, getProductsAction } from "@/data/actions/shop-actions";
import type {
  Product,
  ProductFilters,
  ProductsResponse,
} from "@/data/types/shop-contracts";

export async function fetchProducts(
  filters?: ProductFilters,
): Promise<ProductsResponse> {
  try {
    return await getProductsAction(filters);
  } catch (error) {
    console.error("❌ Error fetching products from database:", error);
    return { products: [], total: 0, page: 1, totalPages: 0 };
  }
}

export async function fetchProduct(idOrSlug: string): Promise<Product | null> {
  try {
    return await getProductAction(idOrSlug);
  } catch (error) {
    console.error("❌ Error fetching product from database:", error);
    return null;
  }
}

export default fetchProducts;
