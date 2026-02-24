export const queryKeys = {
  products: {
    all: ["products"] as const,
    lists: () => [...queryKeys.products.all, "list"] as const,
    list: (filters: any) => [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
  },
  categories: {
    all: ["categories"] as const,
    lists: () => [...queryKeys.categories.all, "list"] as const,
    list: (params: any) => [...queryKeys.categories.lists(), params] as const,
    details: () => [...queryKeys.categories.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.categories.details(), id] as const,
  },
  attributes: {
    all: ["attributes"] as const,
    lists: () => [...queryKeys.attributes.all, "list"] as const,
    list: (params: any) => [...queryKeys.attributes.lists(), params] as const,
    details: () => [...queryKeys.attributes.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.attributes.details(), id] as const,
  },
} as const;
