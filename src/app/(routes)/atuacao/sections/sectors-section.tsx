"use client";

const SECTORS = [
  "Agribusiness",
  "Real Estate",
  "Tech & Innovation",
  "Family Offices",
  "Industrial",
  "Asset Management",
];

export function SectorsSection() {
  return (
    <div className="border-y border-black/5 py-6">
      <div className="container mx-auto px-4">
        <div className="flex cursor-default flex-wrap items-center justify-between gap-8 opacity-40 transition-all duration-300 hover:opacity-100">
          {SECTORS.map((s) => (
            <span
              key={s}
              className="text-[10px] font-bold tracking-[0.4em] text-[#0a0a0b] uppercase"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
