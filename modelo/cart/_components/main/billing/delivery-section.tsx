//src/app/(public)/shop/cart/_components/main/payment/delivery-section.tsx

"use client";

import { formatterBr } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CartDelivery } from "@/types";
import { LuTruck } from "react-icons/lu";

interface DeliveryProps {
  selectedDelivery: CartDelivery | null;
  setSelectedDelivery: (delivery: CartDelivery) => void;
  shippingOptions: CartDelivery[];
  isLoadingShipping: boolean;
}

export default function Delivery({
  setSelectedDelivery,
  selectedDelivery,
  shippingOptions,
  isLoadingShipping,
}: DeliveryProps) {
  const handleDeliverySelect = (delivery: CartDelivery) => {
    setSelectedDelivery(delivery);
  };

  if (isLoadingShipping) {
    return (
      <div className="grid grid-cols-2 gap-6">
        {[1, 2, 3].map((item) => (
          <Skeleton key={item} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (shippingOptions.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-io-text-secondary">
          Desculpe, nenhuma opção de entrega disponível para o endereço
          informado.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {shippingOptions.map((data) => (
        <DeliveryItem
          key={data.id}
          deliveryData={data}
          delivery={selectedDelivery}
          setSelectedDelivery={handleDeliverySelect}
        />
      ))}
    </div>
  );

  // return (
  //   <div className="grid grid-cols-2 gap-6">
  //     {DeliveryMethodData.map((data) => (
  //       <DeliveryItem
  //         key={data.id}
  //         deliveryData={data}
  //         delivery={delivery}
  //         setSelectedDelivery={handleDeliverySelect}
  //       />
  //     ))}
  //   </div>
  // );
}

interface DeliveryButtonProps {
  deliveryData: CartDelivery;
  delivery: CartDelivery | null;
  setSelectedDelivery: (delivery: CartDelivery) => void;
}

function DeliveryItem({
  deliveryData,
  delivery,
  setSelectedDelivery,
}: DeliveryButtonProps) {
  return (
    <Button
      variant="link3"
      className={`h-24 w-full border p-6 ${deliveryData === delivery ? "border-io-text-primary/70" : "border-io-input-border/70"}`}
      onClick={() => setSelectedDelivery(deliveryData)}
    >
      <div className="flex w-full items-center gap-3">
        <div className="flex size-10 items-center justify-center">
          {deliveryData.icon ? (
            deliveryData.icon
          ) : (
            <LuTruck className="size-full" />
          )}
        </div>
        <div className="flex w-full flex-col items-start">
          <div className="flex h-7 w-full items-center justify-between gap-3">
            <p className="text-io-text-primary text-base font-semibold">
              {deliveryData.name}
            </p>
            <p className="text-io-text-primary text-base font-semibold">
              {formatterBr.format(deliveryData.price)}
            </p>
          </div>
          <p className="text-io-text-secondary text-sm">
            {deliveryData.delivery_range.min}-{deliveryData.delivery_range.max}{" "}
            dias úteis
          </p>
        </div>
      </div>
    </Button>
  );
}
