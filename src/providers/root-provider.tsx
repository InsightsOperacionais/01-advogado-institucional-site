"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { ScrollProvider } from "./scroll-context";
import { ShopProvider } from "./shop-context";
import { UIOverlayProvider } from "./ui-overlay-context";

export function RootProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ScrollProvider>
          <ShopProvider>
            <UIOverlayProvider>{children}</UIOverlayProvider>
          </ShopProvider>
        </ScrollProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </SessionProvider>
  );
}
