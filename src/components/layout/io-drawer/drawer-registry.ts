import { DrawerDefinition } from "@/providers/ui-overlay-context";
import { CartDrawerContent } from "./mounteds/cart-drawer";
import { FilterDrawerContent } from "./mounteds/filter-drawer";
import { NotificationDrawerContent } from "./mounteds/notification-drawer";

export const DRAWER_REGISTRY: Record<string, DrawerDefinition> = {
  cart: {
    id: "cart",
    component: CartDrawerContent,
    title: "Carrinho",
    theme: "dark",
    direction: "right",
  },
  notifications: {
    id: "notifications",
    component: NotificationDrawerContent,
    title: "Notificações",
    theme: "light",
    direction: "right",
  },
  filters: {
    id: "filters",
    component: FilterDrawerContent,
    title: "Filtros",
    theme: "light",
    direction: "right",
  },
};

