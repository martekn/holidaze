import { cva, VariantProps } from "class-variance-authority";

export const formItemVariants = cva("", {
  variants: {
    variant: {
      default: "space-y-4 block",
      radio: "flex items-center gap-x-8",
      checkbox: "flex items-center gap-x-8"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export type FormItemStyleProps = VariantProps<typeof formItemVariants>;
