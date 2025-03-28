import { cn } from "@/lib/utils/shadcn-utils";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

import { cva, VariantProps } from "class-variance-authority";

export const containerStyles = cva("px-16 mx-auto w-full", {
  variants: {
    variant: {
      fullBleed: "w-full mx-0",
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      "3xl": "max-w-screen-3xl"
    }
  },
  defaultVariants: {
    variant: "xl"
  }
});

export type ContainerStyleProps = VariantProps<typeof containerStyles>;

type ContainerProps = ContainerStyleProps & {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
};

const Container = ({ variant, children, className, asChild, ...props }: ContainerProps) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp className={cn(containerStyles({ variant }), className)} {...props}>
      {children}
    </Comp>
  );
};

export default Container;
