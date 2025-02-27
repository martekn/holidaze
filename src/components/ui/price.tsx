import { headingStyles } from "@/lib/styles/heading-styles";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const priceStyles = cva("font-base text-regular text-foreground", {
  variants: {
    variant: {
      default: "text-sm",
      lg: "text-base"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

type PriceStyleProps = VariantProps<typeof priceStyles>;
type PriceProps = PriceStyleProps & {
  price: number;
};

const Price = ({ variant, price }: PriceProps) => {
  return (
    <div className={cn(priceStyles({ variant }))}>
      <span className={headingStyles({ variant: variant === "lg" ? "heading3" : "heading5" })}>
        ${price}
      </span>{" "}
      / night
    </div>
  );
};

export default Price;
