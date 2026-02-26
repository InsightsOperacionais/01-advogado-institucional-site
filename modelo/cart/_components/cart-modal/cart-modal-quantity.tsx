//src/components/cart/cart-modal-quantity.tsx
"use client";

import { Button } from "@/components/ui/button";

interface CartModalQuantityProps {
  quantity: number;
  availableQuantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  showAvailableQuantity: boolean;
}

export function CartModalQuantity({
  quantity,
  availableQuantity,
  onIncrement,
  onDecrement,
  showAvailableQuantity,
}: CartModalQuantityProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="sm"
        className="size-6 rounded-full p-0"
        onClick={onDecrement}
        disabled={quantity <= 1}
      >
        -
      </Button>
      <span className="text-primary w-8 text-center text-sm font-semibold">
        {quantity}
      </span>
      <Button
        variant="outline"
        size="sm"
        className="size-6 rounded-full p-0"
        onClick={onIncrement}
        disabled={quantity >= availableQuantity}
      >
        +
      </Button>
    </div>
  );
}
