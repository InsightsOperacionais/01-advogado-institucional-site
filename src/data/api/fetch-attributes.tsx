// data/api/fetch-attributes.tsx
import { API_CONFIG } from "../config";
import { Attribute } from "../types/shop";
import { API_ENDPOINTS, CACHE_TIMES } from "../utils/constants";

export interface AttributesResponse {
  attributes: Attribute[];
  count: number;
}

export async function fetchAttributes(): Promise<AttributesResponse> {
  try {
    const url = `${API_CONFIG.baseURL}${API_ENDPOINTS.ATTRIBUTES}`;
    console.log("📡 Fetching attributes from:", url);

    const res = await fetch(url, {
      headers: API_CONFIG.headers,
      next: { revalidate: CACHE_TIMES.ATTRIBUTES },
    });

    if (!res.ok) {
      console.error(
        "❌ Attributes response not OK:",
        res.status,
        res.statusText,
      );
      return { attributes: [], count: 0 };
    }

    const data = await res.json();
    console.log("🏷️ Attributes data received:", data);

    // A API retorna um array de atributos diretamente
    if (Array.isArray(data)) {
      return {
        attributes: data,
        count: data.length,
      };
    }

    return data;
  } catch (error) {
    console.error("❌ Error fetching attributes:", error);
    return { attributes: [], count: 0 };
  }
}

export async function fetchAttribute(id: string): Promise<Attribute | null> {
  try {
    const url = `${API_CONFIG.baseURL}${API_ENDPOINTS.ATTRIBUTE(id)}`;
    console.log("📡 Fetching attribute from:", url);

    const res = await fetch(url, {
      headers: API_CONFIG.headers,
      next: { revalidate: CACHE_TIMES.ATTRIBUTES },
    });

    if (!res.ok) {
      console.error(
        "❌ Attribute response not OK:",
        res.status,
        res.statusText,
      );
      return null;
    }

    const data = await res.json();
    console.log("🏷️ Attribute data received:", data);

    return data;
  } catch (error) {
    console.error("❌ Error fetching attribute:", error);
    return null;
  }
}

export default fetchAttributes;
