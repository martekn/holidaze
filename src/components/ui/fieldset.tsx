import { labelStyles } from "@/lib/styles";
import { cn } from "@/lib/utils/shadcn-utils";
import React from "react";

interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend: string;
}

const Fieldset = ({ legend, children, className, ...props }: FieldsetProps) => {
  return (
    <fieldset className={cn("space-y-8", className)} {...props}>
      <legend className={labelStyles()}>{legend}</legend>
      {children}
    </fieldset>
  );
};

export { Fieldset };
