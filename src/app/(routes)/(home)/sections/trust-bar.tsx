"use client";
import { motion } from "framer-motion";

const BADGES = [
  "OAB/SP",
  "CHAMBERS GLOBAL",
  "LEGAL 500",
  "INSTITUTO DOS ADVOGADOS",
  "CERTIFICAÇÃO ISO 9001",
];

export function TrustBar() {
  return (
    <div className="w-full border-y border-black/5 bg-white/50 py-8 backdrop-blur-sm">
      <div className="container mx-auto flex flex-wrap justify-center gap-8 px-6 md:gap-16 lg:justify-between">
        {BADGES.map((badge, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            transition={{ delay: i * 0.1 }}
            className="text-[10px] font-bold tracking-[0.4em] text-[#0a0a0b] grayscale"
          >
            {badge}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
