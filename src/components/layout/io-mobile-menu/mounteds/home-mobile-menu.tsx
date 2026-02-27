"use client";

import { MobileAction, useUIOverlay } from "@/providers/ui-overlay-context";
import { BookOpen, CalendarCheck, Menu } from "lucide-react";
import { useEffect, useMemo } from "react";

export function HomeMenuButtons() {
  const { openMenu, setMobileActions, clearMobileActions } = useUIOverlay();

  const buttons = useMemo<MobileAction[]>(
    () => [
      {
        icon: <Menu className="h-5 w-5" />,
        label: "Menu",
        type: "menu",
        onClick: () => {
          openMenu("main-menu");
        },
        className:
          "border-[#c5a47e]/30 bg-[#0a0a0b] text-[#c5a47e] hover:bg-[#c5a47e] hover:text-[#0a0a0b]",
      },
      {
        icon: <CalendarCheck className="h-5 w-5" />,
        label: "Agendar",
        type: "link",
        href: "/contato",
        className:
          "border-[#c5a47e]/30 bg-[#0a0a0b] text-[#c5a47e] hover:bg-[#c5a47e] hover:text-[#0a0a0b]",
      },
      {
        icon: <BookOpen className="h-5 w-5" />,
        label: "Insights",
        type: "link",
        href: "/insights",
        className:
          "border-[#c5a47e]/30 bg-[#0a0a0b] text-[#c5a47e] hover:bg-[#c5a47e] hover:text-[#0a0a0b]",
      },
    ],
    [openMenu],
  );

  useEffect(() => {
    setMobileActions(buttons);
    return () => clearMobileActions();
  }, [buttons, clearMobileActions, setMobileActions]);

  return null;
}
