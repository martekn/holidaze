import * as React from "react";
import { cn } from "@/lib/utils";
import { inputGroupStyles } from "@/lib/styles";

export const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn(inputGroupStyles, className)} {...props} ref={ref}>
        {children}
      </div>
    );
  }
);

InputGroup.displayName = "InputGroup";
