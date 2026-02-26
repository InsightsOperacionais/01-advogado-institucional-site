//src/components/cart/cart-modal-product-card.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatterBr } from "@/lib/utils";
import { CartProduct } from "@/types";
import Image from "next/image";
import { LuTrash } from "react-icons/lu";
import { CartModalQuantity } from "./cart-modal-quantity";

interface ProductCardProps {
  product: CartProduct;
}

export function CartModalProductCard({ product }: ProductCardProps) {
  const cart = useCart();
  const handleRemoveItem = (id: string) => {
    cart.removeItem(id);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    cart.updateQuantity(id, quantity);
  };

  return (
    <div className="flex h-32 w-full items-center">
      <Image
        src={product.image}
        alt="product"
        width={90}
        height={90}
        className="bg-foreground/10 rounded-xl object-cover p-2"
      />
      <div className="ml-4 flex w-full flex-col justify-between">
        <div className="flex w-full items-center justify-between">
          <p className="text-primary text-sm font-semibold">{product.name}</p>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full p-0"
            onClick={() => handleRemoveItem(product.id)}
          >
            <LuTrash />
          </Button>
        </div>
        <p className="text-io-text-secondary text-xs">
          {product.subAttributes}
        </p>
        <div className="mt-3 flex w-full items-center justify-between">
          <CartModalQuantity
            quantity={product.quantity}
            availableQuantity={product.availableQuantity}
            onIncrement={() =>
              handleUpdateQuantity(product.id, product.quantity + 1)
            }
            onDecrement={() =>
              handleUpdateQuantity(product.id, product.quantity - 1)
            }
            showAvailableQuantity={false}
          />
          <p className="text-foreground pr-[10px] text-sm">
            {formatterBr.format(product.price * product.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
