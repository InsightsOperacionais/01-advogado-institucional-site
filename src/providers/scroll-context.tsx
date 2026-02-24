"use client";

import { CustomScrollbar } from "@/components/layout/custom-scrollbar";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface ScrollContextType {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  isReady: boolean;
  scrollTo: (options: ScrollToOptions) => void;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (scrollRef.current) setIsReady(true);
  }, []);

  const scrollTo = useCallback((options: ScrollToOptions) => {
    scrollRef.current?.scrollTo(options);
  }, []);

  const value = useMemo(
    () => ({ scrollRef, isReady, scrollTo }),
    [isReady, scrollTo],
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) throw new Error("useScroll must be used within ScrollProvider");
  return context;
};

// providers/scroll-context.tsx (Adição)

export function useScrollDirection(threshold: number = 20) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const { scrollRef, isReady } = useScroll();

  useEffect(() => {
    if (!isReady) return;
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = container.scrollTop;

          if (currentScrollY < 5) {
            setIsVisible(true);
          } else if (
            currentScrollY > lastScrollY.current &&
            currentScrollY > threshold
          ) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY.current) {
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollRef, isReady, threshold]);

  return isVisible;
}

// Componente que encapsula a lógica de UI do Scroll
export function MainScrollArea({ children }: { children: ReactNode }) {
  const { scrollRef, isReady } = useScroll();

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <div
        ref={scrollRef}
        className="no-scrollbar h-full w-full overflow-x-hidden overflow-y-auto"
      >
        {children}
      </div>
      {isReady && <CustomScrollbar scrollRef={scrollRef} />}
    </div>
  );
}
