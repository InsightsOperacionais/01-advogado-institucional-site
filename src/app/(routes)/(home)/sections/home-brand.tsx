"use client";

import { ElementReveal } from "@/components/layout/element-reveal";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Flame,
  Leaf,
  Sun,
  Timer,
  Wheat,
} from "lucide-react";
import { useState } from "react";

// ===== BRAND SECTION - Estilo Rural Premium =====
export function BrandSection() {
  return (
    <section className="relative flex w-full flex-col gap-6 rounded-4xl bg-[#141414] pt-16 text-[#f1f1f1]">
      <div className="container mx-auto px-6">
        <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          {/* Título com textura rústica */}
          <div className="font-bitter flex flex-col items-start text-5xl text-[#f1f1f1] lg:text-7xl">
            <ElementReveal>
              <span className="font-light text-[#fbb725]/60 italic">
                Mais <br /> que
              </span>
              <span className="ml-4 font-normal tracking-tighter">
                alimentos
              </span>
            </ElementReveal>

            <div className="mt-5 flex items-center gap-6 lg:gap-12">
              {/* Linha decorativa dourada */}
              <ElementReveal
                delay={0.2}
                className="h-px w-12 bg-[#fbb725]/50 lg:w-32"
              />

              <ElementReveal
                delay={0.3}
                className="pr-2 font-bold tracking-tighter text-[#fbb725]"
              >
                Histórias
              </ElementReveal>
            </div>

            <ElementReveal
              delay={0.4}
              className="font-light tracking-[0.2em] text-[#f1f1f1]/40 uppercase lg:mt-4 lg:text-5xl"
            >
              de família
            </ElementReveal>
          </div>

          {/* Descrição e Filosofia */}
          <div className="flex w-full max-w-sm flex-col gap-8 lg:mb-6">
            <ElementReveal delay={0.5} className="h-px w-16 bg-[#fbb725]/30" />

            <div className="text-sm leading-relaxed font-light text-[#f1f1f1]/60 lg:text-base">
              <ElementReveal delay={0.6}>
                A{" "}
                <span className="text-[10px] font-semibold tracking-widest text-[#fbb725] uppercase lg:text-xs">
                  Roceria
                </span>{" "}
                nasce do desejo de preservar receitas tradicionais passadas por
                gerações. Cada produto carrega o cuidado de quem valoriza a boa
                comida e a produção artesanal.
              </ElementReveal>
            </div>

            <ElementReveal delay={0.7}>
              <button className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.4em] text-[#fbb725] uppercase transition-all hover:gap-6">
                Nossa História
                <span className="h-px w-12 bg-[#fbb725]/30 transition-all group-hover:w-20 group-hover:bg-[#fbb725]" />
              </button>
            </ElementReveal>
          </div>
        </div>
      </div>

      {/* Área do Carrossel */}
      <div className="relative z-20 w-full overflow-hidden pt-5">
        <ElementReveal delay={0.8} threshold={0.1} width="full">
          <div className="pl-6 lg:pl-[calc((100vw-80rem)/2)]">
            <CardCarousel />
          </div>
        </ElementReveal>
      </div>

      {/* Detalhe de fundo: "EST. 2024" ou similar */}
      {/* <div className="pointer-events-none absolute right-10 bottom-10 z-10 hidden opacity-5 select-none lg:block">
        <span className="font-bitter text-9xl font-black text-[#fbb725]">
          TRADIÇÃO
        </span>
      </div> */}
    </section>
  );
}

const CARDS_DATA = [
  {
    id: 1,
    title: "Canastra de Ouro",
    desc: "Seguindo o ritual de gerações, nosso queijo é curado sobre pranchas de madeira nobre, desenvolvendo o mofo branco natural e o sabor da nossa terra.",
    ingredients: "Leite cru de gado Jersey, pingo tradicional, sal e paciência",
    time: "Maturação: 35 dias em madeira",
    icon: <Wheat className="size-full" />,
  },
  {
    id: 2,
    title: "Linguiça do Fumeiro",
    desc: "Carne suína selecionada, picada na faca e marinada em ervas da horta antes de repousar no fumeiro de lenha de laranjeira por dois dias inteiros.",
    ingredients: "Pernil suíno, pimenta calabresa, alho roxo, sal marinho",
    time: "Defumação: 48h em lenha frutífera",
    icon: <Flame className="size-full" />,
  },
  {
    id: 3,
    title: "Doce de Leite de Tacho",
    desc: "Leite fresco ordenhado ao amanhecer, cozido lentamente no tacho de cobre com fogo de chão, até atingir o ponto de corte e o tom de caramelo intenso.",
    ingredients: "Leite integral fresco, açúcar cristal, fava de baunilha",
    time: "Cozimento: 6h em tacho de cobre",
    icon: <Sun className="size-full" />,
  },
  {
    id: 4,
    title: "Macerado de Pimentas",
    desc: "Uma alquimia de pimentas malaguetas colhidas ao sol e curtidas em pequenos barris de carvalho com especiarias secretas da família.",
    ingredients: "Pimenta malagueta, vinagre de maçã artesanal, alho, louro",
    time: "Curtimenta: 90 dias em carvalho",
    icon: <Flame className="size-full" />,
  },
  {
    id: 5,
    title: "Mel de Florada Silvestre",
    desc: "Extraído a frio de colmeias localizadas no coração da serra, preservando o néctar das flores nativas e propriedades medicinais intactas.",
    ingredients: "100% Mel puro de abelhas nativas, sem filtragem térmica",
    time: "Safra Especial: Verão 2026",
    icon: <Leaf className="size-full" />,
  },
  {
    id: 6,
    title: "Goiabada Cascão Rústica",
    desc: "Goiabas vermelhas maduras cozidas com a própria casca em fogo baixo, resultando em uma textura granulada que derrete na boca. O par perfeito do nosso queijo.",
    ingredients: "Goiaba paluma, açúcar orgânico, suco de limão cravo",
    time: "Cozimento: 8h em fogão a lenha",
    icon: <Sun className="size-full" />,
  },
  {
    id: 7,
    title: "Palmito Pupunha Real",
    desc: "Corações de palmito extraídos de forma sustentável na manhã da colheita e conservados em salmoura de ervas finas para manter a crocância.",
    ingredients: "Coração de pupunha, água de nascente, sal, manjericão",
    time: "Envasado: 4h após a colheita",
    icon: <Leaf className="size-full" />,
  },
  {
    id: 8,
    title: "Bacon de Cura Seca",
    desc: "Barriga de porco curada a seco com sal e açúcar mascavo, defumada com serragem de macieira para um aroma adocicado e textura macia.",
    ingredients: "Barriga suína, açúcar mascavo, páprica defumada, sal",
    time: "Cura e Defumação: 5 dias",
    icon: <Flame className="size-full" />,
  },
  {
    id: 9,
    title: "Café de Terreiro",
    desc: "Grãos colhidos a dedo e secos ao sol em terreiros de pedra, com torra média artesanal que ressalta notas de chocolate e rapadura.",
    ingredients: "Grãos 100% Arábica de altitude, torra artesanal",
    time: "Secagem: 15 dias ao sol",
    icon: <Wheat className="size-full" />,
  },
  {
    id: 10,
    title: "Antipasto de Berinjela",
    desc: "Receita de imigrantes adaptada à roça: berinjelas grelhadas na brasa e conservadas em azeite extra virgem com um toque de defumação.",
    ingredients: "Berinjela, azeite, pimentão, orégano, uvas passas",
    time: "Maturação em Azeite: 7 dias",
    icon: <Leaf className="size-full" />,
  },
];
export function CardCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () =>
    currentIndex < CARDS_DATA.length - 1 && setCurrentIndex((prev) => prev + 1);
  const prev = () => currentIndex > 0 && setCurrentIndex((prev) => prev - 1);

  return (
    <div className="flex h-100 w-full items-center gap-8 overflow-visible px-4 pb-10">
      {/* CONTROLES LATERAIS - ESTILO VERTICAL DARK/GOLD */}
      <div className="flex h-full w-24 flex-col items-center justify-between border-r border-[#fbb725]/10 py-10 pr-2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-bitter text-3xl font-light tracking-tighter text-[#fbb725]">
            0{currentIndex + 1}
          </span>
          <div className="h-16 w-px bg-linear-to-b from-[#fbb725] to-transparent opacity-20" />
          <span className="font-bitter text-xs text-[#f1f1f1]/20">
            0{CARDS_DATA.length}
          </span>
        </div>

        <div className="z-50 flex flex-col gap-4">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="group flex size-12 items-center justify-center rounded-full border border-[#fbb725]/30 bg-[#141414]/90 text-[#fbb725] backdrop-blur-md transition-all hover:bg-[#fbb725] hover:text-[#141414] disabled:opacity-10"
          >
            <ArrowLeft className="size-5 transition-transform duration-500 group-hover:-translate-x-1" />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= CARDS_DATA.length - 1}
            className="group flex size-12 items-center justify-center rounded-full border border-[#fbb725]/30 bg-[#141414]/90 text-[#fbb725] backdrop-blur-md transition-all hover:bg-[#fbb725] hover:text-[#141414] disabled:opacity-10"
          >
            <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* ÁREA DOS CARDS */}
      <div className="relative h-full flex-1 overflow-visible">
        <motion.div
          animate={{ x: `calc(-${currentIndex * 320}px)` }}
          transition={{ type: "spring", stiffness: 45, damping: 15 }}
          className="flex h-full items-center gap-8"
        >
          {CARDS_DATA.map((card, i) => {
            const isSelected = i === currentIndex;

            return (
              <motion.div
                key={card.id}
                animate={{
                  scale: isSelected ? 1 : 0.9,
                  opacity: isSelected ? 1 : 0.4,
                }}
                className={cn(
                  "relative flex min-w-70 flex-col justify-between rounded-[2rem] p-8 transition-all duration-500 lg:min-w-75",
                  isSelected
                    ? "z-30 h-full border border-[#fbb725]/20 bg-linear-to-br from-[#f1f1f1] to-white shadow-[0_40px_80px_-20px_rgba(251,183,37,0.18)]"
                    : "z-10 h-[85%] bg-[#f1f1f1]/50 blur-[1px]",
                )}
              >
                {/* ÍCONE FLUTUANTE - SELO DE QUALIDADE (Shadow Extra) */}
                <div
                  className={cn(
                    "absolute -top-5 -right-5 flex size-20 items-center justify-center rounded-full bg-[#141414] p-4 shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-all duration-700",
                    isSelected
                      ? "scale-100 rotate-0 opacity-100"
                      : "scale-50 rotate-12 opacity-0",
                  )}
                >
                  <div className="size-8 text-[#fbb725]">{card.icon}</div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black tracking-[0.3em] text-[#fbb725] uppercase">
                      Produção Familiar
                    </span>
                    <h3 className="font-bitter text-xl leading-tight font-medium text-[#141414] lg:text-2xl">
                      {card.title}
                    </h3>
                  </div>

                  <p className="line-clamp-3 text-xs leading-relaxed font-light text-[#141414]/60">
                    {card.desc}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-[#fbb725] uppercase">
                    <Timer className="size-3" />
                    <span>{card.time}</span>
                  </div>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 border-t border-[#fbb725]/10 pt-4"
                      >
                        <p className="mb-1 text-[8px] font-bold tracking-widest text-[#fbb725] uppercase">
                          Ingredientes
                        </p>
                        <p className="line-clamp-2 text-[10px] leading-relaxed text-[#141414]/60 italic">
                          {card.ingredients}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* NÚMERO DE FUNDO */}
                <span className="font-bitter pointer-events-none absolute right-8 bottom-6 text-6xl font-black text-[#fbb725]/10 lining-nums select-none">
                  0{card.id}
                </span>

                {/* HINT DE INTERAÇÃO (Substitui o botão para caber em 400px) */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-[#fbb725] uppercase"
                  >
                    <span className="h-px w-6 bg-[#fbb725]" />
                    Ver detalhes
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
