import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { floatingWrapperStyles, InputStylesProps } from "@/lib/styles";
import { floatingInputStyles, floatingLabelStyles } from "@/lib/styles";
import { cn } from "@/lib/utils/shadcn-utils";
import { TablerIcon } from "@tabler/icons-react";
import React from "react";
import { FieldError } from "react-hook-form";

interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: FieldError;
  borderStyle?: InputStylesProps["borderStyle"];
  type?: "textarea" | "text" | "email" | "password" | "number" | "tel";
  icon?: TablerIcon;
}

// The component must be setup to pass in a reactive value in order to float the label when theres content in the input field
const FloatingLabelInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FloatingLabelInputProps
>(({ id, label, error, borderStyle = "default", type = "text", icon: Icon, ...props }, ref) => {
  const isTextarea = type === "textarea";

  return (
    <div className={floatingWrapperStyles}>
      {isTextarea ? (
        <Textarea
          id={id}
          className={floatingInputStyles}
          borderStyle={borderStyle}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          {...props}
        />
      ) : (
        <Input
          icon={Icon}
          id={id}
          className={floatingInputStyles}
          _floatingLabelMode
          borderStyle={borderStyle}
          ref={ref as React.Ref<HTMLInputElement>}
          {...props}
        />
      )}
      <Label
        htmlFor={id}
        className={cn(
          floatingLabelStyles({
            variant: Icon && !isTextarea ? "withIcon" : "default",
            layout: isTextarea ? "top" : "centered",
            state: props.value?.toString() ? "floating" : "default"
          })
        )}
      >
        {label}
      </Label>
    </div>
  );
});

FloatingLabelInput.displayName = "FloatingLabelInput";
export { FloatingLabelInput };
