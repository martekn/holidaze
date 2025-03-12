"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils/shadcn-utils";
import { IconCheck } from "@tabler/icons-react";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer block h-20 w-20 shrink-0 items-center justify-center rounded-md border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-ring data-[state=checked]:bg-neutral-700 data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("text-current flex items-center justify-center")}>
      <IconCheck className="h-16 w-16 stroke-2" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
