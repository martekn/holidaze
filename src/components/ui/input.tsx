import * as React from "react";

import { cn } from "@/lib/utils/shadcn-utils";
import { inputIconStyles, inputStyles, InputStylesProps, inputWrapperStyles } from "@/lib/styles";
import { TablerIcon } from "@tabler/icons-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: TablerIcon;
  borderStyle?: InputStylesProps["borderStyle"];
  _floatingLabelMode?: boolean; // This is to be used in the floating label component to allow sibling styling
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon: Icon, className, borderStyle, type, _floatingLabelMode, ...props }, ref) => {
    const layout = Icon ? "withIcon" : "default";

    const input = (
      <input
        type={type}
        className={cn("pl-48", inputStyles({ layout, borderStyle }), className)}
        ref={ref}
        {...props}
      />
    );

    if (Icon && _floatingLabelMode) {
      return (
        <>
          <Icon className={inputIconStyles} />
          {input}
        </>
      );
    } else if (Icon) {
      return (
        <div className={inputWrapperStyles}>
          <Icon className={inputIconStyles} />
          {input}
        </div>
      );
    }
    return input;
  }
);

Input.displayName = "Input";

export { Input };
