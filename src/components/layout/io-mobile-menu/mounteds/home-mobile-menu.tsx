"use client";

import { MobileAction, useUIOverlay } from "@/providers/ui-overlay-context";
import { Bell, Menu, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export function HomeMenuButtons() {
  const router = useRouter();

  const { openMenu, openDrawer, setMobileActions, clearMobileActions } =
    useUIOverlay();

  const buttons = useMemo<MobileAction[]>(
    () => [
      {
        icon: <Menu className="h-5 w-5" />,
        label: "Menu",
        type: "menu",
        onClick: () => {
          openMenu("main-menu");
        },
        className: "bg-[#141414] text-[#fbb725] border-[#fbb725]/30",
      },
      {
        icon: <User className="h-5 w-5" />,
        label: "Minha conta",
        type: "link",
        onClick: () => router.push("/roceria/minha-conta"),
        className: "bg-[#141414] text-[#fbb725] border-[#fbb725]/30",
      },
      {
        icon: <Bell className="h-5 w-5" />,
        label: "Notificações",
        type: "drawer",
        onClick: () => {
          openDrawer("notifications");
        },
        className: "bg-[#141414] text-[#fbb725] border-[#fbb725]/30",
      },
    ],
    [openDrawer, openMenu, router],
  );

  useEffect(() => {
    setMobileActions(buttons);
    return () => clearMobileActions();
  }, [buttons, clearMobileActions, setMobileActions]);

  return null;
}
