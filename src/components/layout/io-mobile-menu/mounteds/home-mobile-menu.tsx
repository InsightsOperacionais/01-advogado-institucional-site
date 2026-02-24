"use client";

import { useDrawerStore } from "@/providers/drawer-context";
import { useMenuStore, useRegisterMenu } from "@/providers/menu-context";
import { usePageMobileUI } from "@/providers/mobile-context";
import { Bell, Menu, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";

// Importe os CONTEÚDOS (os componentes puros, não os botões)
import { MainMenuContent } from "../../io-menu/mounteds/menu-content";

export function HomeMenuButtons() {
  const router = useRouter();

  // Stores Globais
  const { openMenu } = useMenuStore();
  const { openDrawer } = useDrawerStore();

  // REGISTRA O MENU PRINCIPAL
  useRegisterMenu({
    id: "main-menu",
    component: MainMenuContent,
    origin: "top-right",
    theme: "dark",
  });

  // REGISTRA OS DRAWERS (se necessário - mas eles já são registrados pelos botões)
  // Nota: Os drawers já são registrados pelos componentes CartDrawerButton e NotificationDrawerButton
  // em outros lugares da aplicação, então não precisamos registrar aqui novamente

  const buttons = [
    {
      icon: <Menu className="h-5 w-5" />,
      label: "Menu",
      type: "menu" as const,
      onClick: () => {
        openMenu("main-menu");
      },
      className: "bg-[#141414] text-[#fbb725] border-[#fbb725]/30",
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Minha conta",
      type: "link" as const,
      onClick: () => router.push("/roceria/minha-conta"),
      className: "bg-[#141414] text-[#fbb725] border-[#fbb725]/30",
    },
    {
      icon: <Bell className="h-5 w-5" />,
      label: "Notificações",
      type: "drawer" as const,
      onClick: () => {
        openDrawer("notifications");
      },
      className: "bg-[#141414] text-[#fbb725] border-[#fbb725]/30",
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      label: "Carrinho",
      type: "drawer" as const,
      onClick: () => {
        openDrawer("cart");
      },
      className: "bg-[#141414] text-[#fbb725] border-[#fbb725]/30",
    },
  ];

  usePageMobileUI(buttons);

  return null;
}
