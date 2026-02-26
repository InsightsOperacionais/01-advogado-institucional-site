"use client";
import { ElementReveal } from "@/components/layout/element-reveal";

export function HeroSobre() {
  return (
    <section className="relative flex h-[80vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-black/60" />
        <img
          src="/assets/images/about-hero.jpg"
          className="h-full w-full scale-110 object-cover blur-[2px]"
          alt="Legacy"
        />
      </div>

      <div className="relative z-20 container mx-auto px-6 text-center">
        <ElementReveal>
          <span className="mb-8 block text-[10px] font-bold tracking-[0.6em] text-[#c5a47e] uppercase">
            Nossa Trajetória
          </span>
        </ElementReveal>
        <h1 className="font-bitter text-5xl leading-tight font-light text-white lg:text-8xl">
          A tradição é o nosso <br />
          <span className="font-normal text-[#c5a47e] italic">alicerce</span>, o
          futuro a <br />
          <span className="font-black">nossa meta.</span>
        </h1>
      </div>
    </section>
  );
}
