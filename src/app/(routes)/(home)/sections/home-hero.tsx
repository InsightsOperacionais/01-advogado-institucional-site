"use client";

import { ElementReveal } from "@/components/layout/element-reveal";
import { motion } from "framer-motion";
import { ArrowDown, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

// ===== HERO SECTION - Versão Roça com Vídeo ou Imagem =====
export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-[#f1f1f1]">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 z-10 h-full w-full object-cover"
      >
        <source src="/assets/videos/roceria_banner.webm" type="video/webm" />
        {/* Fallback para imagem caso o vídeo não carregue */}
        <div className="absolute inset-0 bg-[url('/roceria-fazenda.jpg')] bg-cover bg-center" />
        Seu navegador não suporta vídeos HTML5.
      </video>

      {/* Overlay escuro para melhor contraste - tom mais forte que o original */}
      <div className="absolute inset-0 z-20 bg-[#141414]/50"></div>

      {/* Botões de Redes Sociais - Mantendo estilo mas com cores da marca */}
      <div className="absolute top-1/2 right-5 z-20 hidden -translate-y-1/2 flex-col gap-5 lg:right-3 lg:flex">
        {[
          { Icon: Instagram, delay: 3.4 },
          { Icon: Facebook, delay: 3.6 },
          { Icon: Twitter, delay: 3.8 },
        ].map((social, index) => (
          <motion.a
            key={index}
            href="#"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: social.delay,
            }}
            className="flex size-10 items-center justify-center rounded-full border border-[#fbb725]/30 bg-[#141414]/50 text-[#fbb725] backdrop-blur-md transition-colors hover:bg-[#fbb725] hover:text-[#141414] lg:size-12"
          >
            <social.Icon className="size-4 lg:size-5" />
          </motion.a>
        ))}
      </div>

      {/* Botão Scroll */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 lg:bottom-8">
        <motion.a
          key="scroll"
          href="#"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 4.2,
          }}
        >
          <button
            onClick={() => {
              const collectionSection = document.getElementById("bestsellers");
              if (collectionSection) {
                collectionSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <div>
              <ArrowDown className="size-5 animate-bounce cursor-pointer text-[#fbb725]/80 lg:size-6" />
            </div>
          </button>
        </motion.a>
      </div>

      {/* Conteúdo principal - Tema rural */}
      <div className="relative z-20 w-full max-w-7xl px-5 text-[#f1f1f1]">
        <div className="font-bitter text-3xl lg:text-4xl">
          <ElementReveal delay={2.1} className="lg:ml-38">
            O sabor
          </ElementReveal>{" "}
          <br />
          <ElementReveal delay={2.2}>autêntico </ElementReveal>{" "}
          <ElementReveal delay={2.3} className="font-bold text-[#fbb725]">
            da roça
          </ElementReveal>{" "}
          <br />
          <ElementReveal delay={2.4} className="text-[#fbb725]/80">
            na sua mesa
          </ElementReveal>
        </div>

        <ElementReveal delay={2.7} className="mt-5 p-2 lg:mt-0">
          <Link
            href="/shop"
            className="flex h-10 w-32 items-center justify-center rounded-full bg-[#fbb725] text-sm font-bold text-[#141414] shadow-lg transition-transform hover:scale-105 hover:bg-[#fbb725]/80 active:scale-95 lg:w-42"
          >
            COMPRAR
          </Link>
        </ElementReveal>

        <div className="mt-5 text-right text-3xl font-extralight lg:-mt-10 lg:text-5xl">
          <ElementReveal delay={2.8}>tradição, </ElementReveal>{" "}
          <ElementReveal delay={2.9} className="font-bold text-[#fbb725]">
            afeto
          </ElementReveal>{" "}
          <br />
          <ElementReveal delay={3.0}>e qualidade</ElementReveal>
        </div>

        <div className="mt-10 text-left text-3xl font-extralight lg:mt-20 lg:text-5xl">
          <ElementReveal delay={2.1} className="font-bold text-[#fbb725]">
            + 50
          </ElementReveal>{" "}
          <br />
          <div className="flex flex-col gap-0">
            <ElementReveal
              delay={2.6}
              className="w-full max-w-xs text-sm leading-relaxed font-light tracking-widest text-[#f1f1f1]/80 lg:w-80 lg:text-base"
            >
              Produtos artesanais direto do produtor rural
            </ElementReveal>
            <ElementReveal
              delay={2.8}
              className="w-full max-w-xs text-sm leading-relaxed font-light tracking-widest text-[#f1f1f1]/80 lg:w-80 lg:text-base"
            >
              Receitas tradicionais, produção familiar e ingredientes
              selecionados.
            </ElementReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
