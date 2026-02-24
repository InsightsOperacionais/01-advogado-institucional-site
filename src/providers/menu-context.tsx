// providers/menu-context.tsx
"use client";

import React from "react";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface MenuConfig {
  id: string;
  origin?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  theme?: "light" | "dark";
  component: React.ComponentType<any>;
}

interface MenuState {
  isOpen: boolean;
  activeMenuId: string | null;
  activeMenuConfig: MenuConfig | null;
  activeMenuProps: any;
  registeredMenus: Record<string, MenuConfig>;
  registerMenu: (config: MenuConfig) => void;
  unregisterMenu: (id: string) => void;
  openMenu: (id: string, props?: any) => void;
  closeMenu: () => void;
}

export const useMenuStore = create<MenuState>()(
  subscribeWithSelector((set, get) => ({
    isOpen: false,
    activeMenuId: null,
    activeMenuConfig: null,
    activeMenuProps: {},
    registeredMenus: {},

    registerMenu: (config) => {
      set((state) => ({
        registeredMenus: { ...state.registeredMenus, [config.id]: config },
      }));
    },

    unregisterMenu: (id) => {
      set((state) => {
        const { [id]: _, ...rest } = state.registeredMenus;
        return { registeredMenus: rest };
      });
    },

    openMenu: (id, props = {}) => {
      const config = get().registeredMenus[id];
      if (!config) {
        console.warn(`Menu with id "${id}" not registered`);
        return;
      }
      set({
        isOpen: true,
        activeMenuId: id,
        activeMenuConfig: config,
        activeMenuProps: props,
      });
    },

    closeMenu: () => set({ isOpen: false }),
  })),
);

// Hook para registrar um menu automaticamente
export function useRegisterMenu(config: MenuConfig) {
  const { registerMenu, unregisterMenu } = useMenuStore();

  React.useEffect(() => {
    registerMenu(config);
    return () => unregisterMenu(config.id);
  }, [
    config.id,
    registerMenu,
    unregisterMenu,
    config.origin,
    config.theme,
    config.component,
  ]);
}
