"use client";

import { cn } from "@/lib/utils";
import { useUIOverlay } from "@/providers/ui-overlay-context";
import { ReactNode } from "react";

interface IoDrawerButtonProps {
  drawerId: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  drawerProps?: any;
}

export function IoDrawerButton({
  drawerId,
  children,
  className = "",
  onClick,
  drawerProps = {},
}: IoDrawerButtonProps) {
  const { openDrawer } = useUIOverlay();

  const handleClick = () => {
    onClick?.();
    openDrawer(drawerId, drawerProps);
  };

  return (
    <div
      onClick={handleClick}
      className={cn("inline-block cursor-pointer", className)}
    >
      {children}
    </div>
  );
}

interface IoDrawerContentSectionProps {
  children: ReactNode;
  className?: string;
  theme?: "light" | "dark";
}

export function IoDrawerContentSection({
  children,
  className = "",
  theme = "light",
}: IoDrawerContentSectionProps) {
  const textColor = theme === "light" ? "text-[#141414]" : "text-[#f1f1f1]";

  return (
    <div className={cn("h-full overflow-y-auto", textColor, className)}>
      {children}
    </div>
  );
}

interface IoDrawerFooterProps {
  children: ReactNode;
  className?: string;
  theme?: "light" | "dark";
}

export function IoDrawerFooter({
  children,
  className = "",
  theme = "light",
}: IoDrawerFooterProps) {
  return (
    <div className={cn("border-t border-[#fbb725]/10", className)}>
      {children}
    </div>
  );
}

