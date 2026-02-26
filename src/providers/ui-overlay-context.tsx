"use client";

import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

export interface MenuDefinition {
  id: string;
  origin?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  theme?: "light" | "dark";
  component: React.ComponentType<any>;
}

export interface DrawerDefinition {
  id: string;
  title?: string;
  direction?: "left" | "right";
  theme?: "light" | "dark";
  component: React.ComponentType<any>;
}

export interface MobileAction {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  type: "menu" | "drawer" | "link";
  href?: string;
  variant?: "default" | "outline" | "destructive" | "ghost" | "secondary";
  disabled?: boolean;
  className?: string;
}

interface UIOverlayState {
  activeMenu: { id: string; props: any } | null;
  activeDrawer: { id: string; props: any } | null;
  mobileActions: MobileAction[];
}

type UIOverlayAction =
  | { type: "OPEN_MENU"; payload: { id: string; props: any } }
  | { type: "CLOSE_MENU" }
  | { type: "OPEN_DRAWER"; payload: { id: string; props: any } }
  | { type: "CLOSE_DRAWER" }
  | { type: "SET_MOBILE_ACTIONS"; payload: MobileAction[] }
  | { type: "CLEAR_MOBILE_ACTIONS" };

interface UIOverlayContextType {
  state: UIOverlayState;
  openMenu: (id: string, props?: any) => void;
  closeMenu: () => void;
  openDrawer: (id: string, props?: any) => void;
  closeDrawer: () => void;
  setMobileActions: (actions: MobileAction[]) => void;
  clearMobileActions: () => void;
}

const initialState: UIOverlayState = {
  activeMenu: null,
  activeDrawer: null,
  mobileActions: [],
};

function overlayReducer(
  state: UIOverlayState,
  action: UIOverlayAction,
): UIOverlayState {
  switch (action.type) {
    case "OPEN_MENU":
      return { ...state, activeMenu: action.payload };
    case "CLOSE_MENU":
      return { ...state, activeMenu: null };
    case "OPEN_DRAWER":
      return { ...state, activeDrawer: action.payload };
    case "CLOSE_DRAWER":
      return { ...state, activeDrawer: null };
    case "SET_MOBILE_ACTIONS":
      return { ...state, mobileActions: action.payload };
    case "CLEAR_MOBILE_ACTIONS":
      return { ...state, mobileActions: [] };
    default:
      return state;
  }
}

const UIOverlayContext = createContext<UIOverlayContextType | undefined>(
  undefined,
);

export function UIOverlayProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(overlayReducer, initialState);

  const openMenu = useCallback((id: string, props: any = {}) => {
    dispatch({ type: "OPEN_MENU", payload: { id, props } });
  }, []);

  const closeMenu = useCallback(() => {
    dispatch({ type: "CLOSE_MENU" });
  }, []);

  const openDrawer = useCallback((id: string, props: any = {}) => {
    dispatch({ type: "OPEN_DRAWER", payload: { id, props } });
  }, []);

  const closeDrawer = useCallback(() => {
    dispatch({ type: "CLOSE_DRAWER" });
  }, []);

  const setMobileActions = useCallback((actions: MobileAction[]) => {
    dispatch({ type: "SET_MOBILE_ACTIONS", payload: actions });
  }, []);

  const clearMobileActions = useCallback(() => {
    dispatch({ type: "CLEAR_MOBILE_ACTIONS" });
  }, []);

  const value = useMemo(
    () => ({
      state,
      openMenu,
      closeMenu,
      openDrawer,
      closeDrawer,
      setMobileActions,
      clearMobileActions,
    }),
    [
      state,
      openMenu,
      closeMenu,
      openDrawer,
      closeDrawer,
      setMobileActions,
      clearMobileActions,
    ],
  );

  return (
    <UIOverlayContext.Provider value={value}>
      {children}
    </UIOverlayContext.Provider>
  );
}

export function useUIOverlay() {
  const context = useContext(UIOverlayContext);
  if (!context) {
    throw new Error("useUIOverlay must be used within UIOverlayProvider");
  }
  return context;
}

