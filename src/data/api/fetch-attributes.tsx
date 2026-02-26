import {
  getAttributeAction,
  getAttributesAction,
} from "@/data/actions/shop-actions";
import type {
  Attribute,
  AttributesResponse,
} from "@/data/types/shop-contracts";

export async function fetchAttributes(): Promise<AttributesResponse> {
  try {
    return await getAttributesAction();
  } catch (error) {
    console.error("❌ Error fetching attributes from database:", error);
    return { attributes: [], count: 0 };
  }
}

export async function fetchAttribute(idOrSlug: string): Promise<Attribute | null> {
  try {
    return await getAttributeAction(idOrSlug);
  } catch (error) {
    console.error("❌ Error fetching attribute from database:", error);
    return null;
  }
}

export default fetchAttributes;
