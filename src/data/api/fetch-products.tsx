// data/api/fetch-products.tsx
import { Product, ProductsResponse, ProductFilters } from '../types/shop';
import { API_CONFIG } from '../config';
import { API_ENDPOINTS, CACHE_TIMES } from '../utils/constants';

export async function fetchProducts(filters?: ProductFilters): Promise<ProductsResponse> {
  try {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v));
          } else {
            params.append(key, String(value));
          }
        }
      });
    }

    const url = `${API_CONFIG.baseURL}${API_ENDPOINTS.PRODUCTS}${
      params.toString() ? `?${params.toString()}` : ''
    }`;

    console.log('📡 Fetching products from:', url);

    const res = await fetch(url, {
      headers: API_CONFIG.headers,
      next: { revalidate: CACHE_TIMES.PRODUCTS },
    });

    if (!res.ok) {
      console.error('❌ Products response not OK:', res.status, res.statusText);
      return { products: [], total: 0, page: 1, totalPages: 0 };
    }
    
    const data = await res.json();
    console.log('📦 Products data received:', data);
    
    // A API retorna um array diretamente
    return data;
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return { products: [], total: 0, page: 1, totalPages: 0 };
  }
}

export async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const url = `${API_CONFIG.baseURL}${API_ENDPOINTS.PRODUCT(id)}`;
    console.log('📡 Fetching product from:', url);

    const res = await fetch(url, {
      headers: API_CONFIG.headers,
      next: { revalidate: CACHE_TIMES.PRODUCTS },
    });

    if (!res.ok) {
      console.error('❌ Product response not OK:', res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    console.log('📦 Product data received:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    return null;
  }
}

export default fetchProducts;