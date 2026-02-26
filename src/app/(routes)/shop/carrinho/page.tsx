/* eslint-disable react/no-unescaped-entities */
"use client";

import { useCurrentUser } from "@/app/(auth)/hooks/use-current-user";
import { SHIPPING } from "@/data/utils/constants";
import { useCart } from "@/providers/shop-context";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Ticket,
  Trash2,
  Truck,
  Wheat,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type Step = 0 | 1 | 2 | 3;
type DeliveryId = "retirada" | "padrao" | "expressa";
type PaymentId = "pix" | "card" | "mercado-pago";

interface AddressData {
  nome: string;
  email: string;
  telefone: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface CouponRule {
  type: "percent" | "fixed" | "shipping";
  value: number;
}

const STEP_PARAM = "step";
const STORAGE = {
  address: "@roceria/checkout-address",
  payment: "@roceria/checkout-payment",
  coupon: "@roceria/checkout-coupon",
} as const;

const EMPTY_ADDRESS: AddressData = {
  nome: "",
  email: "",
  telefone: "",
  cep: "",
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
};

const PAYMENT_OPTIONS: Array<{ id: PaymentId; nome: string; descricao: string }> =
  [
    {
      id: "pix",
      nome: "PIX",
      descricao: "Aprovação imediata no app do banco.",
    },
    {
      id: "card",
      nome: "Cartão de Crédito",
      descricao: "Pagamento em até 3x sem juros.",
    },
    {
      id: "mercado-pago",
      nome: "Mercado Pago",
      descricao: "Finalização segura pelo Mercado Pago.",
    },
  ];

const COUPONS: Record<string, CouponRule> = {
  ROCA10: { type: "percent", value: 10 },
  BEMVINDO15: { type: "fixed", value: 15 },
  FRETEGRATIS: { type: "shipping", value: 0 },
};

const isStep = (value: number): value is Step =>
  value === 0 || value === 1 || value === 2 || value === 3;

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function CartPage() {
  const user = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { items, removeItem, updateQuantity, clearCart, itemCount, total } =
    useCart();

  const [step, setStep] = useState<Step>(0);
  const [address, setAddress] = useState<AddressData>(EMPTY_ADDRESS);
  const [deliveryId, setDeliveryId] = useState<DeliveryId>("padrao");
  const [paymentId, setPaymentId] = useState<PaymentId | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [cardData, setCardData] = useState({
    titular: "",
    numero: "",
    validade: "",
    cvv: "",
  });
  const [hydrated, setHydrated] = useState(false);

  const deliveryOptions = useMemo(
    () => [
      {
        id: "retirada" as DeliveryId,
        nome: "Retirada na Roça",
        prazo: "1 a 2 dias úteis",
        preco: 0,
      },
      {
        id: "padrao" as DeliveryId,
        nome:
          total >= SHIPPING.FREE_SHIPPING_MIN_PRICE
            ? "Entrega Padrão (Grátis)"
            : "Entrega Padrão",
        prazo: "3 a 5 dias úteis",
        preco:
          total >= SHIPPING.FREE_SHIPPING_MIN_PRICE
            ? 0
            : SHIPPING.DEFAULT_SHIPPING_PRICE,
      },
      {
        id: "expressa" as DeliveryId,
        nome: "Entrega Expressa",
        prazo: "1 a 2 dias úteis",
        preco: SHIPPING.DEFAULT_SHIPPING_PRICE + 12,
      },
    ],
    [total],
  );

  const shipping = useMemo(
    () => deliveryOptions.find((option) => option.id === deliveryId)?.preco ?? 0,
    [deliveryId, deliveryOptions],
  );

  const discount = useMemo(() => {
    const coupon = COUPONS[couponCode];
    if (!coupon) return 0;
    if (coupon.type === "percent") return (total * coupon.value) / 100;
    if (coupon.type === "fixed") return coupon.value;
    return shipping;
  }, [couponCode, shipping, total]);

  const discountSafe = Math.min(discount, total + shipping);
  const grandTotal = Math.max(total + shipping - discountSafe, 0);

  useEffect(() => {
    const rawStep = Number(searchParams.get(STEP_PARAM));
    setStep(isStep(rawStep) ? rawStep : 0);
  }, [searchParams]);

  useEffect(() => {
    if (pathname !== "/shop/carrinho") return;

    const params = new URLSearchParams(searchParams.toString());
    if (step === 0) {
      params.delete(STEP_PARAM);
    } else {
      params.set(STEP_PARAM, String(step));
    }
    const next = params.toString();
    const current = searchParams.toString();
    if (next === current) return;
    router.replace(next ? `/shop/carrinho?${next}` : "/shop/carrinho");
  }, [pathname, router, searchParams, step]);

  useEffect(() => {
    const savedAddress = localStorage.getItem(STORAGE.address);
    if (savedAddress) {
      try {
        setAddress(JSON.parse(savedAddress) as AddressData);
      } catch {
        localStorage.removeItem(STORAGE.address);
      }
    }

    const savedPayment = localStorage.getItem(STORAGE.payment);
    if (savedPayment === "pix" || savedPayment === "card" || savedPayment === "mercado-pago") {
      setPaymentId(savedPayment);
    }

    const savedCoupon = localStorage.getItem(STORAGE.coupon);
    if (savedCoupon && COUPONS[savedCoupon]) {
      setCouponCode(savedCoupon);
      setCouponInput(savedCoupon);
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE.address, JSON.stringify(address));
  }, [address, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (!paymentId) {
      localStorage.removeItem(STORAGE.payment);
      return;
    }
    localStorage.setItem(STORAGE.payment, paymentId);
  }, [hydrated, paymentId]);

  useEffect(() => {
    if (!hydrated) return;
    if (!couponCode) {
      localStorage.removeItem(STORAGE.coupon);
      return;
    }
    localStorage.setItem(STORAGE.coupon, couponCode);
  }, [couponCode, hydrated]);

  useEffect(() => {
    if (!user) return;
    setAddress((prev) => ({
      ...prev,
      nome: prev.nome || user.name || "",
      email: prev.email || user.email || "",
    }));
  }, [user]);

  useEffect(() => {
    if (items.length === 0 && step > 0 && step < 3) setStep(0);
  }, [items.length, step]);

  const setQty = (productId: string, delta: number) => {
    const item = items.find((entry) => entry.productId === productId);
    if (!item) return;
    updateQuantity(productId, Math.max(1, item.quantidade + delta));
  };

  const applyCoupon = () => {
    const normalized = couponInput.trim().toUpperCase();
    if (!normalized) {
      toast.error("Digite um cupom.");
      return;
    }
    if (!COUPONS[normalized]) {
      toast.error("Cupom inválido.");
      return;
    }
    setCouponCode(normalized);
    toast.success(`Cupom ${normalized} aplicado.`);
  };

  const validateAddress = () => {
    const required: Array<keyof AddressData> = [
      "nome",
      "email",
      "telefone",
      "cep",
      "rua",
      "numero",
      "bairro",
      "cidade",
      "estado",
    ];

    const missing = required.find((field) => !address[field].trim());
    if (missing) {
      toast.error("Preencha todos os campos obrigatórios da entrega.");
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    if (!paymentId) {
      toast.error("Escolha um método de pagamento.");
      return false;
    }
    if (paymentId !== "card") return true;

    const cardNumber = cardData.numero.replace(/\s/g, "");
    if (!cardData.titular.trim()) return toast.error("Informe o titular."), false;
    if (!/^\d{16}$/.test(cardNumber))
      return toast.error("Número do cartão inválido."), false;
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.validade))
      return toast.error("Validade inválida (MM/AA)."), false;
    if (!/^\d{3,4}$/.test(cardData.cvv))
      return toast.error("CVV inválido."), false;

    return true;
  };

  const handlePrimaryAction = () => {
    if (step === 0) {
      if (!items.length) return toast.error("Carrinho vazio.");
      setStep(1);
      return;
    }

    if (step === 1) {
      if (!validateAddress()) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!validateAddress() || !validatePayment()) return;
      const code = `ROC-${new Date().getFullYear()}-${Math.floor(
        100000 + Math.random() * 900000,
      )}`;
      setOrderNumber(code);
      clearCart();
      setStep(3);
      toast.success("Pedido finalizado com sucesso!");
    }
  };

  const stepLabel =
    step === 0
      ? "Continuar para entrega"
      : step === 1
        ? "Continuar para pagamento"
        : step === 2
          ? "Finalizar pedido"
          : "Voltar ao empório";

  return (
    <main className="min-h-screen bg-[#F8F8F8] pt-24 lg:pt-12">
      <header className="container mx-auto max-w-7xl px-6 pb-6 lg:px-8">
        <Link
          href="/shop"
          className="group mb-2 inline-flex items-center gap-2 text-[9px] font-black tracking-[0.3em] text-[#141414]/40 uppercase transition-all hover:text-[#fbb725]"
        >
          <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
          Voltar ao Empório
        </Link>

        <div className="flex flex-wrap items-end gap-4">
          <h1 className="font-bitter text-4xl font-light text-[#141414] lg:text-6xl">
            Checkout <span className="font-black text-[#fbb725]">Roçaria</span>
          </h1>
          <span className="border-l border-[#141414]/10 pl-4 text-[10px] font-bold tracking-widest text-[#141414]/30 uppercase">
            {itemCount} {itemCount === 1 ? "item" : "itens"}
          </span>
        </div>

        <div className="mt-6 hidden gap-4 md:flex">
          {["Carrinho", "Entrega", "Pagamento", "Confirmação"].map((label, index) => {
            const current = step === index;
            const done = step > index;
            return (
              <div key={label} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold ${
                      done
                        ? "border-[#fbb725] bg-[#fbb725] text-[#141414]"
                        : current
                          ? "border-[#141414] bg-[#141414] text-[#fbb725]"
                          : "border-[#141414]/20 text-[#141414]/30"
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className={`text-xs font-bold tracking-[0.15em] uppercase ${done || current ? "text-[#141414]" : "text-[#141414]/30"}`}>
                    {label}
                  </span>
                </div>
                {index < 3 && (
                  <div className={`h-px w-10 ${step > index ? "bg-[#fbb725]" : "bg-[#141414]/10"}`} />
                )}
              </div>
            );
          })}
        </div>
      </header>

      <section className="container mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            {step === 0 && (
              <>
                {items.length > 0 ? (
                  items.map((item) => (
                    <div key={item.productId} className="flex gap-5 rounded-3xl border border-[#141414]/5 bg-white p-4 shadow-sm">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[#141414]/5 bg-[#F8F8F8]">
                        <Image src={item.imagem} alt={item.nome} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bitter text-base text-[#141414]">{item.nome}</h3>
                            <p className="text-[9px] font-bold tracking-widest text-[#fbb725] uppercase">
                              {item.subcategoria || item.categoria || "Produto"}
                            </p>
                          </div>
                          <button onClick={() => removeItem(item.productId)} className="text-[#141414]/20 hover:text-red-500">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-[#141414]/10 bg-[#F8F8F8] p-1">
                            <button onClick={() => setQty(item.productId, -1)} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[#141414] hover:text-white">
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-sm font-bold">{item.quantidade}</span>
                            <button onClick={() => setQty(item.productId, 1)} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[#141414] hover:text-white">
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="font-bitter text-lg font-bold text-[#141414]">
                            {formatCurrency(item.preco * item.quantidade)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-[#141414]/10 bg-white text-center">
                    <Wheat className="mb-4 h-10 w-10 text-[#fbb725]/40" />
                    <p className="font-bitter text-2xl text-[#141414]/40">Cesta vazia</p>
                  </div>
                )}
              </>
            )}

            {step === 1 && (
              <>
                <div className="rounded-3xl border border-[#141414]/5 bg-white p-6">
                  <h2 className="font-bitter text-2xl text-[#141414]">Dados de entrega</h2>
                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                    {(
                      [
                        ["nome", "Nome completo"],
                        ["email", "E-mail"],
                        ["telefone", "Telefone"],
                        ["cep", "CEP"],
                        ["rua", "Rua"],
                        ["numero", "Número"],
                        ["bairro", "Bairro"],
                        ["cidade", "Cidade"],
                        ["estado", "Estado"],
                      ] as Array<[keyof AddressData, string]>
                    ).map(([key, label]) => (
                      <input
                        key={key}
                        value={address[key]}
                        onChange={(event) =>
                          setAddress((prev) => ({ ...prev, [key]: event.target.value }))
                        }
                        placeholder={label}
                        className={`rounded-xl border border-[#141414]/10 bg-[#F8F8F8] px-4 py-3 text-sm outline-none focus:border-[#fbb725]/40 ${key === "rua" ? "md:col-span-2" : ""}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-[#141414]/5 bg-white p-6">
                  <h2 className="font-bitter text-2xl text-[#141414]">Entrega</h2>
                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                    {deliveryOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setDeliveryId(option.id)}
                        className={`rounded-2xl border p-4 text-left ${deliveryId === option.id ? "border-[#fbb725] bg-[#fbb725]/10" : "border-[#141414]/10 bg-[#F8F8F8]"}`}
                      >
                        <p className="text-sm font-bold text-[#141414]">{option.nome}</p>
                        <p className="text-xs text-[#141414]/55">{option.prazo}</p>
                        <p className="mt-2 text-sm font-bold text-[#141414]">{formatCurrency(option.preco)}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="rounded-3xl border border-[#141414]/5 bg-white p-6">
                <h2 className="font-bitter text-2xl text-[#141414]">Pagamento</h2>
                <div className="mt-4 space-y-3">
                  {PAYMENT_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setPaymentId(option.id)}
                      className={`w-full rounded-2xl border p-4 text-left ${paymentId === option.id ? "border-[#fbb725] bg-[#fbb725]/10" : "border-[#141414]/10 bg-[#F8F8F8]"}`}
                    >
                      <p className="font-medium text-[#141414]">{option.nome}</p>
                      <p className="text-xs text-[#141414]/55">{option.descricao}</p>
                    </button>
                  ))}
                </div>

                {paymentId === "card" && (
                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                    <input value={cardData.titular} onChange={(e) => setCardData((p) => ({ ...p, titular: e.target.value }))} placeholder="Titular" className="md:col-span-2 rounded-xl border border-[#141414]/10 bg-[#F8F8F8] px-4 py-3 text-sm outline-none focus:border-[#fbb725]/40" />
                    <input value={cardData.numero} onChange={(e) => setCardData((p) => ({ ...p, numero: e.target.value }))} placeholder="Número do cartão" className="md:col-span-2 rounded-xl border border-[#141414]/10 bg-[#F8F8F8] px-4 py-3 text-sm outline-none focus:border-[#fbb725]/40" />
                    <input value={cardData.validade} onChange={(e) => setCardData((p) => ({ ...p, validade: e.target.value }))} placeholder="MM/AA" className="rounded-xl border border-[#141414]/10 bg-[#F8F8F8] px-4 py-3 text-sm outline-none focus:border-[#fbb725]/40" />
                    <input value={cardData.cvv} onChange={(e) => setCardData((p) => ({ ...p, cvv: e.target.value }))} placeholder="CVV" className="rounded-xl border border-[#141414]/10 bg-[#F8F8F8] px-4 py-3 text-sm outline-none focus:border-[#fbb725]/40" />
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="rounded-3xl border border-[#141414]/5 bg-white p-8 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-[#fbb725]" />
                <h2 className="font-bitter mt-4 text-3xl text-[#141414]">Pedido confirmado</h2>
                <p className="mt-2 text-sm text-[#141414]/60">
                  Número do pedido: <span className="font-bold">{orderNumber || "-"}</span>
                </p>
              </div>
            )}
          </div>

          <aside className="space-y-4 lg:col-span-4">
            {step !== 3 && (
              <div className="rounded-3xl border border-[#141414]/5 bg-white p-5">
                <div className="flex gap-2">
                  <input
                    value={couponInput}
                    onChange={(event) => setCouponInput(event.target.value.toUpperCase())}
                    placeholder="CUPOM"
                    className="flex-1 rounded-xl border border-transparent bg-[#F8F8F8] px-4 py-2 text-[10px] font-bold tracking-widest uppercase outline-none focus:border-[#fbb725]/30"
                  />
                  <button onClick={applyCoupon} className="rounded-xl bg-[#141414] px-4 py-2 text-[9px] font-black tracking-widest text-[#fbb725] uppercase hover:bg-[#fbb725] hover:text-[#141414]">
                    OK
                  </button>
                </div>
                {couponCode && (
                  <div className="mt-3 flex items-center justify-between rounded-xl border border-[#fbb725]/25 bg-[#fbb725]/10 px-3 py-2 text-xs">
                    <span className="flex items-center gap-2 text-[#141414]">
                      <Ticket className="h-3.5 w-3.5 text-[#fbb725]" />
                      {couponCode}
                    </span>
                    <button onClick={() => setCouponCode("")} className="text-[10px] font-bold tracking-wider text-[#141414]/60 uppercase">
                      Remover
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="relative rounded-[2.5rem] bg-[#141414] p-8 text-white shadow-2xl">
              <div className="pointer-events-none absolute -top-6 -right-6 opacity-[0.03]">
                <ShoppingBag size={180} />
              </div>
              <h3 className="font-bitter mb-6 text-xl text-[#fbb725]">Resumo</h3>
              <div className="space-y-3 text-[11px]">
                <div className="flex justify-between text-white/50">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>Desconto</span>
                  <span>- {formatCurrency(discountSafe)}</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>Frete</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
                  <span className="font-bitter text-sm text-white/70 uppercase">Total</span>
                  <span className="font-bitter text-3xl font-bold text-[#fbb725]">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => (step === 3 ? router.push("/shop") : handlePrimaryAction())}
                className="group mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#fbb725] text-[10px] font-black tracking-[0.3em] text-[#141414] uppercase transition-all hover:bg-white"
              >
                {stepLabel}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              <div className="mt-6 flex justify-center gap-6 opacity-30">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={12} />
                  <span className="text-[8px] font-bold tracking-widest uppercase">Seguro</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck size={12} />
                  <span className="text-[8px] font-bold tracking-widest uppercase">Entrega</span>
                </div>
              </div>
            </div>

            {step > 0 && step < 3 && (
              <div className="rounded-3xl border border-[#141414]/5 bg-white p-5 text-sm">
                <p className="text-[10px] font-black tracking-[0.2em] text-[#141414]/45 uppercase">
                  Entrega
                </p>
                <p className="mt-2 font-medium text-[#141414]">{address.nome || "Sem nome"}</p>
                <p className="text-[#141414]/55">
                  {address.rua && address.numero ? `${address.rua}, ${address.numero}` : "Rua e número pendentes"}
                </p>
                <p className="text-[#141414]/55">
                  {address.bairro && address.cidade ? `${address.bairro} - ${address.cidade}/${address.estado}` : "Cidade pendente"}
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
