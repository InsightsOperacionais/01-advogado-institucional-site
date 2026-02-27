import type { Metadata } from "next";
import { auth } from "@/app/(auth)/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/app/(auth)/_components/logout-button";

export const metadata: Metadata = {
  title: "Área Restrita",
  description:
    "Área restrita para acompanhamento de solicitações e dados de acesso.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MinhaContaPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="bg-[#f4f4f5] px-6 py-16 text-[#0a0a0b] lg:py-24">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-black/5 bg-white p-8 shadow-xl shadow-black/5 lg:p-12">
        <h1 className="font-bitter text-4xl font-light lg:text-5xl">
          Área Restrita
        </h1>

        <p className="mt-4 text-sm text-black/60">
          Sessão ativa para{" "}
          <span className="font-semibold text-[#0a0a0b]">
            {session.user.email}
          </span>
          .
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border border-black/10 p-6 text-sm">
          <p>
            <span className="font-semibold">Nome:</span>{" "}
            {session.user.name ?? "Não informado"}
          </p>
          <p>
            <span className="font-semibold">Perfil:</span> {session.user.role}
          </p>
          <p>
            <span className="font-semibold">2FA:</span>{" "}
            {session.user.isTwoFactorEnabled ? "Ativo" : "Inativo"}
          </p>
        </div>

        <div className="mt-8">
          <LogoutButton>
            <button className="rounded-full bg-[#0a0a0b] px-6 py-3 text-xs font-bold tracking-widest text-[#c5a47e] uppercase transition-colors hover:bg-[#1a1a1c]">
              Encerrar sessão
            </button>
          </LogoutButton>
        </div>
      </section>
    </main>
  );
}
