// components/layout/io-drawer/mounteds/cart-drawer.tsx
"use client";

import { cn } from "@/lib/utils";
import { useRegisterDrawer } from "@/providers/drawer-context";
import { useCart } from "@/providers/shop-context";
import { ArrowRight, Minus, Plus, Ticket, Trash2, Wheat } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  IoDrawerButton,
  IoDrawerContentSection,
  IoDrawerFooter,
} from "../io-drawer";

// ===== CONFIGURAÇÃO DO DRAWER =====
const DRAWER_ID = "cart";
const DRAWER_TITLE = "Carrinho";
const DRAWER_THEME = "dark";
const DRAWER_DIRECTION = "right";

// ===== CONTEÚDO DO DRAWER =====
interface CartDrawerContentProps {
  theme?: "light" | "dark";
  onClose?: () => void;
}

export function CartDrawerContent({
  theme = "dark",
  onClose,
}: CartDrawerContentProps) {
  const isDark = theme === "dark";
  const [coupon, setCoupon] = useState("");

  const { items, removeItem, updateQuantity, itemCount, total } = useCart();

  const handleUpdateQuantity = (productId: string, delta: number) => {
    const item = items.find((i) => i.productId === productId);
    if (item) {
      updateQuantity(productId, item.quantidade + delta);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleApplyCoupon = () => {
    if (coupon.trim()) {
      console.log("Aplicar cupom:", coupon);
    }
  };

  const handleCheckout = () => {
    window.location.href = "/shop/carrinho";
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col transition-colors duration-300 outline-none",
        isDark ? "bg-[#141414] text-[#f1f1f1]" : "bg-[#f8f8f8] text-[#141414]",
      )}
    >
      <IoDrawerContentSection className="scrollbar-hide" theme={theme}>
        <div className="space-y-4 px-4 py-6">
          {itemCount > 0 ? (
            items.map((item) => (
              <div
                key={item.productId}
                className={cn(
                  "group relative flex gap-3 border-b pb-4 transition-colors last:border-0",
                  isDark ? "border-[#fbb725]/10" : "border-[#141414]/5",
                )}
              >
                <div
                  className={cn(
                    "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition-colors",
                    isDark
                      ? "border-[#fbb725]/10 bg-[#1A1A1A]"
                      : "border-[#141414]/10 bg-white shadow-sm",
                  )}
                >
                  <Image
                    src={item.imagem}
                    alt={item.nome}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between py-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <h3 className="font-bitter line-clamp-1 text-[13px] leading-tight font-medium">
                        {item.nome}
                      </h3>
                      {item.subcategoria && (
                        <p
                          className={cn(
                            "text-[8px] font-bold tracking-[0.1em] uppercase",
                            isDark ? "text-[#fbb725]/60" : "text-[#fbb725]",
                          )}
                        >
                          {item.subcategoria}
                        </p>
                      )}
                      {item.tamanho && (
                        <p
                          className={cn(
                            "text-[8px] font-bold tracking-[0.1em] uppercase",
                            isDark ? "text-[#f1f1f1]/40" : "text-[#141414]/40",
                          )}
                        >
                          {item.tamanho}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className={cn(
                        "transition-colors hover:text-red-500",
                        isDark ? "text-[#f1f1f1]/20" : "text-[#141414]/20",
                      )}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div
                      className={cn(
                        "flex items-center gap-2 rounded-full border p-0.5 transition-colors",
                        isDark
                          ? "border-[#fbb725]/20 bg-[#1A1A1A]"
                          : "border-[#141414]/10 bg-white shadow-sm",
                      )}
                    >
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, -1)}
                        className={cn(
                          "flex size-5 items-center justify-center rounded-full transition-all hover:bg-[#fbb725] hover:text-[#141414]",
                          isDark ? "text-[#fbb725]" : "text-[#141414]",
                        )}
                      >
                        <Minus size={10} />
                      </button>
                      <span
                        className={cn(
                          "min-w-[12px] text-center text-[10px] font-bold lining-nums",
                          isDark ? "text-[#f1f1f1]" : "text-[#141414]",
                        )}
                      >
                        {item.quantidade}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, 1)}
                        className={cn(
                          "flex size-5 items-center justify-center rounded-full transition-all hover:bg-[#fbb725] hover:text-[#141414]",
                          isDark ? "text-[#fbb725]" : "text-[#141414]",
                        )}
                      >
                        <Plus size={10} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p
                        className={cn(
                          "font-bitter text-sm font-bold lining-nums",
                          isDark ? "text-[#fbb725]" : "text-[#141414]",
                        )}
                      >
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
              <Wheat
                className={cn(
                  "mb-4 size-8",
                  isDark ? "text-[#fbb725]" : "text-[#141414]",
                )}
              />
              <p className="font-bitter text-sm font-light tracking-widest uppercase">
                Cesta Vazia
              </p>
              <button
                onClick={onClose}
                className="mt-4 text-xs text-[#fbb725] hover:underline"
              >
                Continuar Comprando
              </button>
            </div>
          )}
        </div>
      </IoDrawerContentSection>

      {itemCount > 0 && (
        <IoDrawerFooter
          className={cn(
            "border-t px-4 py-5 backdrop-blur-2xl transition-all",
            isDark
              ? "border-[#fbb725]/10 bg-[#141414]/95 text-[#f1f1f1]"
              : "border-[#141414]/5 bg-white/95 text-[#141414]",
          )}
        >
          <div className="space-y-3">
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border p-1 transition-colors focus-within:border-[#fbb725]/40",
                isDark
                  ? "border-[#fbb725]/10 bg-black/20"
                  : "border-[#141414]/10 bg-gray-50",
              )}
            >
              <Ticket size={14} className="ml-2 text-[#fbb725]/40" />
              <input
                type="text"
                placeholder="CUPOM"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                className={cn(
                  "flex-1 bg-transparent px-2 text-[9px] font-bold tracking-widest uppercase transition-colors outline-none",
                  isDark ? "text-[#f1f1f1]" : "text-[#141414]",
                )}
              />
              <button
                onClick={handleApplyCoupon}
                className="rounded px-3 py-1 text-[8px] font-black tracking-widest text-[#fbb725] uppercase transition-colors hover:bg-[#fbb725] hover:text-[#141414]"
              >
                OK
              </button>
            </div>

            <div className="flex flex-col gap-1 px-1">
              <div className="flex justify-between text-[8px] font-bold tracking-widest uppercase opacity-40">
                <span>
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "itens"})
                </span>
                <span className="lining-nums">R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold tracking-[0.1em] uppercase">
                <span className="font-bitter font-light opacity-60">
                  Total Final
                </span>
                <span
                  className={cn(
                    "font-bitter text-lg lining-nums transition-colors",
                    isDark ? "text-[#fbb725]" : "text-[#141414]",
                  )}
                >
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className={cn(
                "group flex h-10 w-full items-center justify-center gap-2 rounded-full text-[9px] font-black tracking-[0.2em] uppercase shadow-lg transition-all active:scale-[0.98]",
                isDark
                  ? "bg-[#fbb725] text-[#141414] hover:bg-[#f1f1f1]"
                  : "bg-[#141414] text-[#fbb725] hover:bg-[#fbb725] hover:text-[#141414]",
              )}
            >
              Finalizar Pedido
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </IoDrawerFooter>
      )}
    </div>
  );
}

// ===== BOTÃO DO DRAWER COM AUTO-REGISTRO =====
interface CartDrawerButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function CartDrawerButton({
  children,
  className,
}: CartDrawerButtonProps) {
  // Registra o drawer automaticamente quando o botão é montado
  useRegisterDrawer({
    id: DRAWER_ID,
    component: CartDrawerContent,
    title: DRAWER_TITLE,
    theme: DRAWER_THEME,
    direction: DRAWER_DIRECTION,
  });

  return (
    <IoDrawerButton drawerId={DRAWER_ID} className={className}>
      {children}
    </IoDrawerButton>
  );
}
