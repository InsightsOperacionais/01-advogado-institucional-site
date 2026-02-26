//src/app/(public)/shop/cart/_components/main/payment/card-payment.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartPayment, User } from "@/types";
import Payment from "./payment-section";

interface CardPaymentProps {
  user: User | null;
  setSelectedPayment: (payment: CartPayment) => void;
}
export default function CardPayment({
  user,
  setSelectedPayment,
}: CardPaymentProps) {
  return (
    <>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <Payment setSelectedPayment={setSelectedPayment} user={user} />
        </CardContent>
      </Card>
    </>
  );
}
