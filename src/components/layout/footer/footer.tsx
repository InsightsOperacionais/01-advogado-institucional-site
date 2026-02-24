// ===== FOOTER SECTION - Estilo Rural Premium =====
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-[#141414] pt-24 pb-12 text-[#f1f1f1]">
      {/* Detalhe de Luxo: Linha de Gradiente Superior Dourada */}
      <div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#fbb725]/30 to-transparent" />

      {/* Brilho de fundo sutil dourado */}
      <div className="absolute -top-24 left-1/2 size-[500px] -translate-x-1/2 rounded-full bg-[#fbb725]/5 blur-[120px]" />

      <div className="relative container mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Coluna 1: Branding e Manifesto */}
          <div className="flex flex-col lg:col-span-5">
            <Link href="/" className="group inline-block">
              <h3 className="font-bitter text-4xl font-light tracking-[0.1em] text-[#f1f1f1] transition-colors group-hover:text-[#fbb725]">
                ROCERIA
              </h3>
              <p className="mt-2 text-[10px] font-bold tracking-[0.4em] text-[#fbb725]/60 uppercase">
                Produtos da Roça
              </p>
            </Link>

            <p className="mt-8 max-w-sm text-sm leading-relaxed font-light text-[#f1f1f1]/60">
              Direto do produtor rural para sua casa. Preservamos receitas
              tradicionais passadas por gerações, com o cuidado de quem valoriza
              a boa comida e a produção artesanal.
            </p>

            {/* Newsletter Minimalista */}
            <div className="mt-10 max-w-sm">
              <p className="text-[10px] font-bold tracking-widest text-[#fbb725]/80 uppercase">
                Receba novidades da roça
              </p>
              <div className="transition-focus-within:border-[#fbb725] mt-4 flex border-b border-[#f1f1f1]/20 pb-2">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="w-full bg-transparent text-xs font-light outline-none placeholder:text-[#f1f1f1]/40"
                />
                <button className="text-[10px] font-bold tracking-tighter text-[#fbb725] hover:text-[#fbb725]/80">
                  QUERO SABER
                </button>
              </div>
            </div>
          </div>

          {/* Colunas de Navegação: Links Rápidos */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {/* Produtos */}
            <div>
              <h4 className="font-bitter text-xs font-bold tracking-[0.2em] text-[#fbb725] uppercase">
                Produtos
              </h4>
              <ul className="mt-8 space-y-4">
                {[
                  "Queijos Artesanais",
                  "Embutidos Defumados",
                  "Temperos & Molhos",
                  "Conservas",
                  "Doces Caseiros",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="group flex items-center text-xs font-light text-[#f1f1f1]/60 transition-colors hover:text-[#fbb725]"
                    >
                      <span className="h-px w-0 bg-[#fbb725] transition-all group-hover:mr-2 group-hover:w-3" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sobre */}
            <div>
              <h4 className="font-bitter text-xs font-bold tracking-[0.2em] text-[#fbb725] uppercase">
                Conheça
              </h4>
              <ul className="mt-8 space-y-4">
                {[
                  "Nossa História",
                  "Famílias Produtoras",
                  "Processo Artesanal",
                  "Sustentabilidade",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-xs font-light text-[#f1f1f1]/60 transition-colors hover:text-[#fbb725]"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contato */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-bitter text-xs font-bold tracking-[0.2em] text-[#fbb725] uppercase">
                Contato
              </h4>
              <div className="mt-8 space-y-5">
                <a
                  href="#"
                  className="group flex items-center gap-3 text-xs font-light text-[#f1f1f1]/60 transition-colors hover:text-[#fbb725]"
                >
                  <Instagram className="size-3.5 stroke-[1.2] transition-transform group-hover:scale-110" />
                  <span>@roceria.artesanal</span>
                </a>
                <a
                  href="#"
                  className="group flex items-center gap-3 text-xs font-light text-[#f1f1f1]/60 transition-colors hover:text-[#fbb725]"
                >
                  <Mail className="size-3.5 stroke-[1.2]" />
                  <span>contato@roceria.com.br</span>
                </a>
                <a
                  href="#"
                  className="group flex items-center gap-3 text-xs font-light text-[#f1f1f1]/60 transition-colors hover:text-[#fbb725]"
                >
                  <Phone className="size-3.5 stroke-[1.2]" />
                  <span>(11) 99999-9999</span>
                </a>
                <div className="pt-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="size-3.5 shrink-0 stroke-[1.2] text-[#fbb725]/60" />
                    <p className="text-[10px] leading-relaxed text-[#f1f1f1]/40">
                      Estrada da Fazenda, km 42
                      <br />
                      Zona Rural - Minas Gerais
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selos de Qualidade */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 lg:gap-12">
          {[
            "Produção Familiar",
            "Artesanal",
            "Sem Conservantes",
            "Defumado no Fumeiro",
            "Safra Atual",
          ].map((selo) => (
            <span
              key={selo}
              className="text-[8px] font-bold tracking-[0.3em] text-[#fbb725]/40 uppercase"
            >
              {selo}
            </span>
          ))}
        </div>

        {/* Divisor de Seção com Icone Rural */}
        <div className="relative mt-16 flex items-center justify-center">
          <div className="h-[1px] w-full bg-[#f1f1f1]/10" />
          <div className="absolute bg-[#141414] px-6">
            <Wheat className="size-3 animate-pulse text-[#fbb725]/50" />
          </div>
        </div>

        {/* Copyright e Rodapé Final */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-transparent lg:flex-row">
          <div className="flex gap-8 text-[9px] font-bold tracking-[0.2em] text-[#fbb725]/40 uppercase">
            <span>Produção Familiar</span>
            <span>Feito no Brasil</span>
          </div>

          <p className="text-[10px] font-light tracking-widest text-[#f1f1f1]/30 lining-nums">
            © {currentYear} ROCERIA ARTESANAL. TODOS OS DIREITOS RESERVADOS.
          </p>

          <div className="flex items-center gap-4 text-[9px] font-bold tracking-widest text-[#f1f1f1]/30">
            <Link href="#" className="transition-colors hover:text-[#fbb725]">
              TERMOS
            </Link>
            <span className="text-[#f1f1f1]/10">|</span>
            <Link href="#" className="transition-colors hover:text-[#fbb725]">
              PRIVACIDADE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Import necessário para o Wheat icon
import { Wheat } from "lucide-react";
