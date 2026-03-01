"use client";

import { IoMenuButton } from "@/components/layout/io-menu/io-menu";
import { Briefcase, Calendar, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LawButton } from "../law-button";

export function useNavbarVisibility(threshold: number = 20) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < 5) {
          setIsVisible(true);
        } else if (
          currentScrollY > lastScrollY.current &&
          currentScrollY > threshold
        ) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isVisible;
}

function NavbarContent() {
  const isVisible = useNavbarVisibility();

  return (
    <>
      <div
        className={`fixed top-8 left-8 z-[110] transition-all duration-500 ${
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
      </div>

      <div
        className={`fixed top-8 right-8 z-[110] flex flex-col items-end gap-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-4 scale-95 opacity-0"
        }`}
      >
        <IoMenuButton
          variant="expandible"
          size="default"
          label="Menu"
          icon={<Menu size={20} className="" />}
        />

        <Link href="/contato">
          <LawButton
            variant="expandible"
            size="default"
            label="Agendar"
            icon={<Calendar size={18} />}
          />
        </Link>

        <Link href="/campanhas">
          <LawButton
            variant="expandible"
            size="default"
            label="Campanhas"
            icon={<Briefcase size={18} />}
          />
        </Link>
      </div>
    </>
  );
}

export default function Navbar() {
  return <NavbarContent />;
}
