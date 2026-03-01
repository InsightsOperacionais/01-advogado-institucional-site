import { Bitter, Open_Sans } from "next/font/google";

import IoMobileMenu from "@/components/layout/io-mobile-menu/io-mobile-menu";
import Navbar from "@/components/layout/navbar/monted-navbar";
import { ToasterContainer } from "@/components/layout/toaster-container";

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

export default function LawFirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${bitter.variable} ${openSans.variable} min-h-screen bg-[#0a0a0b] font-sans text-[#0a0a0b] selection:bg-[#c5a47e] selection:text-[#0a0a0b]`}
    >
      <div className="fixed inset-x-0 top-4 z-[150]">
        <ToasterContainer />
      </div>

      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#020202] py-4 pl-3">
        <div className="shadow-3xl relative flex h-screen w-full flex-col overflow-hidden bg-[#f4f4f5]">
          <div className="hidden md:block">
            <Navbar />
          </div>

          <div className="md:hidden">
            <IoMobileMenu />
          </div>

          {/* <RouteTransition> */}
          <main className="flex min-h-screen flex-col overflow-auto bg-[#f4f4f5]">
            {children}
          </main>
          {/* </RouteTransition> */}
        </div>
      </div>
    </div>
  );
}
