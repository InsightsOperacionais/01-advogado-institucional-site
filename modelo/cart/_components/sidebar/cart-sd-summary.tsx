//src/app/(public)/shop/cart/_components/sidebar/cart-sd-summary.tsx

// #region CartSummary

import { FloatingInput } from "@/components/input-floating";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { formatterBr } from "@/lib/utils";
import {
  Address,
  CartDelivery,
  CartPayment,
  CheckoutReq,
  Coupon,
  User,
} from "@/types";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { toast } from "sonner";

interface CartSummaryProps {
  user: User | null;
  cartState: number;
  selectedAddress: Address | null;
  selectedPayment: CartPayment | null;
  selectedDelivery: CartDelivery | null;
  setCartState: (state: number) => void;
}
export default function CartSdSummary({
  user,
  cartState,
  selectedAddress,
  selectedPayment,
  selectedDelivery,
  setCartState,
}: CartSummaryProps) {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const router = useRouter();
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const subTotalPrice = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  useEffect(() => {
    if (coupon) return;

    const couponA = JSON.parse(localStorage.getItem("coupon") as string);
    console.log(couponA);
    if (couponA) {
      setCoupon(couponA);
      setCouponCode(couponA.code);
    }
  }, []);

  const getDiscountValue = () => {
    if (!coupon) return 0;

    if (coupon.discountType === "Percentage") {
      return (subTotalPrice * coupon.discount) / 100;
    } else {
      return coupon.discount;
    }
  };

  const formattedDiscountValue = () => {
    if (!coupon) return "-";

    return `-${formatterBr.format(getDiscountValue())}`;
  };

  const totalPrice =
    subTotalPrice + (selectedDelivery?.price || 0) - getDiscountValue();

  const onCheckout = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address.");
      return;
    }
    if (!selectedPayment) {
      toast.error("Please select a payment method.");
      return;
    }
    if (!selectedDelivery) {
      toast.error("Please select a delivery method.");
      return;
    }

    const checkoutReq: CheckoutReq = {
      userId: user ? user.id : undefined,
      address: selectedAddress,
      paymentMethod: selectedPayment,
      deliveryMethod: selectedDelivery,
      clientInfo: {
        email: user ? user.email : undefined,
        cpf: user ? user.cpf : undefined,
      },
      coupon: coupon ? coupon : undefined,
      products: items,
    };

    switch (selectedPayment.slug) {
      case "pix":
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}-external/mercado-pago/checkout/pix`,
            checkoutReq,
          );

          const { qr_code, qr_code_base64, amount, orderId } = response.data;

          // Armazena os dados temporariamente
          sessionStorage.setItem(
            "pixPaymentData",
            JSON.stringify({
              qr_code,
              qr_code_base64,
              amount,
              orderId,
            }),
          );

          router.push("/shop/cart/pix");
        } catch (error) {
          console.error("Erro ao processar o pagamento Pix:", error);
          toast.error("Erro ao processar o pagamento Pix.");
        }
        break;
      case "stripe":
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}-external/stripe/checkout`,
            checkoutReq,
          );

          // window.location.href = response.data.url;
          window.open(response.data.url, "_blank");
        } catch (error) {
          console.error(
            "Erro ao redirecionar para o checkout do Stripe:",
            error,
          );
          toast.error("Erro ao redirecionar para o checkout do Stripe.");
        }
        break;
      case "mercado-pago":
        try {
          toast.success("Redirecionando para o checkout do Mercado Pago.");
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}-external/mercado-pago/checkout`,
            checkoutReq,
          );

          // Redireciona para o checkout do Mercado Pago
          window.location.href = response.data.url;
        } catch (error) {
          console.error(
            "Erro ao redirecionar para o checkout do Mercado Pago:",
            error,
          );
          toast.error("Erro ao redirecionar para o checkout do Mercado Pago.");
        }
        break;
      case "credit":
        try {
          // Obter os dados do cartão do localStorage
          const cardData = JSON.parse(
            sessionStorage.getItem("mp_card_data") || "{}",
          );

          if (!cardData.token) {
            toast.error("Por favor, preencha os dados do cartão corretamente.");
            return;
          }

          // Adicionar os dados do cartão ao checkoutReq
          const transparentCheckoutReq = {
            ...checkoutReq,
            cardData: {
              token: cardData.token,
              installments: cardData.installments,
              paymentMethodId: cardData.paymentMethodId,
              issuerId: cardData.issuerId,
            },
          };

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}-external/mercado-pago/checkout/transparent`,
            transparentCheckoutReq,
          );

          if (response.data.status === "approved") {
            const saveCard = sessionStorage.getItem("saveCard") === "true";

            if (saveCard && user) {
              const cardInfo = JSON.parse(
                sessionStorage.getItem("mp_card_info") as string,
              );
              await saveCardToDatabase({
                holder: cardInfo.holder,
                number: cardInfo.number,
                issuer: cardInfo.issuer,
                cpf: cardInfo.cpf,
                issuerId: cardInfo.issuerId,
                paymentMethodId: cardInfo.paymentMethodId,
                operationType: cardInfo.operationType,
              });
            }

            toast.success("Pagamento aprovado!");
            // removeAll();
            // router.push("/shop/cart/success");
          } else {
            toast.error(
              `Pagamento não aprovado: ${response.data.status_detail}`,
            );
          }
        } catch (error) {
          console.error("Erro ao processar pagamento com cartão:", error);
          toast.error("Erro ao processar pagamento com cartão.");
        }
        break;
      default:
        break;
    }
  };

  const onRemoveCoupon = () => {
    setCoupon(null);
    localStorage.removeItem("coupon");
    toast.success("Coupon code removed successfully.");
  };

  const couponCheck = async () => {
    if (!couponCode) {
      toast.error("Please insert a coupon code.");
      return;
    }
    try {
      const response = await axios.get(`/api/shop/coupons/${couponCode}`);
      if (response.data) {
        const couponA = {
          code: response.data.code,
          discount: response.data.discount,
          discountType: response.data.discountType,
        };
        setCoupon(couponA);
        localStorage.setItem("coupon", JSON.stringify(couponA));
        toast.success("Coupon code applied successfully.");
      } else {
        toast.error("Coupon code not found.");
      }
    } catch (error) {
      toast.error("Coupon code not found.");
    }
  };

  const saveCardToDatabase = async (cardInfo: any) => {
    try {
      if (!user) return;

      if (!cardInfo.number || cardInfo.number.length < 16) {
        toast.error("Número do cartão inválido");
        return;
      }

      const response = await axios.post(`/api/cards/${user.id}`, {
        cardData: {
          holder: cardInfo.holder,
          number: cardInfo.number,
          cpf: cardInfo.cpf,
          issuer: cardInfo.issuer,
          issuerId: cardInfo.issuerId,
          paymentMethodId: cardInfo.paymentMethodId,
          operationType: cardInfo.operationType,
        },
      });

      // toast.success("Cartão salvo com sucesso");
      return response.data;
    } catch (error) {
      console.error("Erro ao salvar cartão:", error);
      toast.error("Erro ao salvar cartão");
    }
  };

  return (
    <div className="min-w-80">
      <Card className="w-full">
        <CardContent className="">
          <div className="text-io-text-primary flex items-center justify-between pb-6">
            <p className="text-lg font-bold">Pedido</p>
            {cartState === 2 && (
              <Button
                variant={"ghost"}
                size={"sm"}
                className="text-io-text-primary h-7"
                onClick={() => setCartState(0)}
              >
                <FiEdit3 className="mr-2 h-4 w-4" /> Editar
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="text-io-text-secondary text-sm">Sub total</p>
              <p className="text-io-text-primary text-sm font-bold">
                {formatterBr.format(subTotalPrice)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-io-text-secondary text-sm">Desconto</p>
              <p className="text-io-text-primary text-sm font-bold">
                {formattedDiscountValue()}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-io-text-secondary text-sm">Entrega</p>
              <p className="text-io-text-primary text-sm font-bold">
                {formatterBr.format(selectedDelivery?.price || 0)}
              </p>
            </div>
          </div>
          <Separator className="border-io-input-border my-5 border border-dashed bg-transparent" />
          <div className="flex justify-between">
            <p className="text-io-text-primary text-base font-bold">Total</p>
            <p className="text-io-error text-sm font-bold">
              {formatterBr.format(totalPrice)}
            </p>
          </div>
          {cartState === 0 && (
            <div className="relative mt-10 mb-4">
              <FloatingInput
                label="Coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              {!coupon ? (
                <Button
                  variant="ghost"
                  className="text-io-primary-light absolute top-1/2 right-2 -translate-y-1/2"
                  onClick={couponCheck}
                >
                  Apply
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="text-io-error-light absolute top-1/2 right-2 -translate-y-1/2"
                  onClick={onRemoveCoupon}
                >
                  Remove
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      {cartState === 0 && (
        <Button className="mt-5 w-full" onClick={() => setCartState(1)}>
          Proximo passo
        </Button>
      )}
      {cartState === 1 && selectedDelivery && (
        <Button className="mt-5 w-full" onClick={() => setCartState(2)}>
          Proximo passo
        </Button>
      )}
      {cartState === 2 && (
        <Button
          className="mt-5 w-full"
          onClick={() => {
            onCheckout();
          }}
        >
          Finalizar compra
        </Button>
      )}
    </div>
  );
}

// #endregion
