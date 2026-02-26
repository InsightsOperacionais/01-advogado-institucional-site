"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface IoMenuSectionProps {
  children: ReactNode;
  className?: string;
  theme?: "light" | "dark";
}

export function IoMenuSection({
  children,
  className = "",
  theme = "light",
}: IoMenuSectionProps) {
  const textColor = theme === "light" ? "text-[#141414]" : "text-[#f1f1f1]";

  return (
    <div className={cn("h-full w-full overflow-y-auto", textColor, className)}>
      {children}
    </div>
  );
}

