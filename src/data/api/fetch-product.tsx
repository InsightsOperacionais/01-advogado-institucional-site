import { API_CONFIG } from "../config";
import { Product } from "../types/shop";
import { API_ENDPOINTS, CACHE_TIMES } from "../utils/constants";

export async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${API_CONFIG.baseURL}${API_ENDPOINTS.PRODUCT(id)}`,
      {
        headers: API_CONFIG.headers,
        next: { revalidate: CACHE_TIMES.PRODUCTS },
      },
    );

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default fetchProduct;
