// components/PageTransition.tsx
"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";
import { ReactNode, useContext, useState } from "react";

function FrozenRoute({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) return <>{children}</>;

  const [frozenContext] = useState(context);

  return (
    <LayoutRouterContext.Provider value={frozenContext}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

const variants: Variants = {
  initial: {
    opacity: 0,
    y: -12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

interface PageTransitionProps {
  children: ReactNode;
  theme?: "light" | "dark";
}

export function PageTransition({
  children,
  theme = "dark",
}: PageTransitionProps) {
  const pathname = usePathname();
  const bgColor = theme === "dark" ? "bg-[#0a0a0b]" : "bg-white";

  return (
    <div className={`relative min-h-screen ${bgColor}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex min-h-screen w-full flex-col"
        >
          <FrozenRoute>{children}</FrozenRoute>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
