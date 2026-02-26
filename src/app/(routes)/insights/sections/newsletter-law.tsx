"use client";

export function NewsletterLaw() {
  return (
    <div className="container mx-auto px-6">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-[10px] font-bold tracking-[0.5em] text-[#c5a47e] uppercase">
          Conhecimento Exclusivo
        </span>
        <h2 className="font-bitter mt-6 mb-10 text-4xl font-light lg:text-6xl">
          O Briefing <span className="italic">Estratégico</span>
        </h2>
        <p className="mx-auto mb-12 max-w-2xl leading-relaxed font-light text-white/40">
          Assine nossa curadoria quinzenal e receba análises jurídicas de alto
          impacto direto no seu e-mail.
        </p>

        <form className="mx-auto flex max-w-lg flex-col gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="Seu e-mail corporativo"
            className="flex-1 rounded-full border border-white/10 bg-white/5 px-8 py-5 text-sm transition-colors outline-none focus:border-[#c5a47e]"
          />
          <button className="rounded-full bg-[#c5a47e] px-10 py-5 text-[10px] font-bold tracking-widest text-[#0a0a0b] uppercase transition-colors hover:bg-white">
            Assinar
          </button>
        </form>
      </div>
    </div>
  );
}
