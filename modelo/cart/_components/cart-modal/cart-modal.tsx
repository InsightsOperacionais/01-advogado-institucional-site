//src/components/cart/cart-modal.tsx
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatterBr } from "@/lib/utils";

import { ShoppingCart, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CartModalProductCard } from "./cart-modal-product-card";
import { CartModalShippingSection } from "./cart-modal-shipping";

export function CartModal({}) {
  const cart = useCart();
  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center" asChild>
        <Button size="icon" variant="navbar">
          <div className="relative flex h-5 w-5 items-center justify-center">
            <span className="bg-accent absolute -top-1 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[10px] font-medium text-black">
              {cart.items.length}
            </span>
            <ShoppingCart className="size-4" />
          </div>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="bg-background/80 flex w-full flex-col shadow-sm saturate-100 backdrop-blur-lg transition-colors duration-500 ease-in-out sm:w-[400px] lg:w-[450px]"
      >
        <div className="flex h-full flex-col">
          {/* Header fixo */}
          <Header />

          {/* Content com scroll */}
          <div className="flex-1 overflow-hidden">
            <Content />
          </div>

          {/* Footer fixo */}
          <Footer />
        </div>
      </SheetContent>
    </Sheet>
  );
}

// #region Header
function Header() {
  return (
    <SheetHeader className="border-foreground/20 h-[90px] border-b py-0">
      <SheetTitle className="flex h-full items-center justify-between px-4 text-2xl">
        Meu carrinho
        <div className="flex items-center justify-center gap-2">
          <SheetTrigger>
            <X className="size-5.5 hover:scale-110" />
          </SheetTrigger>
        </div>
      </SheetTitle>
    </SheetHeader>
  );
}
// #endregion

// #region Content
function Content() {
  const cart = useCart();
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-12 px-4 py-4">
        {cart.items.length === 0 ? (
          <div className="mt-32 flex h-[550px] flex-col items-center justify-center gap-4">
            <Image
              src="/illustrations/illustration_empty_cart.svg"
              width={350}
              height={350}
              alt="empty cart"
            />
            <p className="text-io-text-secondary text-sm font-semibold">
              carrinho vazio
            </p>
          </div>
        ) : (
          <div className="pb-4">
            {cart.items.map((item) => (
              <CartModalProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
// #endregion

// #region Footer
function Footer() {
  const items = useCart((state) => state.items);
  const router = useRouter();
  const cart = useCart();

  const subTotalPrice = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalPrice = subTotalPrice + (cart.selectedDelivery?.price || 0);

  return (
    <div className="flex flex-col gap-4 border-t px-4 py-6">
      {cart.items.length === 0 ? null : (
        <>
          {/* Resumo do Pedido */}
          {/* <Separator className="border-io-primary-darker border-[1px] border-dashed bg-transparent" /> */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-io-text-secondary text-sm">Subtotal</p>
              <p className="text-io-text-primary text-sm">
                {formatterBr.format(subTotalPrice)}
              </p>
            </div>

            {/* {cart.selectedDelivery && (
              <div className="flex items-center justify-between">
                <p className="text-io-text-secondary text-sm">Frete</p>
                <p className="text-io-text-primary text-sm">
                  {formatterBr.format(cart.selectedDelivery.price)}
                </p>
              </div>
            )} */}
          </div>
          {/* <Separator className="border-io-primary-darker border-[1px] border-dashed bg-transparent" /> */}

          {/* Componente de Frete */}
          <div>
            <CartModalShippingSection />
          </div>

          <Separator className="border-io-primary-darker border-b border-dashed bg-transparent" />
          <div className="flex items-center justify-between">
            <p className="text-io-text-primary text-base">Total</p>
            <p className="text-io-error-light text-sm">
              {formatterBr.format(totalPrice)}
            </p>
          </div>

          <SheetClose
            className="bg-accent/80 text-foreground hover:bg-accent mt-3 h-9 w-full cursor-pointer rounded-md text-sm font-medium uppercase shadow-xs transition-colors"
            onClick={() => {
              router.push("/shop/cart?step=0");
            }}
          >
            checkout
          </SheetClose>
        </>
      )}
    </div>
  );
}
// #endregion
