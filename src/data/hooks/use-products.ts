import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import fetchProduct from "../api/fetch-product";
import fetchProducts from "../api/fetch-products";
import type { ProductFilters } from "../types/shop-contracts";
import { queryKeys } from "../utils/query-keys";

export function useProducts(filters?: ProductFilters) {
  const queryEnabled = filters?.enabled ?? true;

  return useInfiniteQuery({
    queryKey: [...queryKeys.products.lists(), filters],
    queryFn: ({ pageParam }) =>
      fetchProducts({
        ...filters,
        enabled: undefined,
        page: pageParam as number,
        limit: filters?.limit || 12,
      }),
    getNextPageParam: (lastPage, allPages) => {
      // Evita erro se a resposta for um array simples sem metadados de paginação
      if (Array.isArray(lastPage)) return undefined;

      const totalPages = lastPage.totalPages;
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: queryEnabled,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
}
