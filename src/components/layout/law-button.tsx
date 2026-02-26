// components/layout/ui/law-button.tsx
"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const lawButtonVariants = cva(
  "group inline-flex items-center justify-center rounded-full border transition-all duration-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-[#c5a47e]/50 text-[10px] font-bold tracking-[0.2em] uppercase",
  {
    variants: {
      variant: {
        default:
          "border-[#c5a47e]/30 bg-[#0a0a0b] text-white hover:border-[#c5a47e] hover:bg-[#c5a47e] hover:text-[#0a0a0b] shadow-lg shadow-black/20",
        outline:
          "border-[#c5a47e]/40 bg-transparent text-[#c5a47e] hover:bg-[#c5a47e] hover:text-[#0a0a0b]",
        ghost:
          "border-transparent bg-transparent text-white/60 hover:text-[#c5a47e] hover:bg-white/5",
        expandible:
          "border-[#c5a47e]/20 bg-[#0a0a0b]/50 text-[#c5a47e] backdrop-blur-md hover:border-[#c5a47e] hover:bg-[#c5a47e] hover:text-[#0a0a0b]",
        "carousel-control":
          "border border-white/10 bg-[#0a0a0b] text-[#c5a47e] hover:border-[#c5a47e] hover:bg-[#c5a47e]/10 active:scale-90",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-10 px-6",
        lg: "h-14 px-10",
        icon: "h-12 w-12",
        "icon-sm": "h-10 w-10",
        "icon-lg": "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Correção da Interface: Removido o texto de classe do generic
export interface LawButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof lawButtonVariants> {
  asChild?: boolean;
  label?: string;
  icon?: React.ReactNode;
  labelClassName?: string;
}

const LawButton = React.forwardRef<HTMLButtonElement, LawButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      label,
      icon,
      children,
      labelClassName,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(lawButtonVariants({ variant, size, className }))}
        {...props}
      >
        {variant === "expandible" ? (
          <div className="flex items-center">
            <span
              className={cn(
                "max-w-0 overflow-hidden opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:mr-4 group-hover:max-w-40 group-hover:opacity-100",
                labelClassName,
              )}
            >
              <span className="whitespace-nowrap">{label}</span>
            </span>
            {icon || children}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span>{children}</span>
            {icon}
          </div>
        )}
      </Comp>
    );
  },
);

LawButton.displayName = "LawButton";

export { LawButton, lawButtonVariants };
