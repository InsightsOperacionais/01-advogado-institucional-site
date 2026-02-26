"use client";

const PARTNERS = [
  {
    name: "Dr. Alexandre Marins",
    role: "Sócio Fundador",
    image: "/assets/team/partner1.jpg",
    desc: "Liderança institucional focada em Direito Societário e Planejamento Sucessório. Com 25 anos de prática, atua na preservação de grandes legados corporativos e familiares.",
  },
  {
    name: "Dra. Beatriz von Marins",
    role: "Sócia de Capital",
    image: "/assets/team/partner2.jpg",
    desc: "Mestre em Direito Tributário Internacional (LSE). Especialista em governança tributária e consultoria estratégica de Board para operações multinacionais.",
  },
];

export function PartnersGrid() {
  return (
    <div className="container mx-auto flex h-full max-h-screen flex-col justify-center px-6">
      {/* Header da Seção */}
      <div className="mb-12 shrink-0">
        <span className="text-[10px] font-bold tracking-[0.5em] text-[#c5a47e] uppercase">
          Liderança Estratégica
        </span>
        <h2 className="font-bitter mt-4 text-4xl font-light text-[#0a0a0b] lg:text-6xl">
          Sócios <span className="text-[#c5a47e] italic">Patrimoniais</span>
        </h2>
      </div>

      {/* Grid de Sócios */}
      <div className="custom-scrollbar grid grid-cols-1 gap-12 overflow-y-auto pr-4 pb-10 md:grid-cols-2 lg:gap-20">
        {PARTNERS.map((partner, index) => (
          <div
            key={index}
            className="group flex flex-col gap-8 md:flex-row md:items-center"
          >
            {/* Portrait do Sócio */}
            <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-2xl bg-[#f4f4f5] md:w-56 lg:w-64">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0a0b]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <img
                src={partner.image}
                alt={partner.name}
                className="h-full w-full object-cover grayscale transition-all duration-[1.5s] ease-out group-hover:scale-110 group-hover:grayscale-0"
              />
            </div>

            {/* Conteúdo Técnico */}
            <div className="flex flex-col border-l border-black/5 pl-8 transition-colors duration-500 group-hover:border-[#c5a47e]">
              <h3 className="font-bitter text-2xl font-bold text-[#0a0a0b] lg:text-3xl">
                {partner.name}
              </h3>
              <p className="mt-2 text-[10px] font-bold tracking-[0.3em] text-[#c5a47e] uppercase">
                {partner.role}
              </p>
              <p className="mt-6 text-sm leading-relaxed font-light text-black/50">
                {partner.desc}
              </p>

              <div className="mt-8 flex gap-6">
                <div className="h-[1px] w-8 bg-[#c5a47e]/30 transition-all duration-500 group-hover:w-16" />
                <span className="text-[9px] font-black tracking-widest text-black/20 uppercase transition-colors group-hover:text-[#c5a47e]">
                  Conselho Consultivo
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
