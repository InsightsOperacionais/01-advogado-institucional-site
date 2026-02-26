"use client";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export function FeaturedPost() {
  return (
    <Link href="/insights/artigo-exemplo" className="group block">
      <div className="flex flex-col overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-2xl shadow-black/10 lg:flex-row">
        <div className="aspect-video overflow-hidden lg:aspect-auto lg:w-1/2">
          <img
            src="/assets/team/blog-1.png"
            className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            alt="Destaque"
          />
        </div>
        <div className="flex flex-col justify-center p-10 lg:w-1/2 lg:p-20">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-[10px] font-black tracking-widest text-[#c5a47e] uppercase">
              Tese em Destaque
            </span>
            <span className="flex items-center gap-1 text-[10px] text-black/30">
              <Clock size={12} /> 8 min de leitura
            </span>
          </div>
          <h2 className="font-bitter text-3xl leading-tight font-light text-[#0a0a0b] transition-colors group-hover:text-[#c5a47e] lg:text-5xl">
            A Nova Fronteira da Responsabilidade Civil na{" "}
            <span className="font-black">Inteligência Artificial</span>
          </h2>
          <p className="mt-8 leading-relaxed font-light text-black/50">
            Uma análise profunda sobre os impactos jurídicos das decisões
            automatizadas e o novo nexo de causalidade no Direito Brasileiro.
          </p>
          <div className="mt-12 flex items-center gap-4 text-[10px] font-bold tracking-widest text-[#0a0a0b] uppercase">
            Ler Artigo Completo{" "}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-2"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
