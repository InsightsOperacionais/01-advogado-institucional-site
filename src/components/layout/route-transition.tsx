"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export type RouteTransitionTheme = "light" | "dark";

const DARK_ROUTE_PATTERNS = [
  /^\/sobre(?:\/|$)/,
  /^\/contato(?:\/|$)/,
  /^\/campanhas(?:\/|$)/,
  /^\/login(?:\/|$)/,
  /^\/registro(?:\/|$)/,
  /^\/register(?:\/|$)/,
  /^\/reset(?:\/|$)/,
  /^\/new-password(?:\/|$)/,
  /^\/new-verification(?:\/|$)/,
  /^\/error(?:\/|$)/,
];

export function getRouteTransitionTheme(
  pathname: string,
): RouteTransitionTheme {
  return DARK_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname))
    ? "dark"
    : "light";
}

interface RouteTransitionProps {
  children: ReactNode;
  className?: string;
  theme?: RouteTransitionTheme | "auto";
}

export function RouteTransition({
  children,
  className,
  theme = "auto",
}: RouteTransitionProps) {
  const pathname = usePathname();
  const resolvedTheme =
    theme === "auto" ? getRouteTransitionTheme(pathname) : theme;
  const overlayClass =
    resolvedTheme === "dark" ? "bg-[#0a0a0b]" : "bg-[#f4f4f5]";

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className={cn("relative min-h-screen", className)}
        initial={{ opacity: 0.04 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.28,
            delay: 0.08,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
        exit={{
          opacity: 0.04,
          transition: {
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1],
          },
        }}
      >
        <motion.div
          aria-hidden="true"
          className={cn(
            "pointer-events-none fixed inset-0 z-[115]",
            overlayClass,
          )}
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: {
              duration: 0.32,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          exit={{
            opacity: 1,
            transition: {
              duration: 0.18,
              ease: [0.4, 0, 0.2, 1],
            },
          }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
