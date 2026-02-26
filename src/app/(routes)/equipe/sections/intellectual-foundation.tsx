"use client";

export function IntellectualFoundation() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
              Rigor Acadêmico
            </span>
            <h2 className="font-bitter mt-6 text-4xl font-light text-[#0a0a0b] lg:text-6xl">
              O Pedigree do{" "}
              <span className="text-[#c5a47e] italic">Conhecimento</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed font-light text-black/60">
              Na Von Marins, a advocacia é exercida como uma ciência de
              precisão. Nossa equipe é composta por profissionais formados nas
              instituições mais prestigiadas do mundo, onde o rigor intelectual
              é a base para a criação de teses inéditas e soluções de alta
              complexidade.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col justify-center rounded-3xl bg-[#f4f4f5] p-8">
              <span className="mb-2 text-3xl font-bold text-[#c5a47e]">
                +80%
              </span>
              <p className="text-[10px] font-bold tracking-widest text-black/40 uppercase">
                Mestres e Doutores
              </p>
            </div>
            <div className="flex flex-col justify-center rounded-3xl bg-[#0a0a0b] p-8 text-white">
              <span className="mb-2 text-3xl font-bold text-[#c5a47e]">
                Global
              </span>
              <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                Formação Internacional
              </p>
            </div>
            <div className="flex flex-col justify-center rounded-3xl bg-[#0a0a0b] p-8 text-white">
              <span className="mb-2 text-3xl font-bold text-[#c5a47e]">15</span>
              <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                Publicações Técnicas/Ano
              </p>
            </div>
            <div className="flex flex-col justify-center rounded-3xl bg-[#f4f4f5] p-8">
              <span className="mb-2 text-3xl font-bold text-[#c5a47e]">
                Rigor
              </span>
              <p className="text-[10px] font-bold tracking-widest text-black/40 uppercase">
                Cultura de Excelência
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
