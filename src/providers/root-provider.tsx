"use client";

import { SessionProvider } from "next-auth/react";
import { ScrollProvider } from "./scroll-context";
import { UIOverlayProvider } from "./ui-overlay-context";

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ScrollProvider>
        <UIOverlayProvider>{children}</UIOverlayProvider>
      </ScrollProvider>
    </SessionProvider>
  );
}
