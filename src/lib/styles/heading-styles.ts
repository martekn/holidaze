import { cva, VariantProps } from "class-variance-authority";

export const headingStyles = cva("text-foreground font-accent font-medium", {
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

export type HeadingStyleProps = VariantProps<typeof headingStyles>;
