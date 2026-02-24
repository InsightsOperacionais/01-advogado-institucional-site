import { useQuery } from "@tanstack/react-query";
import fetchCategories from "../api/fetch-categories";
import fetchCategory from "../api/fetch-category";
import { queryKeys } from "../utils/query-keys";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.lists(),
    queryFn: fetchCategories,
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: queryKeys.categories.detail(id),
    queryFn: () => fetchCategory(id),
    enabled: !!id,
  });
}
