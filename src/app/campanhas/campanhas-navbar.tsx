"use client";

import { LawButton } from "@/components/layout/law-button";
import { useNavbarVisibility } from "@/components/layout/navbar/monted-navbar";
import { Briefcase, Heart, Landmark, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function NavbarContent() {
  const isVisible = useNavbarVisibility();
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAberto(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fechar menu ao mudar de rota
  const handleLinkClick = () => {
    setMenuAberto(false);
  };

  // Determinar qual campanha está ativa baseado na URL
  const getActiveCampanha = () => {
    if (pathname.includes("/campanha-1")) return 1;
    if (pathname.includes("/campanha-2")) return 2;
    if (pathname.includes("/campanha-3")) return 3;
    return null;
  };

  const activeCampanha = getActiveCampanha();

  // Dados das campanhas para navegação rápida
  const campanhas = [
    {
      id: 1,
      nome: "Institucional",
      icon: <Landmark size={16} className="text-[#c5a47e]" />,
      href: "/campanhas/campanha-1/estrategia",
      cor: "border-[#c5a47e]",
    },
    {
      id: 2,
      nome: "Governança Sucessória",
      icon: <Heart size={16} className="text-[#c5a47e]" />,
      href: "/campanhas/campanha-2/estrategia",
      cor: "border-[#c5a47e]",
    },
    {
      id: 3,
      nome: "Societário e M&A",
      icon: <Briefcase size={16} className="text-[#c5a47e]" />,
      href: "/campanhas/campanha-3/estrategia",
      cor: "border-[#c5a47e]",
    },
  ];

  // Obter o nome da campanha ativa para exibir no botão
  const getBotaoLabel = () => {
    if (!activeCampanha) return "Campanhas";
    return campanhas[activeCampanha - 1].nome;
  };

  return (
    <>
      {/* Branding na Esquerda */}
      {/* <div
        className={`fixed top-8 left-8 z-50 transition-all duration-500 ${
          isVisible
            ? "translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-4 opacity-0"
        }`}
      >
        <Link href="/" className="group">
          <span className="font-bitter text-xl font-light tracking-[0.2em] text-white mix-blend-difference">
            VON <span className="font-black text-[#c5a47e]">MARINS</span>
          </span>
        </Link>
      </div> */}

      {/* Indicador de Campanha Ativa (Desktop) - Removido para não duplicar informação */}

      {/* Container de Ações na Direita */}
      <div
        className={`fixed top-22 right-8 z-50 flex flex-col items-end gap-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-4 scale-95 opacity-0"
        }`}
      >
        {/* 01. MENU PRINCIPAL (Navegação entre Campanhas) */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="flex h-12 w-66 items-center justify-center gap-2 rounded-full border border-white/10 bg-black/20 px-5 backdrop-blur-xl transition-all hover:border-[#c5a47e]/30"
          >
            <Menu size={18} className="text-[#c5a47e]" />
            <span className="text-xs font-bold tracking-widest text-white uppercase">
              {getBotaoLabel()}
            </span>
          </button>

          {/* Menu Dropdown - só aparece quando aberto */}
          {menuAberto && (
            <div className="absolute top-14 right-0 z-50 w-66 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0e] shadow-2xl backdrop-blur-xl">
              <div className="p-2">
                {campanhas.map((campanha) => (
                  <Link
                    key={campanha.id}
                    href={campanha.href}
                    onClick={handleLinkClick}
                    className={`group my-2 flex items-center gap-3 rounded-xl px-4 py-4 transition-all hover:bg-white/5 ${
                      activeCampanha === campanha.id ? "bg-white/5" : ""
                    }`}
                  >
                    <div
                      className={`h-10 w-1 rounded-full transition-all ${
                        activeCampanha === campanha.id
                          ? "h-10 bg-[#c5a47e]"
                          : "bg-white/20"
                      }`}
                    />
                    <div className="flex flex-1 items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                        {campanha.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          Campanha {campanha.id}
                        </div>
                        <div className="text-[10px] font-light text-white/40">
                          {campanha.nome}
                        </div>
                      </div>
                    </div>
                    {activeCampanha === campanha.id && (
                      <div className="h-2 w-2 rounded-full bg-[#c5a47e]" />
                    )}
                  </Link>
                ))}

                {/* Divisor */}
                <div className="my-2 h-px bg-white/5" />

                {/* Link para todas as campanhas */}
                <Link
                  href="/campanhas"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:bg-white/5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                    <span className="text-xs text-[#c5a47e]">📋</span>
                  </div>
                  <span className="text-sm text-white">Todas as Campanhas</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 02. NAVEGAÇÃO RÁPIDA ENTRE AS SUBPÁGINAS DA CAMPANHA ATIVA */}
        {activeCampanha && (
          <div className="flex gap-2">
            <Link href={`/campanhas/campanha-${activeCampanha}/estrategia`}>
              <LawButton
                variant="expandible"
                size="default"
                label="Estratégia"
                icon={<Heart size={14} />}
              />
            </Link>
            <Link href={`/campanhas/campanha-${activeCampanha}/landing-page`}>
              <LawButton
                variant="expandible"
                size="default"
                label="Landing Page"
                icon={<Landmark size={14} />}
              />
            </Link>
            <Link href={`/campanhas/campanha-${activeCampanha}/instagram`}>
              <LawButton
                variant="expandible"
                size="default"
                label="Instagram"
                icon={<Briefcase size={14} />}
              />
            </Link>
          </div>
        )}

        {/* 03. VOLTAR PARA O SITE PRINCIPAL */}
        <Link href="/">
          <LawButton
            variant="expandible"
            size="default"
            label="Site"
            icon={<span className="text-xs">←</span>}
          />
        </Link>
      </div>
    </>
  );
}

export default function CampanhasNavbar() {
  return <NavbarContent />;
}
