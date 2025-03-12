import * as React from "react";

import { cn } from "@/lib/utils/shadcn-utils";
import { inputStyles, InputStylesProps } from "@/lib/styles";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  borderStyle?: InputStylesProps["borderStyle"];
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ borderStyle, className, ...props }, ref) => {
    return (
      <textarea
        className={cn(inputStyles({ borderStyle }), "min-h-[80px]", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
