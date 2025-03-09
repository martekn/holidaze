import { cva, VariantProps } from "class-variance-authority";

export const floatingWrapperStyles = "relative group w-full";

export const floatingInputStyles =
  "peer placeholder:text-transparent focus-within:placeholder:text-muted-foreground";

export const floatingLabelStyles = cva(
  "absolute -translate-y-1/2 bg-neutral-100 px-2 transition-all duration-200 peer-focus-within:left-12 peer-focus-within:top-0 peer-focus-within:text-sm peer-focus-within:text-neutral-700 text-neutral-700",
  {
    variants: {
      variant: {
        default: "left-12",
        withIcon: "left-40"
      },
      layout: {
        centered: "top-1/2",
        top: "top-24"
      },
      state: {
        floating:
          "text-sm top-0 left-12 text-muted-foreground group-focus-visible:text-foreground group-data-[state='open']:text-foreground",
        default: ""
      }
    },
    defaultVariants: {
      variant: "default",
      layout: "centered",
      state: "default"
    }
  }
);

export type FloatingLabelStyleProps = VariantProps<typeof floatingLabelStyles>;
