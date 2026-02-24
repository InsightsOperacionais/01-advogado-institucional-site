import { ElementReveal } from "@/components/layout/element-reveal";

// ===== STATS SECTION - Adaptada para ROCERIA =====
export function StatsSection() {
  return (
    <section
      className="flex h-full w-full flex-col items-center justify-between gap-5 px-5 sm:flex-row lg:px-0"
      id="stats"
    >
      <div className="flex items-end gap-3">
        <ElementReveal className="font-bitter text-8xl leading-[0.8] font-bold tracking-tighter text-[#fbb725] lg:text-[180px]">
          25
        </ElementReveal>
        <div className="mb-8 text-xs font-light text-[#141414]/60 lg:mb-16 lg:text-sm">
          <ElementReveal delay={0.2}>Anos de</ElementReveal> <br />
          <ElementReveal delay={0.3}>tradição</ElementReveal>
        </div>
      </div>
      <div className="flex items-end gap-3">
        <div className="mb-8 text-right text-xs font-light text-[#141414]/60 lg:mb-16 lg:text-sm">
          <ElementReveal delay={0.2}>Famílias</ElementReveal> <br />
          <ElementReveal delay={0.3}>produtoras</ElementReveal>
        </div>
        <ElementReveal className="font-bitter text-8xl leading-[0.8] font-bold tracking-tighter text-[#fbb725] lg:text-[180px]">
          12
        </ElementReveal>
      </div>
    </section>
  );
}
