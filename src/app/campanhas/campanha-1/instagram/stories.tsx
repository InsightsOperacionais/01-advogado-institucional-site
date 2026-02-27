/* eslint-disable react/no-unescaped-entities */
"use client";

import { BookOpen, Film } from "lucide-react";
import { useState } from "react";

export const InstagramStory = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex aspect-[9/16] w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0b] p-6 transition-all duration-300 hover:scale-[1.02]">
      {children}
    </div>
  );
};

// Story 1 - História e Fundação (mesmo design do Post1)
export function Story1() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle="Von Marins desde 1994"
        caption={[
          "Fundada em 1994, a Von Marins nasceu com um propósito claro: oferecer advocacia de excelência para quem busca mais do que serviços jurídicos, mas sim parceria estratégica.",
          "Por mais de três décadas, construímos uma trajetória sólida na Avenida Paulista, consolidando nossa reputação como banca de referência em direito societário, sucessório e tributário.",
        ]}
        hashtags={[
          "#VonMarins",
          "#1994",
          "#AvPaulista",
          "#AdvocaciaBoutique",
          "#TradiçãoJurídica",
        ]}
      />
      <InstagramStory>
        <div className="flex h-full flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="h-px w-6 bg-[#c5a47e]/50" />
              <span className="mt-1 text-[10px] font-bold tracking-widest text-[#c5a47e] uppercase">
                História
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-white/5 p-2 transition-colors hover:bg-[#c5a47e]/20"
            >
              <BookOpen size={14} className="text-[#c5a47e]" />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h3 className="mb-4 text-2xl leading-tight font-light tracking-tight text-white">
              Von Marins <br />
              <span className="font-bold text-white">desde 1994</span>
            </h3>
            <p className="max-w-[85%] text-xs leading-relaxed font-light opacity-70">
              Três décadas de excelência jurídica na{" "}
              <span className="font-bold">Avenida Paulista</span>.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
            <div className="text-[9px] font-bold tracking-widest text-[#c5a47e] uppercase">
              Nossa História
            </div>
            <div className="text-[10px] text-white/20 italic">@vonmarins</div>
          </div>
        </div>
      </InstagramStory>
    </>
  );
}

// Story 2 - Sede Av. Paulista (mesmo design do Post2)
export function Story2() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle="Sede Av. Paulista"
        caption={[
          "Localizada no coração financeiro do país, nossa sede na Avenida Paulista foi projetada para oferecer um ambiente high-end, equipado com tecnologia de ponta para conexões globais.",
          "Cada detalhe foi pensado para proporcionar a segurança e a discrição que estruturas patrimoniais complexas exigem.",
        ]}
        hashtags={[
          "#AvPaulista",
          "#ArquiteturaJurídica",
          "#HighEnd",
          "#SigiloProfissional",
          "#SãoPaulo",
        ]}
      />
      <InstagramStory>
        <div className="flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-2 w-2 rounded-full bg-[#c5a47e]" />
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-white/5 p-2 transition-colors hover:bg-[#c5a47e]/20"
            >
              <BookOpen size={14} className="text-[#c5a47e]" />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center space-y-4">
            <div className="border-l-2 border-white/10 pl-4">
              <span className="block text-xl font-bold text-white">
                Av. Paulista, 2000
              </span>
              <span className="text-[10px] tracking-widest text-white/40 uppercase">
                18º Andar
              </span>
            </div>
            <div className="border-l-2 border-white/10 pl-4">
              <span className="block text-xl font-bold text-white">
                High-End
              </span>
              <span className="text-[10px] tracking-widest text-white/40 uppercase">
                tecnologia e sigilo absoluto
              </span>
            </div>
            <p className="pt-4 text-lg leading-snug font-light text-white/90">
              Onde a estratégia <br />
              <span className="font-bold text-[#c5a47e] italic">
                encontra a perenidade
              </span>
            </p>
          </div>

          <div className="mt-4 text-[10px] font-bold tracking-widest text-[#c5a47e] uppercase">
            Sede Matriz
          </div>
        </div>
      </InstagramStory>
    </>
  );
}

// Story 3 - Os Sócios (mesmo design do Post3)
export function Story3() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle="Liderança Estratégica"
        caption={[
          "Dr. Alexandre Marins, Sócio Fundador, com 25 anos de experiência em Direito Societário e Planejamento Sucessório.",
          "Dra. Beatriz von Marins, Sócia de Capital, Mestre em Direito Tributário Internacional pela LSE.",
        ]}
        hashtags={[
          "#Liderança",
          "#Sócios",
          "#AlexandreMarins",
          "#BeatrizVonMarins",
          "#LSE",
        ]}
      />
      <InstagramStory>
        <div className="flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-px w-12 bg-white/10" />
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-white/5 p-2 transition-colors hover:bg-[#c5a47e]/20"
            >
              <BookOpen size={14} className="text-[#c5a47e]" />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center space-y-6">
            <div className="relative border-l-[3px] border-[#c5a47e] pl-6">
              <h4 className="text-2xl font-bold tracking-tighter text-white">
                Dr. Alexandre Marins
              </h4>
              <p className="text-[11px] leading-relaxed font-light text-white/60">
                Sócio Fundador • 25 anos
              </p>
            </div>
            <div className="relative border-l-[3px] border-[#c5a47e] pl-6">
              <h4 className="text-2xl font-bold tracking-tighter text-white">
                Dra. Beatriz von Marins
              </h4>
              <p className="text-[11px] leading-relaxed font-light text-white/60">
                Sócia de Capital • LSE
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="h-1 w-8 rounded-full bg-[#c5a47e]/30" />
          </div>
        </div>
      </InstagramStory>
    </>
  );
}

// Story 4 - Societário e M&A (mesmo design do Post4)
export function Story4() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle="Societário e M&A"
        caption={[
          "Fusões, aquisições, reestruturações societárias e acordos de sócios de alta complexidade.",
          "Due diligence rigorosa, negociação estratégica e estruturação de earn-outs que protegem os interesses dos clientes.",
        ]}
        hashtags={[
          "#M&A",
          "#FusõesEAquisições",
          "#DireitoSocietário",
          "#DueDiligence",
          "#CorporateLaw",
        ]}
      />
      <InstagramStory>
        <div className="flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-px w-8 bg-[#c5a47e]/40" />
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-white/5 p-2 transition-colors hover:bg-[#c5a47e]/20"
            >
              <BookOpen size={14} className="text-[#c5a47e]" />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
              <p className="text-sm leading-relaxed text-white/90">
                Fusões e Aquisições <br />
                <span className="font-bold">de alta complexidade</span>
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
              <p className="text-sm leading-relaxed text-white/90">
                Due Diligence <span className="font-bold">rigorosa</span>
              </p>
            </div>
          </div>

          <div className="mt-4 text-[10px] font-bold tracking-widest text-[#c5a47e] uppercase">
            M&A • Private Equity
          </div>
        </div>
      </InstagramStory>
    </>
  );
}

// Story 5 - Engenharia Fiscal (mesmo design do Post5)
export function Story5() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle="Engenharia Fiscal"
        caption={[
          "Arquitetura tributária inteligente para grandes fortunas e grupos multinacionais.",
          "Otimização da carga fiscal com absoluta conformidade e proteção patrimonial.",
        ]}
        hashtags={[
          "#EngenhariaFiscal",
          "#PlanejamentoTributário",
          "#OtimizaçãoFiscal",
          "#GrandesFortunas",
          "#ComplianceFiscal",
        ]}
      />
      <InstagramStory>
        <div className="flex h-full flex-col">
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-white/5 p-2 transition-colors hover:bg-[#c5a47e]/20"
            >
              <BookOpen size={14} className="text-[#c5a47e]" />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <span className="font-serif text-3xl text-[#c5a47e] opacity-50">
              “
            </span>
            <h3 className="mb-4 text-xl font-light text-white/90">
              Inteligência tributária <br />
              <span className="font-bold">aplicada à proteção</span> de ativos
            </h3>

            <div className="mb-4 h-8 w-px bg-gradient-to-b from-[#c5a47e] to-transparent" />

            <div className="space-y-2">
              <div className="text-[10px] font-bold tracking-widest text-[#c5a47e] uppercase">
                Otimização Fiscal
              </div>
            </div>
          </div>

          <div className="mt-auto flex w-full items-center justify-between border-t border-white/5 pt-4">
            <div className="text-[8px] font-bold tracking-tighter text-white/20 uppercase">
              Tributário Estratégico
            </div>
            <div className="text-[8px] text-white/20">@vonmarins</div>
          </div>
        </div>
      </InstagramStory>
    </>
  );
}

// Story 6 - Governança Sucessória (mesmo design do Post6)
export function Story6() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle="Governança Sucessória"
        caption={[
          "Estruturação de holdings familiares e protocolos de família para preservação de legados multigeracionais.",
          "Construindo pontes entre gerações com harmonia e segurança jurídica.",
        ]}
        hashtags={[
          "#GovernançaSucessória",
          "#HoldingsFamiliares",
          "#PlanejamentoSucessório",
          "#Legado",
          "#ProtocolosDeFamília",
        ]}
      />
      <InstagramStory>
        <div className="flex h-full flex-col">
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-white/5 p-2 transition-colors hover:bg-[#c5a47e]/20"
            >
              <BookOpen size={14} className="text-[#c5a47e]" />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="relative mb-6 flex h-32 w-full items-center justify-center opacity-40">
              <span className="text-[100px] grayscale select-none">🌳</span>
            </div>

            <h2 className="text-center text-4xl font-light tracking-tighter text-white">
              Legados <br />
              <span className="font-bold">Familiares</span>
            </h2>
          </div>

          <div className="mt-auto flex w-full flex-col items-center">
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1">
              <span className="text-[8px] font-bold tracking-[0.3em] text-white/60 uppercase">
                Holdings • Protocolos
              </span>
            </div>
          </div>
        </div>
      </InstagramStory>
    </>
  );
}

// Story 7 - Capital Intelectual (mesmo design do Post7)
export function Story7() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle="Capital Intelectual"
        caption={[
          "Advogados selecionados pela capacidade analítica e formação internacional.",
          "Educação continuada em Harvard, LSE e FGV - vanguarda do pensamento jurídico global.",
        ]}
        hashtags={[
          "#CapitalIntelectual",
          "#HarvardLaw",
          "#LSE",
          "#FGV",
          "#EducaçãoContinuada",
        ]}
      />
      <InstagramStory>
        {/* Fundo com efeito de malha tecnológica sutil */}
        <div className="absolute inset-0 [background-image:radial-gradient(#c5a47e_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

        <div className="z-10 flex h-full flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#c5a47e]" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase">
                Formação
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-white/5 p-2 transition-all hover:scale-110 hover:bg-[#c5a47e]/20"
            >
              <BookOpen size={14} className="text-[#c5a47e]" />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center">
            <h2 className="mb-2 text-3xl leading-none font-extrabold tracking-tighter text-white">
              CAPITAL <br />
              <span className="font-light text-[#c5a47e]">INTELECTUAL</span>
            </h2>

            <div className="mb-4 h-1 max-w-[150px] bg-gradient-to-r from-[#c5a47e] to-transparent" />

            <p className="text-xs leading-relaxed font-light text-white/70 italic">
              "Formação internacional <br /> na vanguarda jurídica."
            </p>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-white/5 bg-white/5 p-2 backdrop-blur-md">
              <span className="mb-1 block text-[8px] tracking-widest text-[#c5a47e] uppercase">
                Harvard
              </span>
            </div>
            <div className="rounded-lg border border-white/5 bg-white/5 p-2 backdrop-blur-md">
              <span className="mb-1 block text-[8px] tracking-widest text-[#c5a47e] uppercase">
                LSE
              </span>
            </div>
          </div>
        </div>
      </InstagramStory>
    </>
  );
}

// Story 8 - IA Jurídica (mesmo design do Post8)
export function Story8() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle="IA Jurídica e Inovação"
        caption={[
          "Pioneiros na implementação de protocolos de inteligência artificial para análise preditiva.",
          "Plataforma proprietária Von IA: decisões baseadas em dados, não em suposições.",
        ]}
        hashtags={[
          "#IAJurídica",
          "#LegalTech",
          "#Inovação",
          "#InteligênciaArtificial",
          "#VonIA",
        ]}
      />
      <InstagramStory>
        <div className="z-10 flex h-full flex-col">
          <div className="flex justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-xl"
            >
              <BookOpen size={14} className="text-[#c5a47e]" />
            </button>
          </div>

          <div className="relative flex flex-1 flex-col items-center justify-center">
            {/* Círculos concêntricos */}
            <div className="absolute h-48 w-48 animate-[ping_5s_infinite] rounded-full border border-white/5" />
            <div className="absolute h-32 w-32 rounded-full border border-[#c5a47e]/10" />

            <h3 className="mb-2 text-center text-[8px] tracking-[0.5em] text-[#c5a47e] uppercase">
              Pioneiros
            </h3>
            <h2 className="text-center text-4xl font-bold tracking-tighter text-white">
              VON <br />
              <span className="font-thin italic">IA</span>
            </h2>
          </div>

          <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-3 text-[7px] tracking-widest text-white/40 uppercase">
            <span>Análise</span>
            <span>Dados</span>
            <span>Preditiva</span>
          </div>
        </div>
      </InstagramStory>
    </>
  );
}

// Story 9 - Legado e Call to Action (mesmo design do Post9)
export function Story9() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle="Legados que Perduram"
        caption={[
          "Arquitetura jurídica para que a estratégia encontre a perenidade.",
          "Construímos pontes entre o presente e o futuro, entre o patrimônio construído e o legado que se quer deixar.",
        ]}
        hashtags={[
          "#Legado",
          "#Perenidade",
          "#ArquiteturaJurídica",
          "#ProteçãoPatrimonial",
          "#VonMarins",
        ]}
      />
      <InstagramStory>
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="font-serif text-[40px] leading-none text-[#c5a47e] select-none">
              “
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-white/5 p-2"
            >
              <BookOpen size={14} className="text-[#c5a47e]" />
            </button>
          </div>

          <div className="max-w-[90%]">
            <h2 className="text-2xl leading-tight font-light text-white">
              Para quem entende que o <br />
              <span className="font-bold">sucesso</span> só é real quando se
              torna um <span className="text-[#c5a47e] italic">legado.</span>
            </h2>
          </div>

          <div className="space-y-3">
            <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent" />

            <button className="w-full rounded-xl border border-[#c5a47e]/40 bg-white/5 px-4 py-3 transition-all hover:bg-[#c5a47e]/10">
              <span className="text-[9px] font-bold tracking-widest text-white uppercase">
                Agende uma Consulta
              </span>
            </button>

            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold tracking-widest text-white uppercase">
                Von Marins
              </span>
              <div className="text-[9px] font-light text-white/20">
                @vonmarins
              </div>
            </div>
          </div>
        </div>
      </InstagramStory>
    </>
  );
}

// Componente que renderiza a seção completa de stories
export function StoriesSection() {
  return (
    <section className="border-y border-white/5 bg-[#0d0d0e] py-16">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#c5a47e] uppercase">
              Conteúdo Efêmero
            </span>
            <h2 className="font-bitter text-3xl font-light lg:text-4xl">
              Stories{" "}
              <span className="text-[#c5a47e] italic">Estratégicos</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Film size={16} />
            <span>9 stories • Formato 9:16</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <Story1 />
          <Story2 />
          <Story3 />
          <Story4 />
          <Story5 />
          <Story6 />
          <Story7 />
          <Story8 />
          <Story9 />
        </div>

        {/* Legenda explicativa */}
        <div className="mt-8 text-center">
          <p className="mx-auto max-w-2xl text-xs text-white/30">
            Os stories serão publicados ao longo das 3 semanas de campanha,
            alternando entre apresentação institucional, pilares de atuação,
            diferenciais e calls-to-action para consulta estratégica.
          </p>
        </div>
      </div>
    </section>
  );
}

// Reutilizando o CaptionModal dos posts
const CaptionModal = ({
  isOpen,
  onClose,
  caption,
  hashtags,
  postTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  caption: string[];
  hashtags: string[];
  postTitle: string;
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullCaption = [...caption, "", hashtags.join(" ")].join("\n");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0d0d0e] p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full border border-white/5 bg-white/5 p-2 text-white/40 transition-colors hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <h3 className="font-bitter text-2xl font-bold">{postTitle}</h3>
          <p className="text-sm text-white/40">
            Sugestão de legenda para o story
          </p>
        </div>

        <div className="mb-6 max-h-60 overflow-y-auto rounded-xl border border-white/5 bg-[#0a0a0b] p-4">
          <div className="space-y-4">
            {caption.map((paragraph, idx) => (
              <p key={idx} className="text-sm leading-relaxed text-white/80">
                {paragraph}
              </p>
            ))}
            <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4">
              {hashtags.map((tag, idx) => (
                <span key={idx} className="text-sm text-[#c5a47e]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-white/30">
            <Hash size={14} />
            <span>{hashtags.length} hashtags</span>
          </div>

          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 rounded-full bg-[#c5a47e] px-6 py-3 text-xs font-bold tracking-wider text-[#0a0a0b] uppercase transition-all hover:bg-[#d4b594]"
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copiar Legenda</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Ícones necessários
const X = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const Check = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const Copy = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const Hash = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);
