//src/app/(public)/shop/cart/_components/main/billing/card-billing.tsx
"use client";

// #region imports

import { AddressClient } from "@/components/address/address-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Address, CartDelivery, User } from "@/types";
import Delivery from "./delivery-section";
import NoUserBilling from "./no-user";
// #endregion

interface CardBillingProps {
  user: User | null;
  setSelectedAddress: (address: Address | null) => void;
  setCartState: (state: number) => void;
  selectedAddress: Address | null;
  isLoadingShipping: boolean;
  shippingOptions: CartDelivery[];
  selectedDelivery: CartDelivery | null;
  setSelectedDelivery: (delivery: CartDelivery) => void;
}
export default function CardBilling({
  user,
  setSelectedAddress,
  setCartState,
  isLoadingShipping,
  shippingOptions,
  selectedDelivery,
  setSelectedDelivery,
  selectedAddress,
}: CardBillingProps) {
  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  return (
    <div className="w-full">
      {!user ? (
        <>
          {selectedAddress ? (
            <Card>
              <CardHeader>
                <CardTitle>Entrega</CardTitle>
              </CardHeader>
              <CardContent>
                <Delivery
                  shippingOptions={shippingOptions}
                  selectedDelivery={selectedDelivery}
                  isLoadingShipping={isLoadingShipping}
                  setSelectedDelivery={setSelectedDelivery}
                />
              </CardContent>
            </Card>
          ) : (
            <NoUserBilling setSelectedAddress={handleSelectAddress} />
          )}
        </>
      ) : (
        <>
          {selectedAddress ? (
            <Card>
              <CardHeader>
                <CardTitle>Entrega</CardTitle>
              </CardHeader>
              <CardContent>
                <Delivery
                  shippingOptions={shippingOptions}
                  selectedDelivery={selectedDelivery}
                  isLoadingShipping={isLoadingShipping}
                  setSelectedDelivery={setSelectedDelivery}
                />
              </CardContent>
            </Card>
          ) : (
            <AddressClient
              user={user}
              selectable={true}
              onSelect={handleSelectAddress}
              setCartState={setCartState}
            />
          )}
        </>
      )}
    </div>
  );
}
