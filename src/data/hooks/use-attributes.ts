import { useQuery } from "@tanstack/react-query";
import fetchAttributes, { fetchAttribute } from "../api/fetch-attributes";
import { queryKeys } from "../utils/query-keys";

export function useAttributes() {
  return useQuery({
    queryKey: queryKeys.attributes.lists(),
    queryFn: fetchAttributes,
  });
}

export function useAttribute(id: string) {
  return useQuery({
    queryKey: queryKeys.attributes.detail(id),
    queryFn: () => fetchAttribute(id),
    enabled: !!id,
  });
}
