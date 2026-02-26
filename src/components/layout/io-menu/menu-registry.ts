import { MenuDefinition } from "@/providers/ui-overlay-context";
import { MainMenuContent } from "./mounteds/menu-content";

export const MENU_REGISTRY: Record<string, MenuDefinition> = {
  "main-menu": {
    id: "main-menu",
    component: MainMenuContent,
    origin: "top-right",
    theme: "dark",
  },
};

