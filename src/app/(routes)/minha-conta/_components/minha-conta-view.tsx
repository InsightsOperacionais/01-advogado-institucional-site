"use client";

import { logout } from "@/app/(auth)/actions/logout";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Heart,
  LogOut,
  MapPin,
  Package,
  Shield,
  User,
} from "lucide-react";
import type { ComponentType } from "react";
import { useMemo, useState, useTransition } from "react";

import type { AccountOverview } from "../_lib/get-account-overview";

type TabId = "perfil" | "pedidos" | "favoritos" | "enderecos";

interface MinhaContaViewProps {
  data: AccountOverview;
}

function formatDate(value: Date | null) {
  if (!value) return "Indisponível";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(value);
}

function formatPrice(value: number | null) {
  if (value == null) return "Valor indisponível";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function statusClasses(status: string) {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700 border-green-200";
    case "Processing":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Shipped":
    case "InTransit":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Canceled":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-[#141414]/8 text-[#141414]/70 border-[#141414]/15";
  }
}

export function MinhaContaView({ data }: MinhaContaViewProps) {
  const [tab, setTab] = useState<TabId>("perfil");
  const [isPending, startTransition] = useTransition();

  const fullName = useMemo(() => {
    const composed =
      `${data.profile.name ?? ""} ${data.profile.lastName ?? ""}`.trim();
    return composed || "Cliente ROCERIA";
  }, [data.profile.lastName, data.profile.name]);

  const onLogout = () => {
    startTransition(() => {
      logout();
    });
  };

  const tabs: {
    id: TabId;
    label: string;
    icon: ComponentType<{ className?: string }>;
  }[] = [
    { id: "perfil", label: "Perfil", icon: User },
    { id: "pedidos", label: "Pedidos", icon: Package },
    { id: "favoritos", label: "Favoritos", icon: Heart },
    { id: "enderecos", label: "Endereços", icon: MapPin },
  ];

  return (
    <section className="h-[96vh] overflow-y-auto bg-[#f1f1f1]">
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-20 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#141414]/55 uppercase">
              Minha Conta
            </p>
            <h1 className="font-bitter mt-3 text-4xl leading-none font-light text-[#141414] lg:text-6xl">
              Olá, {fullName.split(" ")[0]}
            </h1>
            <p className="mt-3 text-sm text-[#141414]/65">
              Membro desde: {formatDate(data.profile.emailVerified)}
            </p>
          </div>

          <button
            type="button"
            disabled={isPending}
            onClick={onLogout}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[#141414]/15 bg-white px-5 text-sm font-medium text-[#141414] transition hover:border-red-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-3xl border border-[#fbb725]/20 bg-white p-3">
            <nav className="space-y-1">
              {tabs.map((item) => {
                const Icon = item.icon;
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition",
                      active
                        ? "bg-[#141414] text-[#fbb725]"
                        : "text-[#141414]/70 hover:bg-[#fbb725]/10 hover:text-[#141414]",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="space-y-4">
            {tab === "perfil" && (
              <div className="rounded-3xl border border-[#fbb725]/20 bg-white p-6">
                <h2 className="font-bitter text-2xl font-light text-[#141414]">
                  Dados da conta
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#f7f7f7] p-4">
                    <p className="text-xs tracking-[0.14em] text-[#141414]/55 uppercase">
                      Nome completo
                    </p>
                    <p className="mt-2 text-sm font-medium text-[#141414]">
                      {fullName}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#f7f7f7] p-4">
                    <p className="text-xs tracking-[0.14em] text-[#141414]/55 uppercase">
                      E-mail
                    </p>
                    <p className="mt-2 text-sm font-medium text-[#141414]">
                      {data.profile.email ?? "Não informado"}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#f7f7f7] p-4">
                    <p className="text-xs tracking-[0.14em] text-[#141414]/55 uppercase">
                      Telefone
                    </p>
                    <p className="mt-2 text-sm font-medium text-[#141414]">
                      {data.profile.phone ?? "Não informado"}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#f7f7f7] p-4">
                    <p className="text-xs tracking-[0.14em] text-[#141414]/55 uppercase">
                      Tipo de conta
                    </p>
                    <p className="mt-2 text-sm font-medium text-[#141414]">
                      {data.profile.role}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-[#141414]/10 bg-[#141414]/[0.03] p-4">
                  <p className="flex items-center gap-2 text-sm text-[#141414]/75">
                    <Shield className="h-4 w-4" />
                    Autenticação em dois fatores:{" "}
                    <strong>
                      {data.profile.isTwoFactorEnabled
                        ? "ativada"
                        : "desativada"}
                    </strong>
                  </p>
                </div>
              </div>
            )}

            {tab === "pedidos" && (
              <div className="rounded-3xl border border-[#fbb725]/20 bg-white p-6">
                <h2 className="font-bitter text-2xl font-light text-[#141414]">
                  Últimos pedidos
                </h2>

                {data.orders.length === 0 ? (
                  <div className="mt-6 rounded-2xl border border-dashed border-[#141414]/20 bg-[#f7f7f7] p-8 text-center">
                    <Package className="mx-auto h-7 w-7 text-[#141414]/40" />
                    <p className="mt-3 text-sm text-[#141414]/65">
                      Você ainda não possui pedidos registrados.
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 space-y-3">
                    {data.orders.map((order) => (
                      <article
                        key={order.id}
                        className="rounded-2xl border border-[#141414]/10 bg-[#f7f7f7] p-4"
                      >
                        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                          <div>
                            <p className="text-sm font-semibold text-[#141414]">
                              Pedido #{order.orderNumber}
                            </p>
                            <p className="mt-1 flex items-center gap-2 text-xs text-[#141414]/60">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(order.createdAt)}
                              {order.itemCount != null
                                ? `• ${order.itemCount} itens`
                                : ""}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className={cn(
                                "rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                                statusClasses(order.status),
                              )}
                            >
                              {order.status}
                            </span>
                            <span className="text-sm font-semibold text-[#141414]">
                              {formatPrice(order.total)}
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "favoritos" && (
              <div className="rounded-3xl border border-[#fbb725]/20 bg-white p-6">
                <h2 className="font-bitter text-2xl font-light text-[#141414]">
                  Favoritos
                </h2>
                <div className="mt-6 rounded-2xl border border-dashed border-[#141414]/20 bg-[#f7f7f7] p-8 text-center">
                  <Heart className="mx-auto h-7 w-7 text-[#141414]/40" />
                  <p className="mt-3 text-sm text-[#141414]/65">
                    Integração de favoritos em andamento. Em breve você verá
                    seus itens salvos aqui.
                  </p>
                </div>
              </div>
            )}

            {tab === "enderecos" && (
              <div className="rounded-3xl border border-[#fbb725]/20 bg-white p-6">
                <h2 className="font-bitter text-2xl font-light text-[#141414]">
                  Endereços
                </h2>
                <div className="mt-6 rounded-2xl border border-dashed border-[#141414]/20 bg-[#f7f7f7] p-8 text-center">
                  <MapPin className="mx-auto h-7 w-7 text-[#141414]/40" />
                  <p className="mt-3 text-sm text-[#141414]/65">
                    Gestão de endereços será conectada no próximo ciclo.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
