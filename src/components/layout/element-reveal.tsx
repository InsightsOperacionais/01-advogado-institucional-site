"use client";

import { cn } from "@/lib/utils";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type RevealVariant =
  | "up"
  | "fade"
  | "left"
  | "right"
  | "soft"
  | "scale"
  | "card"
  | "button";

interface ElementRevealProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  width?: "fit" | "full";
  distance?: number | string;
  threshold?: number | "some" | "all";
  once?: boolean;
  rootMargin?: string;
  variant?: RevealVariant;
  mask?: boolean;
  active?: boolean;
}

export function ElementReveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  width = "fit",
  distance,
  threshold = 0.1,
  once = true,
  rootMargin = "0px 0px -10% 0px",
  variant = "up",
  mask,
  active,
}: ElementRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const activeFrameRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const resolvedThreshold = useMemo(() => {
    if (threshold === "all") return 0.8;
    if (threshold === "some") return 0.2;
    return threshold;
  }, [threshold]);

  const baseDistance = useMemo(() => {
    if (distance !== undefined) {
      return typeof distance === "number" ? `${distance}%` : distance;
    }

    const defaults: Record<RevealVariant, string> = {
      up: "100%",
      fade: "0px",
      left: "32px",
      right: "32px",
      soft: "18px",
      scale: "18px",
      card: "26px",
      button: "14px",
    };

    return defaults[variant];
  }, [distance, variant]);

  const style = useMemo(() => {
    const axis =
      variant === "left"
        ? { x: `-${baseDistance}`, y: "0px" }
        : variant === "right"
          ? { x: baseDistance, y: "0px" }
          : { x: "0px", y: baseDistance };

    const scale =
      variant === "scale"
        ? "0.96"
        : variant === "card"
          ? "0.985"
          : variant === "button"
            ? "0.98"
            : "1";

    const blur =
      variant === "soft"
        ? "6px"
        : variant === "scale"
          ? "8px"
          : variant === "card"
            ? "10px"
            : "0px";

    return {
      "--reveal-delay": `${delay}s`,
      "--reveal-duration": `${duration}s`,
      "--reveal-x": axis.x,
      "--reveal-y": axis.y,
      "--reveal-scale": scale,
      "--reveal-blur": blur,
    } as CSSProperties;
  }, [baseDistance, delay, duration, variant]);

  const shouldMask = mask ?? !(variant === "card" || variant === "button");

  useEffect(() => {
    if (typeof active === "boolean") {
      if (activeFrameRef.current !== null) {
        window.cancelAnimationFrame(activeFrameRef.current);
        activeFrameRef.current = null;
      }

      if (!active) {
        setIsVisible(false);
        return;
      }

      activeFrameRef.current = window.requestAnimationFrame(() => {
        setIsVisible(true);
        activeFrameRef.current = null;
      });

      return () => {
        if (activeFrameRef.current !== null) {
          window.cancelAnimationFrame(activeFrameRef.current);
          activeFrameRef.current = null;
        }
      };
    }

    const node = ref.current;
    if (!node) return;

    if (activeFrameRef.current !== null) {
      window.cancelAnimationFrame(activeFrameRef.current);
      activeFrameRef.current = null;
    }

    setIsVisible(false);
    activeFrameRef.current = window.requestAnimationFrame(() => {
      setIsVisible(false);
      activeFrameRef.current = null;
    });

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(node);
          return;
        }

        if (!once) setIsVisible(false);
      },
      {
        threshold: resolvedThreshold,
        rootMargin,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (activeFrameRef.current !== null) {
        window.cancelAnimationFrame(activeFrameRef.current);
        activeFrameRef.current = null;
      }
    };
  }, [active, once, resolvedThreshold, rootMargin]);

  return (
    <div
      ref={ref}
      data-reveal-root
      data-reveal-state={isVisible ? "visible" : "hidden"}
      data-reveal-variant={variant}
      className={cn(
        shouldMask ? "relative -my-[0.1em] overflow-hidden" : "relative",
        width === "fit" ? "inline-block" : "w-full",
        className,
      )}
    >
      <div data-reveal-content style={style}>
        {children}
      </div>
    </div>
  );
}
