"use client";
import { BookOpen, Scale } from "lucide-react";
import Image from "next/image";

export function TeamCulture() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 items-center gap-24 lg:grid-cols-2">
        <div>
          <span className="text-[10px] font-bold tracking-[0.5em] text-[#c5a47e] uppercase">
            Valores Internos
          </span>
          <h2 className="font-bitter mt-6 mb-8 text-4xl font-light lg:text-6xl">
            Excelência como <span className="italic">padrão</span>
          </h2>
          <p className="mb-12 leading-relaxed font-light text-white/50">
            Não acreditamos em advocacia de massa. Cada advogado em nossa firma
            é selecionado por sua capacidade analítica e compromisso ético.
            Investimos anualmente em educação continuada nas maiores capitais
            jurídicas do mundo.
          </p>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <BookOpen className="size-6 text-[#c5a47e]" />
              <h4 className="text-sm font-bold">Atualização Constante</h4>
              <p className="text-xs text-white/30">
                Produção acadêmica e presença em fóruns internacionais.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Scale className="size-6 text-[#c5a47e]" />
              <h4 className="text-sm font-bold">Rigor Técnico</h4>
              <p className="text-xs text-white/30">
                Dupla checagem em todas as peças processuais e pareceres.
              </p>
            </div>
          </div>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-3xl lg:aspect-video">
          {/* <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0a0b]/40 to-transparent" /> */}
          <Image
            src="/assets/team/equipe.jpg"
            alt="Equipe Von Marins em reunião estratégica"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-60"
          />
        </div>
      </div>
    </div>
  );
}
