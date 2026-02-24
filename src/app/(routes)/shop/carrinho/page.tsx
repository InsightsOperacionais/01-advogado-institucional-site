/* eslint-disable react/no-unescaped-entities */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  Wheat,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PRODUTOS } from "../data-shop";

export default function CartPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // TESTE: Puxando 15 produtos para validar o scroll interno
  const cartProducts = useMemo(() => PRODUTOS.slice(0, 15), []);

  useEffect(() => {
    const initial: Record<string, number> = {};
    cartProducts.forEach((p) => {
      initial[p.id] = 1;
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuantities(initial);
  }, [cartProducts]);

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const removeItem = (id: string) => {
    const newQs = { ...quantities };
    delete newQs[id];
    setQuantities(newQs);
  };

  const subtotal = useMemo(() => {
    return cartProducts.reduce(
      (acc, p) => acc + p.preco * (quantities[p.id] || 0),
      0,
    );
  }, [cartProducts, quantities]);

  const itemCount = Object.keys(quantities).length;

  return (
    <main className="flex h-screen w-full flex-col overflow-hidden bg-[#F8F8F8] pt-24 lg:pt-12">
      {/* 1. HEADER FIXO (Pequeno para ganhar espaço) */}
      <header className="container mx-auto max-w-7xl px-8 pb-6">
        <Link
          href="/shop"
          className="group mb-2 inline-flex items-center gap-2 text-[9px] font-black tracking-[0.3em] text-[#141414]/40 uppercase transition-all hover:text-[#fbb725]"
        >
          <ArrowLeft
            size={12}
            className="transition-transform group-hover:-translate-x-1"
          />
          Voltar ao Empório
        </Link>
        <div className="flex items-baseline gap-4">
          <h1 className="font-bitter text-4xl font-light tracking-tighter text-[#141414] lg:text-6xl">
            Sua <span className="font-black text-[#fbb725]">Cesta</span>
          </h1>
          <span className="border-l border-[#141414]/10 pl-4 text-[10px] font-bold tracking-widest text-[#141414]/30 uppercase">
            {itemCount} Itens
          </span>
        </div>
      </header>

      {/* 2. ÁREA DE CONTEÚDO (GRID) */}
      <section className="container mx-auto max-w-7xl flex-1 overflow-hidden px-8 pb-8">
        <div className="grid h-full grid-cols-1 gap-10 lg:grid-cols-12">
          {/* COLUNA ESQUERDA: LISTA SCROLLABLE */}
          <div className="flex h-full flex-col overflow-hidden lg:col-span-8">
            <div className="custom-scrollbar flex-1 overflow-y-auto pr-4">
              <AnimatePresence mode="popLayout">
                {itemCount > 0 ? (
                  <div className="space-y-4">
                    {cartProducts
                      .filter((p) => quantities[p.id])
                      .map((product, index) => (
                        <motion.div
                          layout
                          key={product.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: index * 0.05 }}
                          className="group flex gap-5 rounded-3xl border border-[#141414]/5 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                        >
                          {/* Imagem Compacta */}
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[#141414]/5 bg-[#F8F8F8]">
                            <Image
                              src={product.imagem}
                              alt={product.nome}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>

                          {/* Info Compacta */}
                          <div className="flex flex-1 flex-col justify-between py-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-bitter line-clamp-1 text-base font-medium text-[#141414]">
                                  {product.nome}
                                </h3>
                                <p className="text-[9px] font-bold tracking-widest text-[#fbb725] uppercase">
                                  {product.subcategoria}
                                </p>
                              </div>
                              <button
                                onClick={() => removeItem(product.id)}
                                className="text-[#141414]/20 transition-colors hover:text-red-500"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center gap-3 rounded-full border border-[#141414]/5 bg-[#F8F8F8] p-0.5">
                                <button
                                  onClick={() => updateQuantity(product.id, -1)}
                                  className="flex size-7 items-center justify-center rounded-full transition-all hover:bg-[#141414] hover:text-white"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="font-bitter text-sm font-bold lining-nums">
                                  {quantities[product.id]}
                                </span>
                                <button
                                  onClick={() => updateQuantity(product.id, 1)}
                                  className="flex size-7 items-center justify-center rounded-full transition-all hover:bg-[#141414] hover:text-white"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <p className="font-bitter text-lg font-bold text-[#141414] lining-nums">
                                R${" "}
                                {(
                                  product.preco * quantities[product.id]
                                ).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <Wheat size={48} className="mb-4 text-[#fbb725]/30" />
                    <p className="font-bitter text-xl opacity-30">
                      Cesta Vazia
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* COLUNA DIREITA: RESUMO FIXO */}
          <div className="flex h-full flex-col lg:col-span-4">
            <div className="flex flex-col gap-4">
              {/* Cupom Compacto */}
              <div className="rounded-3xl border border-[#141414]/5 bg-white p-5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="CUPOM"
                    className="flex-1 rounded-xl border border-transparent bg-[#F8F8F8] px-4 py-2 text-[10px] font-bold tracking-widest uppercase outline-none focus:border-[#fbb725]/30"
                  />
                  <button className="rounded-xl bg-[#141414] px-4 py-2 text-[9px] font-black tracking-widest text-[#fbb725] uppercase transition-colors hover:bg-[#fbb725] hover:text-[#141414]">
                    OK
                  </button>
                </div>
              </div>

              {/* Totais Dark Premium */}
              <div className="relative flex flex-col overflow-hidden rounded-[2.5rem] bg-[#141414] p-8 text-white shadow-2xl">
                <div className="pointer-events-none absolute -top-6 -right-6 text-white opacity-[0.03]">
                  <ShoppingBag size={180} />
                </div>

                <h3 className="font-bitter mb-6 text-xl font-medium text-[#fbb725]">
                  Resumo
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] tracking-widest text-white/40 uppercase">
                    <span>Subtotal</span>
                    <span className="font-bold lining-nums">
                      R$ {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] tracking-widest uppercase">
                    <span className="text-white/40">Frete</span>
                    <span className="font-bold text-[#fbb725]">Grátis</span>
                  </div>

                  <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-6">
                    <span className="font-bitter text-sm font-light tracking-widest uppercase opacity-60">
                      Total
                    </span>
                    <span className="font-bitter text-3xl font-bold text-[#fbb725] lining-nums">
                      R$ {subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="group mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#fbb725] text-[10px] font-black tracking-[0.3em] text-[#141414] uppercase shadow-xl transition-all hover:bg-white active:scale-95">
                  Finalizar Pedido
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <div className="mt-6 flex justify-center gap-6 opacity-20">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={12} />
                    <span className="text-[7px] font-bold tracking-widest uppercase">
                      Seguro
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck size={12} />
                    <span className="text-[7px] font-bold tracking-widest uppercase">
                      Express
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
