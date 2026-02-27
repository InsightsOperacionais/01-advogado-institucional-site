// app/layout.tsx ou app/(law)/layout.tsx
import { Bitter, Open_Sans } from "next/font/google";

import { IoMenuContent } from "@/components/layout/io-menu/io-menu";
import { HomeMenuButtons } from "@/components/layout/io-mobile-menu/mounteds/home-mobile-menu";
import { PageTransition } from "@/components/layout/page-transition";
import { ToasterContainer } from "@/components/layout/toaster-container";
import { RootProvider } from "@/providers/root-provider";
import { MainScrollArea } from "@/providers/scroll-context";
import CampanhasNavbar from "./campanhas-navbar";

// Tipografia de Autoridade
const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export default function CampanhasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${bitter.variable} ${openSans.variable} font-sans text-[#0a0a0b] selection:bg-[#c5a47e] selection:text-[#0a0a0b]`}
    >
      <RootProvider>
        <HomeMenuButtons />
        {/* Background fixo do App - Tom Noir Profundo */}
        <div className="flex h-screen w-full flex-col items-center justify-center bg-[#020202] p-0">
          <ToasterContainer />

          {/* Container Principal (O "Card" do App - Estilo Apple/Moderno) */}
          <div className="shadow-3xl relative flex h-screen w-full flex-col overflow-hidden bg-[#f4f4f5]">
            {/* --- ELEMENTOS FIXOS (Sobre o Scroll) --- */}
            <IoMenuContent />

            {/* Navbar Adaptada (Desktop) */}
            {/* <div className="z-[110] hidden md:block">
              <Navbar />
            </div> */}

            {/* Menu Mobile Adaptado */}
            {/* <div className="z-[110] md:hidden">
              <IoMobileMenu />
            </div> */}

            {/* Branding Flutuante (Logo Von Marins) */}
            {/* <div className="pointer-events-none absolute top-10 left-10 z-[140] hidden sm:block">
              <Link href="/" className="pointer-events-auto">
                <div className="flex flex-col">
                  <span className="font-bitter text-xl font-light tracking-[0.3em] text-white mix-blend-difference">
                    VON{" "}
                    <span className="font-black text-[#c5a47e]">MARINS</span>
                  </span>
                  <span className="text-[7px] font-bold tracking-[0.6em] text-[#c5a47e] uppercase">
                    Advocacia
                  </span>
                </div>
              </Link>
            </div> */}

            {/* --- NAVBAR CAMPAHAS --- */}
            <CampanhasNavbar />

            {/* --- ÁREA SCROLLÁVEL PRINCIPAL --- */}
            <MainScrollArea>
              <PageTransition>
                <main className="flex min-h-screen flex-col bg-black">
                  {children}
                </main>
              </PageTransition>
            </MainScrollArea>
          </div>
        </div>
      </RootProvider>
    </div>
  );
}
