import { ArrowLeft, ChefHat } from "lucide-react";
import Link from "next/link";

export default function RecipeNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F8F8] px-8">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-[#fbb725]/10 p-6">
            <ChefHat size={64} className="text-[#fbb725]" />
          </div>
        </div>
        <h1 className="font-bitter mb-4 text-6xl font-light text-[#141414]">
          Receita não{" "}
          <span className="font-black text-[#fbb725]">encontrada</span>
        </h1>
        <p className="mb-8 text-lg font-light text-[#141414]/50">
          A receita que você está procurando pode ter sido removida ou não
          existe.
        </p>
        <Link
          href="/receitas"
          className="group inline-flex items-center gap-3 rounded-full bg-[#141414] px-8 py-4 text-[9px] font-black tracking-widest text-white uppercase transition-colors hover:bg-[#fbb725] hover:text-[#141414]"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          Voltar para receitas
        </Link>
      </div>
    </main>
  );
}
