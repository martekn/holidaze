import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils/shadcn-utils";
import { type ButtonStyleProps, buttonStyles } from "@/lib/styles";
import { IconLoader2 } from "@tabler/icons-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStyleProps {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, loading = false, variant, children, disabled, size, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonStyles({ variant, size }), className)}
        disabled={loading || disabled}
        ref={ref}
        {...props}
      >
        {loading && <IconLoader2 className="mr-8 h-4 w-4 animate-spin" />}
        <Slottable>{children}</Slottable>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
