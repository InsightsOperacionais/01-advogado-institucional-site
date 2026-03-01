import { Bitter, Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import { RouteTransition } from "@/components/layout/route-transition";

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

export const metadata: Metadata = {
  title: {
    default: "Acesso Restrito",
    template: "%s | Área Restrita",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${bitter.variable} ${openSans.variable} font-sans selection:bg-[#fbb725] selection:text-[#141414]`}
    >
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#141414] p-2 lg:p-4">
        <div className="relative flex h-screen w-full flex-col overflow-hidden rounded-3xl text-[#141414] shadow-2xl">
          <RouteTransition theme="dark" className="h-full">
            {children}
          </RouteTransition>
        </div>
      </div>
    </div>
  );
}
