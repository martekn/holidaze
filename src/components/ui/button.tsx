import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center border border-transparent justify-center gap-2 whitespace-nowrap rounded-lg text-base font-accent font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-16 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-300 active:bg-primary-500 focus-visible:bg-primary-300",
        outline:
          "border border-border bg-background hover:border-ring active:bg-neutral-200 focus-visible:border-ring disabled:bg-neutral-200",
        ghost: "hover:bg-neutral-200",
        "ghost-inverted": "text-neutral-100 hover:bg-neutral-600",
        link: "text-foreground font-semibold font-base underline-offset-2 hover:underline hover:text-neutral-800",
        "link-inverted":
          "text-neutral-200 font-semibold font-base underline-offset-2 hover:text-neutral-100 hover:underline",
        plain: "font-base border-0"
      },
      size: {
        default: "h-40 px-32 py-12",
        sm: "h-32 px-12 text-sm",
        icon: "h-40 w-40",
        none: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
