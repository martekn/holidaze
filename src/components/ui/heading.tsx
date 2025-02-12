import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("text-foreground font-accent font-medium", {
  variants: {
    variant: {
      heading1: "text-4xl md:text-5xl",
      heading2: "text-3xl md:text-4xl",
      heading3: "text-2xl md:text-3xl",
      heading4: "text-xl md:text-2xl",
      heading5: "text-base md:text-xl",
      heading6: "text-base"
    }
  },
  defaultVariants: {
    variant: "heading6"
  }
});

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = ({ tag: Tag, variant, className, ...props }: HeadingProps) => {
  return <Tag className={cn(headingVariants({ variant, className }))} {...props} />;
};

export { Heading, headingVariants };
