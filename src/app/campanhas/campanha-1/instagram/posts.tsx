/* eslint-disable react/no-unescaped-entities */
"use client";

import { BookOpen, Check, Copy, FileImage, Hash, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { PostDownload } from "./post-download";

export const InstagramPost = ({
  children,
  imageSrc,
}: {
  children: React.ReactNode;
  imageSrc: string;
}) => {
  return (
    <div className="group relative flex aspect-4/5 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0b] transition-all duration-300 hover:scale-[1.02]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt="Post background"
          fill
          className="object-cover opacity-30 transition-opacity group-hover:opacity-40"
          priority
        />
        {/* Overlay gradiente para melhor legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-6">{children}</div>
    </div>
  );
};

export const CaptionModal = ({
  isOpen,
  onClose,
  caption,
  hashtags,
  postTitle,
  imagePrompt,
}: {
  isOpen: boolean;
  onClose: () => void;
  caption: string[];
  hashtags: string[];
  postTitle: string;
  imagePrompt: string;
}) => {
  const [copied, setCopied] = useState<"caption" | "prompt" | null>(null);

  if (!isOpen) return null;

  const fullCaption = [...caption, "", hashtags.join(" ")].join("\n");

  const copyToClipboard = (text: string, type: "caption" | "prompt") => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
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
            Sugestão de legenda e prompt de imagem para o post
          </p>
        </div>

        {/* Legenda */}
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen size={14} className="text-[#c5a47e]" />
              <span className="text-xs font-bold tracking-widest text-white/60 uppercase">
                Legenda
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(fullCaption, "caption")}
              className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs transition-colors hover:bg-white/10"
            >
              {copied === "caption" ? (
                <>
                  <Check size={12} className="text-[#c5a47e]" />
                  <span className="text-[#c5a47e]">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
          <div className="max-h-40 overflow-y-auto rounded-xl border border-white/5 bg-[#0a0a0b] p-4">
            <div className="space-y-4">
              {caption.map((paragraph, idx) => (
                <p key={idx} className="text-sm leading-relaxed text-white/80">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Hashtags */}
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2">
            <Hash size={14} className="text-[#c5a47e]" />
            <span className="text-xs font-bold tracking-widest text-white/60 uppercase">
              Hashtags ({hashtags.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-2 rounded-xl border border-white/5 bg-[#0a0a0b] p-4">
            {hashtags.map((tag, idx) => (
              <span key={idx} className="text-sm text-[#c5a47e]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Image Prompt */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileImage size={14} className="text-[#c5a47e]" />
              <span className="text-xs font-bold tracking-widest text-white/60 uppercase">
                Image Prompt
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(imagePrompt, "prompt")}
              className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs transition-colors hover:bg-white/10"
            >
              {copied === "prompt" ? (
                <>
                  <Check size={12} className="text-[#c5a47e]" />
                  <span className="text-[#c5a47e]">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
          <div className="rounded-xl border border-white/5 bg-[#0a0a0b] p-4">
            <p className="text-sm text-white/80 italic">{imagePrompt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Post 1 - História e Fundação (1994)
export function Post1({
  onOpenCaption,
}: {
  onOpenCaption: (post: any) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const postData = {
    id: 1,
    title: "Von Marins desde 1994",
    caption: [
      "Fundada em 1994, a Von Marins nasceu com um propósito claro: oferecer advocacia de excelência para quem busca mais do que serviços jurídicos, mas sim parceria estratégica.",
      "Por mais de três décadas, construímos uma trajetória sólida na Avenida Paulista, consolidando nossa reputação como banca de referência em direito societário, sucessório e tributário.",
      "Nossa história é feita de confiança, rigor técnico e compromisso inegociável com o alto padrão.",
    ],
    hashtags: [
      "#VonMarins",
      "#1994",
      "#AvPaulista",
      "#AdvocaciaBoutique",
      "#DireitoSocietário",
      "#TradiçãoJurídica",
      "#AltoPadrão",
      "#Excelência",
    ],
    imagePrompt:
      "Product photography, dramatic black background #141414. Von Marins law firm history concept, 1990s vintage aesthetic, mahogany wood panels, leather-bound books, bronze details. Logo VON MARINS anexada em dourado #fbb725 no canto inferior direito. 50mm lens, f/8, 1/125s, ISO 200. Colors: black #141414, gold #fbb725, white #f1f1f1. --ar 4:5 --style raw --quality 2 --stylize 1000",
  };

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle={postData.title}
        caption={postData.caption}
        hashtags={postData.hashtags}
        imagePrompt={postData.imagePrompt}
      />
      <InstagramPost imageSrc="/assets/team/posts/post-1.png">
        <div className="flex h-full flex-col">
          {/* Área dos botões (não será exportada) */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="h-px w-6 bg-[#c5a47e]/50" />
              <span className="mt-1 text-[10px] font-bold tracking-widest text-[#c5a47e] uppercase">
                História
              </span>
            </div>
            <div className="flex items-center gap-2">
              <PostDownload postId={postData.id} contentRef={contentRef} />
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-white/5 p-2 transition-colors hover:bg-[#c5a47e]/20"
                title="Ver legenda e hashtags"
              >
                <BookOpen size={14} className="text-[#c5a47e]" />
              </button>
            </div>
          </div>

          {/* Conteúdo visual do post (será exportado) */}
          <div ref={contentRef} className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <h3 className="mb-4 text-2xl leading-tight font-light tracking-tight text-white">
                Von Marins <br />
                <span className="font-bold text-white">desde 1994</span>
              </h3>
              <p className="max-w-[85%] text-xs leading-relaxed font-light opacity-70">
                Três décadas de excelência jurídica na{" "}
                <span className="font-bold">Avenida Paulista</span>. Solidez e
                compromisso com o alto padrão.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="text-[9px] font-bold tracking-widest text-[#c5a47e] uppercase">
                Nossa História
              </div>
              <div className="text-[10px] text-white/20 italic">@vonmarins</div>
            </div>
          </div>
        </div>
      </InstagramPost>
    </>
  );
}

// Post 2 - Sede Av. Paulista
export function Post2({
  onOpenCaption,
}: {
  onOpenCaption: (post: any) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const postData = {
    id: 2,
    title: "Sede Av. Paulista",
    caption: [
      "Localizada no coração financeiro do país, nossa sede na Avenida Paulista foi projetada para oferecer um ambiente high-end, equipado com tecnologia de ponta para conexões globais.",
      "Cada detalhe foi pensado para proporcionar a nossos clientes a segurança e a discrição que estruturas patrimoniais complexas exigem.",
      "Mais que um escritório, um hub estratégico para tomada de decisões.",
    ],
    hashtags: [
      "#AvPaulista",
      "#ArquiteturaJurídica",
      "#HighEnd",
      "#Tecnologia",
      "#SigiloProfissional",
      "#EscritórioPremium",
      "#SãoPaulo",
    ],
    imagePrompt:
      "Product photography, dramatic black background #141414. Modern luxury law office on Avenida Paulista, São Paulo, panoramic city view through floor-to-ceiling windows, contemporary Brazilian architecture, bronze and glass details. Logo VON MARINS anexada em dourado #fbb725 no canto inferior direito. 50mm lens, f/8, 1/125s, ISO 200. Colors: black #141414, gold #fbb725, white #f1f1f1. --ar 4:5 --style raw --quality 2 --stylize 1000",
  };

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle={postData.title}
        caption={postData.caption}
        hashtags={postData.hashtags}
        imagePrompt={postData.imagePrompt}
      />
      <InstagramPost imageSrc="/assets/team/posts/post-2.png">
        <div className="flex h-full flex-col">
          {/* Área dos botões (não será exportada) */}
          <div className="mb-4 flex items-center justify-between">
            <div className="h-2 w-2 rounded-full bg-[#c5a47e]" />
            <div className="flex items-center gap-2">
              <PostDownload postId={postData.id} contentRef={contentRef} />
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-white/5 p-2 transition-colors hover:bg-[#c5a47e]/20"
              >
                <BookOpen size={14} className="text-[#c5a47e]" />
              </button>
            </div>
          </div>

          {/* Conteúdo visual do post (será exportado) */}
          <div ref={contentRef} className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col justify-center space-y-6">
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
        </div>
      </InstagramPost>
    </>
  );
}

// Post 3 - Os Sócios (Liderança)
export function Post3({
  onOpenCaption,
}: {
  onOpenCaption: (post: any) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const postData = {
    id: 3,
    title: "Liderança Estratégica",
    caption: [
      "Dr. Alexandre Marins, Sócio Fundador, lidera nossa prática com 25 anos de experiência em Direito Societário e Planejamento Sucessório, dedicando-se à preservação de grandes legados.",
      "Dra. Beatriz von Marins, Sócia de Capital, é Mestre em Direito Tributário Internacional pela LSE e especialista em governança tributária para operações multinacionais.",
      "Juntos, formam a base de uma liderança comprometida com a excelência e a visão de futuro.",
    ],
    hashtags: [
      "#Liderança",
      "#Sócios",
      "#AlexandreMarins",
      "#BeatrizVonMarins",
      "#DireitoTributário",
      "#PlanejamentoSucessório",
      "#LSE",
      "#Excelência",
    ],
    imagePrompt:
      "Product photography, dramatic black background #141414. Two distinguished lawyers in a sophisticated law office, man in his 50s and woman in her 40s, elegant professional attire, Brazilian corporate leadership, confident expressions, modern office with city view. Logo VON MARINS anexada em dourado #fbb725 no canto inferior direito. 50mm lens, f/8, 1/125s, ISO 200. Colors: black #141414, gold #fbb725, white #f1f1f1. --ar 4:5 --style raw --quality 2 --stylize 1000",
  };

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle={postData.title}
        caption={postData.caption}
        hashtags={postData.hashtags}
        imagePrompt={postData.imagePrompt}
      />
      <InstagramPost imageSrc="/assets/team/posts/post-3.png">
        <div className="flex h-full flex-col">
          {/* Área dos botões (não será exportada) */}
          <div className="mb-4 flex items-center justify-between">
            <div className="h-px w-12 bg-white/10" />
            <div className="flex items-center gap-2">
              <PostDownload postId={postData.id} contentRef={contentRef} />
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-white/5 p-2 transition-colors hover:bg-[#c5a47e]/20"
              >
                <BookOpen size={14} className="text-[#c5a47e]" />
              </button>
            </div>
          </div>

          {/* Conteúdo visual do post (será exportado) */}
          <div ref={contentRef} className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col justify-center space-y-10">
              <div className="relative border-l-[3px] border-[#c5a47e] pl-6">
                <h4 className="text-2xl font-bold tracking-tighter text-white">
                  Dr. Alexandre Marins
                </h4>
                <p className="text-[11px] leading-relaxed font-light text-white/60">
                  Sócio Fundador • 25 anos <br /> Direito Societário
                </p>
              </div>
              <div className="relative border-l-[3px] border-[#c5a47e] pl-6">
                <h4 className="text-2xl font-bold tracking-tighter text-white">
                  Dra. Beatriz von Marins
                </h4>
                <p className="text-[11px] leading-relaxed font-light text-white/60">
                  Sócia de Capital • LSE <br /> Tributário Internacional
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="h-1 w-8 rounded-full bg-[#c5a47e]/30" />
            </div>
          </div>
        </div>
      </InstagramPost>
    </>
  );
}

// Post 4 - Societário e M&A
export function Post4({
  onOpenCaption,
}: {
  onOpenCaption: (post: any) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const postData = {
    id: 4,
    title: "Societário e M&A",
    caption: [
      "Nossa prática de Societário e M&A assessora operações de alta complexidade: fusões, aquisições, reestruturações societárias e acordos de sócios.",
      "Atuamos com due diligence rigorosa, negociação estratégica e estruturação de earn-outs que protegem os interesses de nossos clientes em cada etapa do deal.",
      "Transações seguras começam com assessoria jurídica de excelência.",
    ],
    hashtags: [
      "#M&A",
      "#FusõesEAquisições",
      "#DireitoSocietário",
      "#DueDiligence",
      "#EarnOut",
      "#CorporateLaw",
      "#DealFlow",
    ],
    imagePrompt:
      "Product photography, dramatic black background #141414. Corporate merger and acquisition meeting, boardroom with diverse executives reviewing documents, modern glass office building, confident business atmosphere, professional attire, strategic planning. Logo VON MARINS anexada em dourado #fbb725 no canto inferior direito. 50mm lens, f/8, 1/125s, ISO 200. Colors: black #141414, gold #fbb725, white #f1f1f1. --ar 4:5 --style raw --quality 2 --stylize 1000",
  };

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle={postData.title}
        caption={postData.caption}
        hashtags={postData.hashtags}
        imagePrompt={postData.imagePrompt}
      />
      <InstagramPost imageSrc="/assets/team/posts/post-4.png">
        <div className="flex h-full flex-col">
          {/* Área dos botões (não será exportada) */}
          <div className="mb-8 flex items-center justify-between">
            <div className="h-px w-8 bg-[#c5a47e]/40" />
            <div className="flex items-center gap-2">
              <PostDownload postId={postData.id} contentRef={contentRef} />
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-white/5 p-2 transition-colors hover:bg-[#c5a47e]/20"
              >
                <BookOpen size={14} className="text-[#c5a47e]" />
              </button>
            </div>
          </div>

          {/* Conteúdo visual do post (será exportado) */}
          <div ref={contentRef} className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col justify-center space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
                <p className="text-sm leading-relaxed text-white/90">
                  Fusões e Aquisições <br />
                  <span className="font-bold">de alta complexidade</span>
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
                <p className="text-sm leading-relaxed text-white/90">
                  Due Diligence <span className="font-bold">rigorosa</span> e
                  negociação estratégica
                </p>
              </div>

              <div className="pt-4">
                <p className="text-lg leading-snug font-light text-white/80">
                  Transações seguras começam com <br />
                  <span className="font-bold text-white">
                    assessoria jurídica de excelência
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-8 opacity-30">
              <span className="text-[10px] tracking-[0.2em] text-white uppercase">
                M&A • Private Equity
              </span>
            </div>
          </div>
        </div>
      </InstagramPost>
    </>
  );
}

// Post 5 - Engenharia Fiscal
export function Post5({
  onOpenCaption,
}: {
  onOpenCaption: (post: any) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const postData = {
    id: 5,
    title: "Engenharia Fiscal",
    caption: [
      "Engenharia Fiscal é a arte de estruturar a tributação de forma inteligente, reduzindo a carga impositiva sem jamais perder de vista a conformidade.",
      "Para grandes fortunas e grupos multinacionais, desenvolvemos arquiteturas tributárias que otimizam a alocação de recursos e protegem o patrimônio contra contingências.",
      "Planejamento tributário estratégico é vantagem competitiva.",
    ],
    hashtags: [
      "#EngenhariaFiscal",
      "#PlanejamentoTributário",
      "#OtimizaçãoFiscal",
      "#GrandesFortunas",
      "#Tributário",
      "#ComplianceFiscal",
    ],
    imagePrompt:
      "Product photography, dramatic black background #141414. Tax planning and financial strategy visualization, abstract representation of numbers and data, modern corporate aesthetic, blue and bronze color scheme, clean lines, professional atmosphere, digital art style. Logo VON MARINS anexada em dourado #fbb725 no canto inferior direito. 50mm lens, f/8, 1/125s, ISO 200. Colors: black #141414, gold #fbb725, white #f1f1f1. --ar 4:5 --style raw --quality 2 --stylize 1000",
  };

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle={postData.title}
        caption={postData.caption}
        hashtags={postData.hashtags}
        imagePrompt={postData.imagePrompt}
      />
      <InstagramPost imageSrc="/assets/team/posts/post-5.png">
        <div className="flex h-full flex-col">
          {/* Área dos botões (não será exportada) */}
          <div className="mb-4 flex justify-end">
            <div className="flex items-center gap-2">
              <PostDownload postId={postData.id} contentRef={contentRef} />
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-white/5 p-2 transition-colors hover:bg-[#c5a47e]/20"
              >
                <BookOpen size={14} className="text-[#c5a47e]" />
              </button>
            </div>
          </div>

          {/* Conteúdo visual do post (será exportado) */}
          <div ref={contentRef} className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <span className="font-serif text-3xl text-[#c5a47e] opacity-50">
                “
              </span>
              <h3 className="mb-6 text-xl font-light text-white/90">
                Inteligência tributária <br />
                <span className="font-bold">aplicada à proteção</span> de ativos
              </h3>

              <p className="mb-8 max-w-[80%] text-xs leading-relaxed font-light text-white/60">
                Arquitetura tributária para grupos corporativos e family offices
              </p>

              <div className="mb-8 h-8 w-px bg-gradient-to-b from-[#c5a47e] to-transparent" />

              <div className="space-y-2">
                <div className="text-[10px] font-bold tracking-widest text-[#c5a47e] uppercase">
                  Otimização Fiscal
                </div>
                <div className="text-[10px] font-bold tracking-widest text-[#c5a47e] uppercase">
                  Conformidade
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
        </div>
      </InstagramPost>
    </>
  );
}

// Post 6 - Governança Sucessória
export function Post6({
  onOpenCaption,
}: {
  onOpenCaption: (post: any) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const postData = {
    id: 6,
    title: "Governança Sucessória",
    caption: [
      "A Governança Sucessória vai além do planejamento patrimonial: é a construção de pontes entre gerações, garantindo que o legado construído ao longo de uma vida não se perca.",
      "Estruturamos holdings familiares, protocolos de família e acordos de sócios que previnem conflitos e asseguram a perpetuação do patrimônio com harmonia.",
      "Seu legado merece atravessar gerações.",
    ],
    hashtags: [
      "#GovernançaSucessória",
      "#HoldingsFamiliares",
      "#PlanejamentoSucessório",
      "#Legado",
      "#ProtocolosDeFamília",
      "#Herança",
    ],
    imagePrompt:
      "Product photography, dramatic black background #141414. Family legacy and succession planning, multigenerational family gathered in elegant living room, warm atmosphere, timeless Brazilian family portrait, classic furniture, golden hour lighting, emotional composition, fine art photography style. Logo VON MARINS anexada em dourado #fbb725 no canto inferior direito. 50mm lens, f/8, 1/125s, ISO 200. Colors: black #141414, gold #fbb725, white #f1f1f1. --ar 4:5 --style raw --quality 2 --stylize 1000",
  };

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle={postData.title}
        caption={postData.caption}
        hashtags={postData.hashtags}
        imagePrompt={postData.imagePrompt}
      />
      <InstagramPost imageSrc="/assets/team/posts/post-6.png">
        <div className="flex h-full flex-col">
          {/* Área dos botões (não será exportada) */}
          <div className="mb-4 flex justify-end">
            <div className="flex items-center gap-2">
              <PostDownload postId={postData.id} contentRef={contentRef} />
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-white/5 p-2 transition-colors hover:bg-[#c5a47e]/20"
              >
                <BookOpen size={14} className="text-[#c5a47e]" />
              </button>
            </div>
          </div>

          {/* Conteúdo visual do post (será exportado) */}
          <div ref={contentRef} className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col items-center justify-center">
              <h2 className="text-center text-5xl font-light tracking-tighter text-white">
                Legados <br />
                <span className="font-bold">Familiares</span>
              </h2>
            </div>

            <div className="mt-auto flex w-full flex-col items-center space-y-6">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1">
                <span className="text-[8px] font-bold tracking-[0.3em] text-white/60 uppercase">
                  Holdings • Protocolos • Sucessão
                </span>
              </div>

              <div className="flex w-full items-center justify-between border-t border-white/5 pt-4">
                <div className="text-[8px] font-bold text-white/20 uppercase">
                  Von Marins
                </div>
                <div className="text-[8px] text-white/20 italic">
                  @vonmarins
                </div>
              </div>
            </div>
          </div>
        </div>
      </InstagramPost>
    </>
  );
}

// Post 7 - Capital Intelectual
export function Post7({
  onOpenCaption,
}: {
  onOpenCaption: (post: any) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const postData = {
    id: 7,
    title: "Capital Intelectual",
    caption: [
      "Na Von Marins, acreditamos que a excelência começa com as pessoas. Por isso, selecionamos nossos advogados não apenas pela técnica, mas pela capacidade analítica e compromisso ético.",
      "Investimos continuamente em educação nas principais capitais jurídicas do mundo - Harvard, LSE, FGV - garantindo que nossa equipe esteja sempre na vanguarda do pensamento jurídico global.",
      "Capital intelectual é o nosso principal ativo.",
    ],
    hashtags: [
      "#CapitalIntelectual",
      "#HarvardLaw",
      "#LSE",
      "#FGV",
      "#EducaçãoContinuada",
      "#VanguardaJurídica",
      "#ExcelênciaTécnica",
    ],
    imagePrompt:
      "Product photography, dramatic black background #141414. Intellectual capital concept, prestigious university libraries, Harvard and LSE architecture, scholars studying law books, classic academic atmosphere, dramatic lighting, knowledge and wisdom theme, fine art photography. Logo VON MARINS anexada em dourado #fbb725 no canto inferior direito. 50mm lens, f/8, 1/125s, ISO 200. Colors: black #141414, gold #fbb725, white #f1f1f1. --ar 4:5 --style raw --quality 2 --stylize 1000",
  };

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle={postData.title}
        caption={postData.caption}
        hashtags={postData.hashtags}
        imagePrompt={postData.imagePrompt}
      />
      <InstagramPost imageSrc="/assets/team/posts/post-7.png">
        <div className="flex h-full flex-col">
          {/* Área dos botões (não será exportada) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#c5a47e]" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase">
                Formação Internacional
              </span>
            </div>
            <div className="flex items-center gap-2">
              <PostDownload postId={postData.id} contentRef={contentRef} />
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-white/5 p-2 transition-all hover:scale-110 hover:bg-[#c5a47e]/20"
              >
                <BookOpen size={14} className="text-[#c5a47e]" />
              </button>
            </div>
          </div>

          {/* Conteúdo visual do post (será exportado) */}
          <div ref={contentRef} className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col justify-center">
              <h2 className="mb-4 text-4xl leading-none font-extrabold tracking-tighter text-white">
                CAPITAL <br />
                <span className="font-light text-[#c5a47e]">INTELECTUAL</span>
              </h2>

              <div className="mb-6 h-1 max-w-[200px] bg-gradient-to-r from-[#c5a47e] to-transparent" />

              <p className="text-sm leading-relaxed font-light text-white/70 italic">
                "Selecionamos nossos advogados <br /> pela capacidade
                analítica."
              </p>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-white/5 bg-white/5 p-3 backdrop-blur-md">
                <span className="mb-1 block text-[8px] tracking-widest text-[#c5a47e] uppercase">
                  Harvard
                </span>
                <span className="text-[10px] text-white/80">Law School</span>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/5 p-3 backdrop-blur-md">
                <span className="mb-1 block text-[8px] tracking-widest text-[#c5a47e] uppercase">
                  LSE
                </span>
                <span className="text-[10px] text-white/80">London</span>
              </div>
            </div>
          </div>
        </div>
      </InstagramPost>
    </>
  );
}

// Post 8 - IA Jurídica
export function Post8({
  onOpenCaption,
}: {
  onOpenCaption: (post: any) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const postData = {
    id: 8,
    title: "IA Jurídica e Inovação",
    caption: [
      "Somos pioneiros na implementação de protocolos de inteligência artificial para análise preditiva de dados e governança.",
      "Nossa plataforma proprietária, Von IA, permite antecipar riscos, otimizar estratégias processuais e oferecer aos clientes decisões baseadas em dados, não em suposições.",
      "Inovação a serviço da segurança jurídica.",
    ],
    hashtags: [
      "#IAJurídica",
      "#LegalTech",
      "#Inovação",
      "#InteligênciaArtificial",
      "#VonIA",
      "#AnálisePreditiva",
      "#GovTech",
    ],
    imagePrompt:
      "Product photography, dramatic black background #141414. Artificial intelligence and law fusion, futuristic legal tech concept, holographic data visualization, neural networks, blue and bronze digital interface, modern courtroom of the future, cyberpunk aesthetic, high-tech atmosphere, 8k digital art. Logo VON MARINS anexada em dourado #fbb725 no canto inferior direito. 50mm lens, f/8, 1/125s, ISO 200. Colors: black #141414, gold #fbb725, white #f1f1f1. --ar 4:5 --style raw --quality 2 --stylize 1000",
  };

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle={postData.title}
        caption={postData.caption}
        hashtags={postData.hashtags}
        imagePrompt={postData.imagePrompt}
      />
      <InstagramPost imageSrc="/assets/team/posts/post-8.png">
        <div className="flex h-full flex-col">
          {/* Área dos botões (não será exportada) */}
          <div className="flex justify-end">
            <div className="flex items-center gap-2">
              <PostDownload postId={postData.id} contentRef={contentRef} />
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-xl"
              >
                <BookOpen size={14} className="text-[#c5a47e]" />
              </button>
            </div>
          </div>

          {/* Conteúdo visual do post (será exportado) */}
          <div ref={contentRef} className="z-10 flex flex-1 flex-col">
            <div className="relative flex flex-1 flex-col items-center justify-center">
              <div className="absolute h-64 w-64 animate-[ping_5s_infinite] rounded-full border border-white/5" />
              <div className="absolute h-48 w-48 rounded-full border border-[#c5a47e]/10" />

              <h3 className="mb-2 text-center text-[10px] tracking-[0.5em] text-[#c5a47e] uppercase">
                Pioneiros
              </h3>
              <h2 className="text-center text-5xl font-bold tracking-tighter text-white">
                VON <br />
                <span className="font-thin italic">IA</span>
              </h2>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-6 text-[8px] tracking-widest text-white/40 uppercase">
              <span>Análise</span>
              <div className="h-1 w-1 rounded-full bg-[#c5a47e]" />
              <span>Dados</span>
              <div className="h-1 w-1 rounded-full bg-[#c5a47e]" />
              <span>Governança</span>
              <div className="h-1 w-1 rounded-full bg-[#c5a47e]" />
              <span>Preditiva</span>
            </div>
          </div>
        </div>
      </InstagramPost>
    </>
  );
}

// Post 9 - Legado e Call to Action
export function Post9({
  onOpenCaption,
}: {
  onOpenCaption: (post: any) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const postData = {
    id: 9,
    title: "Legados que Perduram",
    caption: [
      "Não se trata apenas de resolver litígios. Trata-se de prover a arquitetura jurídica necessária para que a estratégia encontre a perenidade.",
      "Na Von Marins, construímos pontes entre o presente e o futuro, entre o patrimônio construído e o legado que se quer deixar.",
      "Converse com nossa equipe e descubra como podemos proteger o que é mais importante para você.",
    ],
    hashtags: [
      "#Legado",
      "#Perenidade",
      "#ArquiteturaJurídica",
      "#ProteçãoPatrimonial",
      "#Família",
      "#Futuro",
      "#VonMarins",
    ],
    imagePrompt:
      "Product photography, dramatic black background #141414. Legacy and heritage concept, family estate, Brazilian countryside mansion, multiple generations walking through garden, sunset lighting, emotional atmosphere, timeless photography, cinematic composition, fine art style. Logo VON MARINS anexada em dourado #fbb725 no canto inferior direito. 50mm lens, f/8, 1/125s, ISO 200. Colors: black #141414, gold #fbb725, white #f1f1f1. --ar 4:5 --style raw --quality 2 --stylize 1000",
  };

  return (
    <>
      <CaptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle={postData.title}
        caption={postData.caption}
        hashtags={postData.hashtags}
        imagePrompt={postData.imagePrompt}
      />
      <InstagramPost imageSrc="/assets/team/posts/post-9.png">
        <div className="flex h-full flex-col">
          {/* Área dos botões (não será exportada) */}
          <div className="flex items-start justify-between">
            <div className="font-serif text-[40px] leading-none text-[#c5a47e] select-none">
              “
            </div>
            <div className="flex items-center gap-2">
              <PostDownload postId={postData.id} contentRef={contentRef} />
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-white/5 p-2"
              >
                <BookOpen size={14} className="text-[#c5a47e]" />
              </button>
            </div>
          </div>

          {/* Conteúdo visual do post (será exportado) */}
          <div
            ref={contentRef}
            className="flex flex-1 flex-col justify-between"
          >
            <div className="max-w-[90%]">
              <h2 className="text-3xl leading-tight font-light text-white">
                Para quem entende que o <br />
                <span className="font-bold">sucesso</span> só é real quando se
                torna um <span className="text-[#c5a47e] italic">legado.</span>
              </h2>
            </div>

            <div className="space-y-4">
              <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent" />

              <button className="w-full rounded-xl border border-[#c5a47e]/40 bg-white/5 px-6 py-4 transition-all hover:bg-[#c5a47e]/10">
                <span className="text-[10px] font-bold tracking-widest text-white uppercase">
                  Agende uma Consulta Estratégica
                </span>
              </button>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-white uppercase">
                    Von Marins
                  </span>
                  <span className="text-[8px] text-[#c5a47e] uppercase">
                    Advocacia & Consultoria
                  </span>
                </div>
                <div className="text-[10px] font-light text-white/20">
                  @vonmarins
                </div>
              </div>
            </div>
          </div>
        </div>
      </InstagramPost>
    </>
  );
}
