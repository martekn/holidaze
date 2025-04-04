import { cva, VariantProps } from "class-variance-authority";

export const sectionStyles = cva("", {
  variants: {
    variant: {
      disabled: "",
      xs: "my-24",
      sm: "my-64",
      lg: "my-64 md:my-128"
    },
    innerSpacing: { disabled: "", xs: "py-24", sm: "py-64", lg: "py-64 md:py-128" }
  },
  defaultVariants: {
    variant: "sm",
    innerSpacing: "disabled"
  }
});

export type SectionStylesProps = VariantProps<typeof sectionStyles>;
