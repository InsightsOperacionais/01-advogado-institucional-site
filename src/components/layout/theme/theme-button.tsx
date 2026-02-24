"use client";

import { Button } from "@/components/shadcnui/shadcn-base/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeButton() {
  const { theme, setTheme } = useTheme();

  // Função para alternar entre light e dark
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button variant="navbar" onClick={toggleTheme}>
      {theme === "dark" ? (
        <MoonIcon className="size-4" />
      ) : (
        <SunIcon className="size-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
