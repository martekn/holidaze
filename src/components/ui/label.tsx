"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { LabelStylesProps, labelStyles } from "@/lib/styles";

import { cn } from "@/lib/utils";

type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & LabelStylesProps;

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, size, ...props }, ref) => (
    <LabelPrimitive.Root ref={ref} className={cn(labelStyles({ size }), className)} {...props} />
  )
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
