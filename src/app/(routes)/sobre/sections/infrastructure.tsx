"use client";
import Image from "next/image";

export function InfrastructureSection() {
  return (
    <div className="container mx-auto mt-40 px-4">
      <div className="grid h-[700px] grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="group relative overflow-hidden rounded-3xl lg:col-span-8">
          <Image
            src="/assets/team/office-1.png"
            alt="Office Main"
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute bottom-8 left-8 z-10 text-white">
            <h4 className="font-bitter text-3xl font-light">Sede Matriz</h4>
            <p className="text-xs tracking-widest uppercase opacity-60">
              São Paulo, Brasil
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="grid grid-rows-2 gap-6 lg:col-span-4">
          <div className="relative flex flex-col justify-end overflow-hidden rounded-3xl bg-[#0a0a0b] p-8">
            <h4 className="font-bitter text-2xl text-[#c5a47e]">
              Infraestrutura High-End
            </h4>
            <p className="mt-4 text-xs leading-relaxed text-white/40">
              Salas de conferência equipadas com tecnologia de ponta para
              conexões globais.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src="/assets/team/office-2.png"
              alt="Meeting Room"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
