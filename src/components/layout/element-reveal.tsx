"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ElementRevealProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  width?: "fit" | "full";
  distance?: number;
  // Adicionamos o threshold aqui para o TypeScript reconhecer
  threshold?: number | "some" | "all";
}

export function ElementReveal({
  children,
  className,
  delay = 0,
  width = "fit",
  distance = 100,
  threshold = 0.1, // Valor padrão
}: ElementRevealProps) {
  const ref = useRef(null);

  // O framer-motion usa 'amount' em vez de 'threshold'
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "relative -my-[0.1em] overflow-hidden",
        width === "fit" ? "inline-block" : "w-full",
        className,
      )}
    >
      <motion.div
        initial={{ y: `${distance}%`, opacity: 0 }}
        animate={
          isInView ? { y: 0, opacity: 1 } : { y: `${distance}%`, opacity: 0 }
        }
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
          delay: delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
