import { Bitter, Open_Sans } from "next/font/google";
import Link from "next/link";

import { Footer } from "@/components/layout/footer/footer";
import { IoDrawerContent } from "@/components/layout/io-drawer/io-drawer";
import { IoMenuContent } from "@/components/layout/io-menu/io-menu";
import IoMobileMenu from "@/components/layout/io-mobile-menu/io-mobile-menu";
import RoceriaLogo from "@/components/layout/logos";
import Navbar from "@/components/layout/navbar/monted-navbar";
import { PageTransition } from "@/components/layout/page-transition";
import { ToasterContainer } from "@/components/layout/toaster-container";
import { RootProvider } from "@/providers/root-provider";
import { MainScrollArea } from "@/providers/scroll-context";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${bitter.variable} ${openSans.variable} font-sans selection:bg-[#fbb725] selection:text-[#141414]`}
    >
      <RootProvider>
        {/* Background fixo do App */}
        <div className="flex h-screen w-full flex-col items-center justify-center bg-[#141414] p-2 lg:p-4">
          <ToasterContainer />
          {/* Container Principal (O "Card" do App) */}
          <div className="relative flex h-screen w-full flex-col overflow-hidden rounded-3xl text-[#141414] shadow-2xl">
            {/* --- ELEMENTOS FIXOS (Ficam por cima do scroll) --- */}
            <IoDrawerContent />
            <IoMenuContent />

            <div className="z-110 hidden md:block">
              <Navbar />
            </div>

            <div className="z-110 md:hidden">
              <IoMobileMenu />
            </div>

            {/* Logo Flutuante (se desejar manter fora do scroll) */}
            <div className="pointer-events-none absolute top-0 left-0 z-140 hidden sm:block">
              <Link href="/" className="pointer-events-auto">
                <RoceriaLogo width={70} />
              </Link>
            </div>

            {/* --- ÁREA SCROLLÁVEL --- */}
            <MainScrollArea>
              <PageTransition>
                <main className="flex min-h-screen flex-col">
                  {children}
                  <Footer />
                </main>
              </PageTransition>
            </MainScrollArea>
          </div>
        </div>
      </RootProvider>
    </div>
  );
}
