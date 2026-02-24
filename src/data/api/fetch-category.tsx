import { API_CONFIG } from "../config";
import { ProductCategory } from "../types/shop";
import { API_ENDPOINTS, CACHE_TIMES } from "../utils/constants";

export async function fetchCategory(
  id: string,
): Promise<ProductCategory | null> {
  try {
    const res = await fetch(
      `${API_CONFIG.baseURL}${API_ENDPOINTS.CATEGORY(id)}`,
      {
        headers: API_CONFIG.headers,
        next: { revalidate: CACHE_TIMES.CATEGORIES },
      },
    );

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default fetchCategory;
