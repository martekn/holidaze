import { cva, VariantProps } from "class-variance-authority";

export const labelStyles = cva(
  "text-base text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      size: {
        default: "font-medium",
        sm: "font-regular"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
);

export type LabelStylesProps = VariantProps<typeof labelStyles>;
