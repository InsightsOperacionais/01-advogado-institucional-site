//src/app/(public)/shop/cart/_components/main/payment/payment-section.tsx

"use client";

import { Button } from "@/components/ui/button";
import { CartPayment, User } from "@/types";
import { useState } from "react";
import { PaymentMethodData } from "./cart-data";
import CreditCard from "./credit-card";

// #region Payment

interface PaymentProps {
  user: User | null;
  setSelectedPayment: (payment: CartPayment) => void;
}
export default function Payment({ user, setSelectedPayment }: PaymentProps) {
  const [payment, setPayment] = useState<CartPayment | null>(null);

  const handlePaymentSelect = (payment: CartPayment) => {
    setPayment(payment);
    setSelectedPayment(payment);
  };

  return (
    <div className="flex flex-col gap-6">
      {PaymentMethodData.map((cartPayment) => (
        <PaymentItem
          user={user}
          key={cartPayment.id}
          cartPayment={cartPayment}
          payment={payment}
          setSelectedPayment={handlePaymentSelect}
          isCreditCard={cartPayment.isCreditCard}
        />
      )).filter((cart) => cart.props.cartPayment.enabled)}
    </div>
  );
}

interface PaymentItemProps {
  user: User | null;
  cartPayment: CartPayment;
  payment: CartPayment | null;
  setSelectedPayment: (payment: CartPayment) => void;
  isCreditCard?: boolean;
}

function PaymentItem({
  user,
  cartPayment,
  payment,
  setSelectedPayment,
  isCreditCard = false,
}: PaymentItemProps) {
  return (
    <Button
      variant="link3"
      className={`flex h-full min-h-24 w-full flex-col gap-6 border p-5 ${payment === cartPayment ? "border-io-text-primary/70" : "border-io-input-border/70"}`}
      onClick={() => {
        setSelectedPayment(cartPayment);
      }}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col items-start justify-center">
          <p className="text-io-text-primary text-lg font-semibold">
            {cartPayment.name}
          </p>
          <p className="text-io-text-secondary text-sm">
            {cartPayment.description}
          </p>
        </div>
        <div className="size-8">{cartPayment.icon}</div>
      </div>
      {isCreditCard && payment === cartPayment && <CreditCard user={user} />}
    </Button>
  );
}
// #endregion
