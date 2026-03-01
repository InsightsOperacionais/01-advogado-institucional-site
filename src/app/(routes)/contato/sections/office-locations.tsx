import { ElementReveal } from "@/components/layout/element-reveal";
import { MapPin } from "lucide-react";

const OFFICES = [
  {
    city: "São Paulo",
    address: "Av. Paulista, 2000 - 18º Andar",
    region: "Bela Vista",
    phone: "+55 (11) 3000-0000",
  },
  {
    city: "Rio de Janeiro",
    address: "Av. Rio Branco, 500 - Sala 1201",
    region: "Centro",
    phone: "+55 (21) 2000-0000",
  },
];

export function OfficeLocations() {
  return (
    <section className="rounded-t-3xl bg-[#0a0a0b] py-24 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-20">
          <ElementReveal>
            <span className="text-[10px] font-bold tracking-[0.5em] text-[#c5a47e] uppercase">
              Presença Institucional
            </span>
            <h2 className="font-bitter mt-6 text-4xl font-light lg:text-6xl">
              Nossas <span className="text-[#c5a47e] italic">Sedes</span>
            </h2>
          </ElementReveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {OFFICES.map((office, i) => (
            <ElementReveal
              key={i}
              width="full"
              delay={i * 0.1}
              distance="24px"
              variant="card"
              className="group interactive-card interactive-card-dark relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#161617] p-12 transition-all duration-500 hover:border-[#c5a47e]/50 hover:bg-[#1a1a1c]"
            >
              <div className="relative z-10">
                <MapPin className="mb-8 size-12 p-2 text-[#c5a47e] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110" />

                <h3 className="font-bitter mb-4 text-3xl font-bold text-white">
                  {office.city}
                </h3>

                <p className="mb-8 text-sm leading-relaxed font-light text-white/40">
                  {office.address} <br />
                  <span className="text-[#c5a47e]/60">{office.region}</span>
                </p>

                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-[#c5a47e]/30" />
                  <p className="text-xs font-bold tracking-[0.2em] text-[#c5a47e] uppercase">
                    {office.phone}
                  </p>
                </div>
              </div>

              {/* Elemento Decorativo: Brilho de fundo no hover */}
              <div className="absolute -top-10 -right-10 size-40 rounded-full bg-[#c5a47e]/5 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />

              {/* Marca d'água sutil */}
              <div className="pointer-events-none absolute right-10 bottom-6 select-none">
                <span className="font-bitter text-8xl font-black text-white/[0.02] transition-colors group-hover:text-[#c5a47e]/5">
                  VON
                </span>
              </div>
            </ElementReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
