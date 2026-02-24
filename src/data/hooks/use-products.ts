import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import fetchProduct from "../api/fetch-product";
import fetchProducts from "../api/fetch-products";
import { ProductFilters } from "../types/shop";
import { queryKeys } from "../utils/query-keys";

export function useProducts(filters?: ProductFilters) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.products.lists(), filters],
    queryFn: ({ pageParam }) =>
      fetchProducts({
        ...filters,
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
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
}
