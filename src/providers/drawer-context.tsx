"use client";

import React from "react";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface DrawerConfig {
  id: string;
  title?: string;
  direction?: "left" | "right";
  theme?: "light" | "dark";
  component: React.ComponentType<any>;
}

interface DrawerState {
  isOpen: boolean;
  activeDrawerId: string | null;
  activeDrawerConfig: DrawerConfig | null;
  activeDrawerProps: any;
  registeredDrawers: Record<string, DrawerConfig>;
  registerDrawer: (config: DrawerConfig) => void;
  unregisterDrawer: (id: string) => void;
  openDrawer: (id: string, props?: any) => void;
  closeDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>()(
  subscribeWithSelector((set, get) => ({
    isOpen: false,
    activeDrawerId: null,
    activeDrawerConfig: null,
    activeDrawerProps: {},
    registeredDrawers: {},

    registerDrawer: (config) => {
      set((state) => ({
        registeredDrawers: { ...state.registeredDrawers, [config.id]: config },
      }));
    },

    unregisterDrawer: (id) => {
      set((state) => {
        const { [id]: _, ...rest } = state.registeredDrawers;
        return { registeredDrawers: rest };
      });
    },

    openDrawer: (id, props = {}) => {
      const config = get().registeredDrawers[id];
      if (!config) return;
      set({
        isOpen: true,
        activeDrawerId: id,
        activeDrawerConfig: config,
        activeDrawerProps: props,
      });
    },

    closeDrawer: () => set({ isOpen: false }),
  })),
);

export function useRegisterDrawer(config: DrawerConfig) {
  const { registerDrawer, unregisterDrawer } = useDrawerStore();
  React.useEffect(() => {
    registerDrawer(config);
    return () => unregisterDrawer(config.id);
  }, [config.id, registerDrawer, unregisterDrawer]);
}
