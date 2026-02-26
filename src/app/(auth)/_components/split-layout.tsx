"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface SplitLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  src?: string;
}

export const SplitLayout = ({
  children,
  title,
  subtitle,
  src = "/roceria/Queijo Minas Curado 1.png",
}: SplitLayoutProps) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f1f1f1] text-[#141414] selection:bg-[#fbb725]/30">
      {/* Textura de fundo sutil (Papel ou Madeira) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply">
        <Image
          src="/assets/others/background-texture.svg"
          alt="Textura ROCERIA"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto grid min-h-screen w-full max-w-[1400px] lg:grid-cols-2">
        {/* LADO ESQUERDO: Editorial Spotlight */}
        <aside className="hidden flex-col justify-between p-12 lg:flex xl:p-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative size-12 overflow-hidden rounded-xl bg-[#141414] p-2 transition-transform group-hover:rotate-12">
                <Image
                  src="/assets/logos/roceria_logo-p.svg"
                  alt="ROCERIA"
                  width={40}
                  height={40}
                />
              </div>
              <span className="font-bitter text-xs font-black tracking-[0.4em] text-[#141414] uppercase">
                ROCERIA
              </span>
            </Link>

            <div className="space-y-6">
              <h1 className="font-bitter text-[clamp(3rem,5vw,5rem)] leading-[0.85] font-light tracking-tighter text-[#141414]">
                {title.split(" ").slice(0, -1).join(" ")} <br />
                <span className="font-black text-[#fbb725]">
                  {title.split(" ").slice(-1)}
                </span>
              </h1>
              <p className="max-w-md border-l-2 border-[#fbb725]/20 pl-6 text-base leading-relaxed font-light text-[#141414]/50">
                {subtitle}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[3rem] border border-[#141414]/5 bg-white shadow-2xl"
          >
            <Image
              src={src}
              alt="Destaque ROCERIA"
              fill
              className="object-cover transition-transform duration-1000 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/20 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 flex items-center gap-3">
              <div className="size-2 animate-pulse rounded-full bg-[#fbb725]" />
              <span className="text-[10px] font-bold tracking-widest text-white uppercase drop-shadow-md">
                Produto Original da Roça
              </span>
            </div>
          </motion.div>
        </aside>

        {/* LADO DIREITO: O Formulário */}
        <main className="flex w-full items-center justify-center p-6 lg:p-12 xl:p-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[440px] space-y-10 rounded-[3rem] border border-[#141414]/5 bg-white p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] md:p-12"
          >
            {/* Header Mobile */}
            <div className="flex flex-col items-center text-center lg:hidden">
              <Image
                src="/assets/logos/roceria_logo-p.svg"
                alt="ROCERIA"
                width={60}
                height={60}
                className="mb-6"
              />
              <h1 className="font-bitter text-4xl font-light tracking-tighter">
                {title}
              </h1>
            </div>

            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};
