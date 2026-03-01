const BADGES = [
  "OAB/SP",
  "CHAMBERS GLOBAL",
  "LEGAL 500",
  "INSTITUTO DOS ADVOGADOS",
  "CERTIFICAÇÃO ISO 9001",
];

export function TrustBar() {
  return (
    <div className="border-y border-black/5 bg-white py-6">
      <div className="container mx-auto px-4">
        <div className="t flex cursor-default flex-wrap items-center justify-between gap-8">
          {BADGES.map((s) => (
            <span
              key={s}
              className="text-[10px] font-bold tracking-[0.4em] text-[#0a0a0b] uppercase opacity-40 transition-all duration-300 hover:opacity-100"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
