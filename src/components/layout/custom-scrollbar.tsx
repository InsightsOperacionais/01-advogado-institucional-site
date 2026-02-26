"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CustomScrollbar({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [thumbHeight, setThumbHeight] = useState(40);
  const [isVisible, setIsVisible] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Define o espaçamento das bordas (topo e fundo)
  const OFFSET = 8;

  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });

  // AJUSTE: O range de saída (output) agora começa em OFFSET
  // e termina antes do fundo (altura total - tamanho da barra - offset)
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [OFFSET, containerHeight - thumbHeight - OFFSET],
  );

  const smoothY = useSpring(y, { stiffness: 400, damping: 40 });

  useEffect(() => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;

    const updateSize = () => {
      const { clientHeight, scrollHeight } = container;
      setContainerHeight(clientHeight);

      const ratio = clientHeight / scrollHeight;
      // Ajustamos o cálculo da altura da barra para considerar o espaço reduzido pelos offsets
      const availableHeight = clientHeight - OFFSET * 2;
      setThumbHeight(ratio >= 1 ? 0 : Math.max(ratio * availableHeight, 40));
    };

    const handleScroll = () => {
      setIsVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsVisible(false), 1000);
    };

    updateSize();
    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateSize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateSize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [scrollRef]);

  if (thumbHeight === 0) return null;

  return (
    <motion.div
      // Removemos as classes top-1 e bottom-1 e deixamos o container ocupar tudo
      // A lógica do OFFSET dentro do useTransform cuidará do espaçamento.
      className="pointer-events-none absolute inset-y-2 right-0 z-50 mr-1 w-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        style={{
          height: thumbHeight,
          y: smoothY,
        }}
        className="w-0.75 rounded-full bg-[#c5a47e] shadow-sm"
      />
    </motion.div>
  );
}
