// app/(projetos)/components/layout/navbar/law-navbar.tsx
"use client";

import { useScrollDirection } from "@/providers/scroll-context";
import { Calendar, Menu } from "lucide-react";
import Link from "next/link";
import { MainMenuButton } from "../io-menu/mounteds/menu-content";
import { LawButton } from "../law-button";

function NavbarContent() {
  const isVisible = useScrollDirection();

  return (
    <>
      {/* Branding Sutil na Esquerda (Sempre visível ou segue o isVisible) */}
      <div
        className={`absolute top-8 left-8 z-50 transition-all duration-500 ${
          isVisible
            ? "translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-4 opacity-0"
        }`}
      >
        <Link href="/" className="group">
          <h1 className="font-bitter text-xl font-light tracking-[0.2em] text-white mix-blend-difference">
            VON <span className="font-black text-[#c5a47e]">MARINS</span>
          </h1>
        </Link>
      </div>

      {/* Container de Ações na Direita */}
      <div
        className={`absolute top-8 right-8 z-50 flex flex-col items-end gap-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-4 scale-95 opacity-0"
        }`}
      >
        {/* 01. MENU PRINCIPAL (O mais importante) */}
        <MainMenuButton>
          <LawButton
            variant="expandible"
            size="default"
            label="Menu"
            icon={<Menu size={20} className="text-[#c5a47e]" />}
          />
        </MainMenuButton>

        {/* 02. AGENDAR CONSULTA (Conversão Direta para /contato) */}
        <Link href="/contato">
          <LawButton
            variant="expandible"
            size="default"
            label="Agendar"
            icon={<Calendar size={18} />}
          />
        </Link>

        {/* 03. PORTAL DO CLIENTE (Substitui 'Minha Conta') */}
        {/* <Link href="/login">
          <LawButton
            variant="expandible"
            size="default"
            label="Área Restrita"
            icon={<User size={18} />}
          />
        </Link> */}

        {/* 04. BUSCA JURÍDICA (Opcional para site com muitos Insights) */}
        {/* <Link href="https://wa.me/seunumeroaqui">
          <LawButton
            variant="expandible"
            size="default"
            label="Whatsapp"
            icon={<FaWhatsapp size={18} />}
          />
        </Link> */}
      </div>
    </>
  );
}

export default function Navbar() {
  return <NavbarContent />;
}
