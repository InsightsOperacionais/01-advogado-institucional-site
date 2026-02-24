// components/layout/ui/roceria-button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

const roceriaButtonVariants = cva(
  "group inline-flex items-center justify-center rounded-full border border-[#fbb725]/30 bg-[#141414]/90 text-[#fbb725] backdrop-blur-md transition-all hover:bg-[#fbb725] hover:text-[#141414] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "",
        icon: "px-0",
        expandible: "",
        "carousel-control":
          "border-2 border-[#fbb725]/30 bg-[#141414] text-[#fbb725] shadow-xl hover:bg-[#fbb725] hover:text-[#141414] active:scale-90", // Nova variante
      },
      size: {
        default: "h-10 px-4 lg:h-12 lg:px-4",
        sm: "h-8 px-3 lg:h-10 lg:px-3",
        lg: "h-12 px-6 lg:h-14 lg:px-6",
        icon: "h-10 w-10 lg:h-12 lg:w-12",
        "icon-sm": "h-8 w-8 lg:h-10 lg:w-10",
        "icon-lg": "h-12 w-12 lg:h-14 lg:w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface RoceriaButtonProps
  extends
    React.ComponentProps<"button">,
    VariantProps<typeof roceriaButtonVariants> {
  asChild?: boolean;
  label?: string;
  icon?: React.ReactNode;
  labelClassName?: string;
}

function RoceriaButton({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  label,
  icon,
  children,
  labelClassName,
  ...props
}: RoceriaButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  // Para variante expandible, precisamos de um label
  if (variant === "expandible" && !label) {
    console.warn("RoceriaButton: variant 'expandible' requires a label prop");
  }

  return (
    <Comp
      data-slot="roceria-button"
      data-variant={variant}
      data-size={size}
      className={cn(roceriaButtonVariants({ variant, size, className }))}
      {...props}
    >
      {variant === "expandible" ? (
        <>
          <span
            className={cn(
              "max-w-0 overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:mr-3 group-hover:max-w-30 group-hover:opacity-100",
              labelClassName,
            )}
          >
            <span className="text-[10px] font-bold tracking-[0.2em] whitespace-nowrap uppercase">
              {label}
            </span>
          </span>
          {icon || children}
        </>
      ) : variant === "icon" || variant === "carousel-control" ? (
        icon || children
      ) : (
        children
      )}
    </Comp>
  );
}

export { RoceriaButton, roceriaButtonVariants };
