import { Bitter, Open_Sans } from "next/font/google";

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
          {children}
        </div>
      </div>
    </div>
  );
}
