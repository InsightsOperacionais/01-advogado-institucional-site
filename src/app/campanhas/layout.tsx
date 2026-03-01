import { Bitter, Open_Sans } from "next/font/google";

import { RouteTransition } from "@/components/layout/route-transition";
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
      className={`${bitter.variable} ${openSans.variable} min-h-screen bg-[#020202] font-sans text-[#0a0a0b] selection:bg-[#c5a47e] selection:text-[#0a0a0b]`}
    >
      <div className="relative min-h-screen bg-black">
        <CampanhasNavbar />

        <RouteTransition theme="dark">
          <main className="flex min-h-screen flex-col bg-black">
            {children}
          </main>
        </RouteTransition>
      </div>
    </div>
  );
}
