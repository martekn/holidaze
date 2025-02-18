import { cva, VariantProps } from "class-variance-authority";

export const inputStyles = cva(
  "peer flex w-full items-center rounded-lg border bg-background py-12 text-base ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:border-neutral-700 focus-visible:outline-none focus-visible:ring-1 gap-8 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground",
  {
    variants: {
      layout: {
        default: "px-12",
        withIcon: "pl-40 pr-12"
      },
      borderStyle: {
        default: "border-input",
        light: "border-neutral-300"
      }
    },
    defaultVariants: {
      layout: "default",
      borderStyle: "default"
    }
  }
);

export const inputWrapperStyles = "relative";

export const inputIconStyles =
  "h-20 w-20 absolute left-12 top-1/2 -translate-y-1/2 text-muted-foreground";

export type InputStylesProps = VariantProps<typeof inputStyles>;
