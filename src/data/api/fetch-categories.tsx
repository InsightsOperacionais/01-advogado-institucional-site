// data/api/fetch-categories.tsx
import { API_CONFIG } from "../config";
import { CategoryTreeResponse, ProductCategory } from "../types/shop";
import { API_ENDPOINTS, CACHE_TIMES } from "../utils/constants";

export async function fetchCategories(): Promise<CategoryTreeResponse> {
  try {
    const url = `${API_CONFIG.baseURL}${API_ENDPOINTS.CATEGORIES}`;
    console.log("📡 Fetching categories from:", url);

    const res = await fetch(url, {
      headers: API_CONFIG.headers,
      next: { revalidate: CACHE_TIMES.CATEGORIES },
    });

    if (!res.ok) {
      console.error(
        "❌ Categories response not OK:",
        res.status,
        res.statusText,
      );
      return { tree: [], count: 0 };
    }

    const data = await res.json();
    console.log("📁 Categories data received:", data);

    return data;
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return { tree: [], count: 0 };
  }
}

export async function fetchCategory(
  id: string,
): Promise<ProductCategory | null> {
  try {
    const url = `${API_CONFIG.baseURL}${API_ENDPOINTS.CATEGORY(id)}`;
    console.log("📡 Fetching category from:", url);

    const res = await fetch(url, {
      headers: API_CONFIG.headers,
      next: { revalidate: CACHE_TIMES.CATEGORIES },
    });

    if (!res.ok) {
      console.error("❌ Category response not OK:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    console.log("📁 Category data received:", data);

    return data;
  } catch (error) {
    console.error("❌ Error fetching category:", error);
    return null;
  }
}

export default fetchCategories;
