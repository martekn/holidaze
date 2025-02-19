import * as React from "react";
import { cn } from "@/lib/utils";
import { inputGroupStyles } from "@/lib/styles";

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, children, ...props }) => {
    return (
      <div className={cn(inputGroupStyles, className)} {...props}>
        {children}
      </div>
    );
  }
);

InputGroup.displayName = "InputGroup";
