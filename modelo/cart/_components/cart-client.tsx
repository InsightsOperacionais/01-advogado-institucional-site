//src/app/(public)/shop/cart/_components/cart-client.tsx

"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { FaCheck, FaCircle } from "react-icons/fa";

import { calculateShipping } from "@/app/api/frete/melhor-envio";
import { useCart } from "@/hooks/use-cart";
import { Address, CartDelivery, CartPayment, User } from "@/types";
import { toast } from "sonner";
import CardBilling from "./main/billing/card-billing";
import CardPayment from "./main/payment/card-payment";
import {
  DeliveryMethodData,
  PaymentMethodData,
} from "./main/payment/cart-data";
import CardTable from "./main/table/card-table";
import CartSdAddress from "./sidebar/cart-sd-address";
import CartSdSummary from "./sidebar/cart-sd-summary";

interface CartClientProps {
  user: User | null;
}
export const CartClient = ({ user }: CartClientProps) => {
  const router = useRouter();
  const cart = useCart();

  const [isInitialized, setIsInitialized] = useState(false);
  const [cartState, setCartState] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<CartDelivery | null>(
    DeliveryMethodData[0],
  );
  const [selectedPayment, setSelectedPayment] = useState<CartPayment | null>(
    PaymentMethodData[0],
  );

  const [shippingOptions, setShippingOptions] = useState<CartDelivery[]>([]);
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const step = query.get("step");

    // Inicializa o cartState baseado na URL ou padrão 0
    setCartState(step !== null ? Number(step) : 0);

    // Carrega o endereço salvo se existir
    if (!selectedAddress && localStorage.getItem("selectedAddress")) {
      setSelectedAddress(JSON.parse(localStorage.getItem("selectedAddress")!));
    }

    // Valida o carrinho
    if (cart.items.length > 0) {
      const isValid = cart.validateCart();
      if (!isValid) {
        toast.error("Seu carrinho contém itens inválidos");
      }
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    router.push(`?step=${cartState}`, undefined);
  }, [cartState, router, isInitialized]);

  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
      fetchShippingOptions(selectedAddress.cep);
    }
  }, [selectedAddress]);

  const fetchShippingOptions = async (cep: string) => {
    if (!cep) return;

    setIsLoadingShipping(true);
    try {
      // Calcular peso total baseado nos produtos do carrinho
      const totalWeight = cart.items.reduce((sum, item) => {
        return sum + 0.3 * item.quantity; // Assume 0.3kg se não tiver peso definido
      }, 0);

      const options = await calculateShipping(
        "30285150", // CEP de origem
        cep,
        {
          weight: Math.max(totalWeight, 0.1), // Mínimo de 0.1kg
          width: 20,
          height: 15,
          length: 30,
        },
      );

      if (options.length === 0) {
        toast.warning("Nenhuma opção de frete disponível para este endereço");
      }

      setShippingOptions(options);

      // Seleciona a primeira opção por padrão
      if (options.length > 0) {
        setSelectedDelivery(options[0]);
      }
    } catch (error) {
      toast.error("Erro ao calcular opções de frete");
      console.error("Detalhes do erro:", error);

      // Fallback para opções padrão em caso de erro
      setShippingOptions(DeliveryMethodData);
      setSelectedDelivery(DeliveryMethodData[0]);
    } finally {
      setIsLoadingShipping(false);
    }
  };

  return (
    <main className="flex w-[1300px] flex-col items-center py-10">
      <div className="w-full">
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>
      <div className="mb-7 flex h-24 w-[70%] items-center gap-6">
        <div className="flex w-full px-6">
          {/* State 0 */}
          <div className="relative flex flex-col items-center gap-2">
            {cartState === 0 ? (
              <FaCircle className="text-io-primary h-3 w-3" />
            ) : (
              <FaCheck className="text-io-primary h-3 w-3" />
            )}
            <p className="text-io-text-primary absolute top-8 text-sm font-semibold">
              Carrinho
            </p>
          </div>
          <div
            className={`mx-5 mt-[6px] h-[1px] w-full ${cartState === 0 ? "bg-io-text-disabled" : "bg-io-primary"}`}
          />
          {/* State 1 */}
          <div
            className={`text-io-primary relative flex flex-col items-center gap-2`}
          >
            {cartState === 0 || cartState === 1 ? (
              <FaCircle
                className={`h-3 w-3 ${cartState !== 0 ? "text-io-primary" : "text-io-text-disabled"}`}
              />
            ) : (
              <FaCheck className="h-3 w-3" />
            )}
            <p
              className={`absolute top-8 flex w-40 items-center justify-center text-sm font-semibold ${cartState !== 0 ? "text-io-text-primary" : "text-io-text-disabled"}`}
            >
              Entrega
            </p>
          </div>
          <div
            className={`mx-5 mt-[6px] h-[1px] w-full ${cartState === 0 || cartState === 1 ? "bg-io-text-disabled" : "bg-io-primary"}`}
          />
          {/* State 2 */}
          <div
            className={`text-io-primary relative flex flex-col items-center gap-2`}
          >
            <FaCircle
              className={`h-3 w-3 ${cartState === 2 ? "text-io-primary" : "text-io-text-disabled"}`}
            />
            <p
              className={`absolute top-8 text-sm font-semibold ${cartState === 2 ? "text-io-text-primary" : "text-io-text-disabled"}`}
            >
              Pagamento
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center gap-6">
        <div className="w-full pb-6">
          {cartState === 0 && <CardTable />}

          {cartState === 1 && (
            <CardBilling
              user={user}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              setCartState={setCartState}
              shippingOptions={shippingOptions}
              selectedDelivery={selectedDelivery}
              isLoadingShipping={isLoadingShipping}
              setSelectedDelivery={setSelectedDelivery}
            />
          )}

          {cartState === 2 && (
            <CardPayment user={user} setSelectedPayment={setSelectedPayment} />
          )}
        </div>
        <div className="flex min-w-80 flex-col gap-6">
          {cartState !== 0 && selectedAddress && (
            <CartSdAddress
              cartState={cartState}
              setCartState={setCartState}
              address={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          )}
          <CartSdSummary
            user={user}
            cartState={cartState}
            setCartState={setCartState}
            selectedAddress={selectedAddress}
            selectedPayment={selectedPayment}
            selectedDelivery={selectedDelivery}
          />
        </div>
      </div>
    </main>
  );
};
