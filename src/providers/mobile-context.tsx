"use client";

import { ReactNode, useEffect } from "react";
import { create } from "zustand";

export interface MobileButton {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  type: "menu" | "drawer" | "link";
  href?: string;
  variant?: "default" | "outline" | "destructive" | "ghost" | "secondary";
  disabled?: boolean;
  drawerContent?: ReactNode;
  drawerTitle?: string;
  drawerTheme?: "light" | "dark";
  menuContent?: ReactNode;
  menuOrigin?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
  subItems?: Array<{ icon: ReactNode; label: string; onClick: () => void }>;
  className?: string;
}

interface MobileState {
  headerButtons: MobileButton[];
  setHeaderButtons: (buttons: MobileButton[]) => void;
  resetAll: () => void;
}

export const useMobileStore = create<MobileState>((set) => ({
  headerButtons: [],
  setHeaderButtons: (headerButtons) => set({ headerButtons }),
  resetAll: () => set({ headerButtons: [] }),
}));

export const usePageMobileUI = (header?: MobileButton[]) => {
  const setHeaderButtons = useMobileStore((state) => state.setHeaderButtons);
  const resetAll = useMobileStore((state) => state.resetAll);

  useEffect(() => {
    if (header && header.length > 0) {
      setHeaderButtons(header);
    }
    // Remova o resetAll temporariamente para testar se o menu aparece
    // return () => resetAll();
  }, [header, setHeaderButtons]);
};
