import { cva, VariantProps } from "class-variance-authority";

export const sectionStyles = cva("", {
  variants: {
    variant: {
      disabled: "",
      sm: "my-64",
      lg: "my-64 md:my-128"
    },
    innerSpacing: { disabled: "", sm: "py-64", lg: "py-64 md:py-128" }
  },
  defaultVariants: {
    variant: "sm",
    innerSpacing: "disabled"
  }
});

export type SectionStylesProps = VariantProps<typeof sectionStyles>;
