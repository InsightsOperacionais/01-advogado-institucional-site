"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/use-cart";
import { formatterBr } from "@/lib/utils";
import { useEffect, useState } from "react";

export function CartModalShippingSection() {
  const cart = useCart();
  const [zipCode, setZipCode] = useState("");
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);
  const [showShippingOptions, setShowShippingOptions] = useState(false);
  const [showCepInput, setShowCepInput] = useState(true);

  const handleCalculateShipping = async () => {
    if (!zipCode || zipCode.length !== 8) return;

    setIsLoadingShipping(true);
    cart.setShippingZipCode(zipCode);
    await cart.fetchShippingOptions();
    setIsLoadingShipping(false);
    setShowShippingOptions(true);
  };

  const handleSelectShipping = (option: any) => {
    cart.selectShippingOption(option);
    setShowShippingOptions(false);
    setShowCepInput(false);
  };

  const handleChangeCep = () => {
    setShowCepInput(true);
    setShowShippingOptions(false);
  };

  useEffect(() => {
    if (cart.shippingZipCode) {
      setZipCode(cart.shippingZipCode);
    }
  }, [cart.shippingZipCode]);

  return (
    <div className="flex flex-col gap-3">
      {showCepInput ? (
        <div className="flex items-center gap-2">
          <Input
            placeholder="Digite seu CEP"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
            maxLength={8}
            className="flex-1"
          />
          <Button
            onClick={handleCalculateShipping}
            disabled={isLoadingShipping || zipCode.length !== 8}
          >
            Calcular
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm">
            CEP: {zipCode.replace(/(\d{5})(\d{3})/, "$1-$2")}
          </p>
          <Button
            variant="custom"
            onClick={handleChangeCep}
            className="text-accent/70 hover:text-accent h-auto p-0 text-xs transition-colors duration-300"
          >
            Trocar CEP
          </Button>
        </div>
      )}

      {/* Mostra sempre o frete selecionado quando existir */}
      <div>
        {/* {cart.selectedDelivery && !showShippingOptions && (
          <p className="text-muted-foreground text-sm">
            Frete selecionado: {cart.selectedDelivery.name}
          </p>
        )} */}
        {cart.selectedDelivery && (
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Frete selecionado: {cart.selectedDelivery.name}
            </p>
            <p className="text-io-text-primary text-sm">
              {formatterBr.format(cart.selectedDelivery.price)}
            </p>
          </div>
        )}
      </div>

      {/* Container animado apenas para as opções de frete */}
      <div
        className={`transition-all duration-300 ease-in-out ${showShippingOptions ? "max-h-[500px]" : "max-h-0"} overflow-hidden`}
      >
        {isLoadingShipping ? (
          <div className="space-y-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : showShippingOptions && cart.shippingOptions.length > 0 ? (
          <div className="space-y-2 pb-2">
            {cart.shippingOptions.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className={`bg-background/20 h-full w-full justify-start ${cart.selectedDelivery?.id === option.id ? "border-accent" : ""}`}
                onClick={() => handleSelectShipping(option)}
              >
                <div className="flex w-full items-center justify-between gap-1">
                  <div className="flex items-center gap-2 text-left">
                    {/* <LuTruck className="h-4 w-4" /> */}
                    <p className="font-medium">{option.name} -</p>
                    <p className="text-muted-foreground text-sm">
                      {option.delivery_range.min}-{option.delivery_range.max}{" "}
                      dias
                    </p>
                  </div>
                  <p>{formatterBr.format(option.price)}</p>
                </div>
              </Button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Mensagem quando não há opções disponíveis */}
      {cart.shippingZipCode &&
        !showShippingOptions &&
        !cart.selectedDelivery && (
          <p className="text-muted-foreground text-sm">
            Nenhuma opção de frete disponível para este CEP.
          </p>
        )}
    </div>
  );
}
