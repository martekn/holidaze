import { cva, VariantProps } from "class-variance-authority";

export const cardStyles = cva("group relative rounded-lg bg-card text-card-foreground", {
  variants: {
    variant: {
      default: "",
      outline: "border border-border"
    },
    padding: {
      default: "",
      sm: "p-16",
      lg: "p-24"
    }
  },
  defaultVariants: {
    variant: "default",
    padding: "default"
  }
});

export type CardStyleProps = VariantProps<typeof cardStyles>;

export const cardImageStyles = cva(" overflow-hidden", {
  variants: {
    rounded: {
      all: "rounded-lg",
      top: "rounded-t-lg",
      bottom: "rounded-b-lg",
      right: "rounded-r-lg",
      left: "rounded-l-lg",
      none: ""
    },

    defaultVariants: {
      variant: "all"
    }
  }
});

export type CardImageStyleProps = VariantProps<typeof cardImageStyles>;
