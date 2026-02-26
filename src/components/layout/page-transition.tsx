// components/PageTransition.tsx
"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";
import { ReactNode, useContext, useState } from "react";

function FrozenRoute({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const isDev = process.env.NODE_ENV === "development";
  // Em desenvolvimento não congele o contexto para não bloquear Fast Refresh/HMR.
  if (isDev) return <>{children}</>;

  // Usa useState em vez de useRef - o estado é estável entre renders
  const [frozenContext] = useState(context);

  return (
    <LayoutRouterContext.Provider value={frozenContext}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

const variants: Variants = {
  initial: { opacity: 0, y: -12 },
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

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        // MUDANÇA: flex-1 em vez de h-full para preencher o espaço restante
        className="flex min-h-0 w-full flex-1 flex-col"
      >
        <FrozenRoute>{children}</FrozenRoute>
      </motion.div>
    </AnimatePresence>
  );
}
