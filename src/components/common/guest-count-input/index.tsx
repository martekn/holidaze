import React from "react";
import { Button } from "@/components/ui/button";
import { IconMinus, IconPlus, IconUsers } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { InputStylesProps } from "@/lib/styles";

interface GuestCountInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  borderStyle?: InputStylesProps["borderStyle"];
  id: string;
  maxGuests?: number;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}

const GuestCountInput = React.forwardRef<HTMLInputElement, GuestCountInputProps>(
  ({ maxGuests, id, value, onChange, borderStyle, ...props }, ref) => {
    const maxValue = maxGuests ?? 100;
    const handleGuestIncrement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      const newValue = value === undefined ? 1 : Math.min(value + 1, maxValue);
      onChange(newValue);
    };

    const handleGuestDecrement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (value === undefined || value <= 1) return;
      onChange(value - 1);
    };

    return (
      <div className="relative">
        <Input
          {...props}
          id={id}
          ref={ref}
          type="text"
          borderStyle={borderStyle}
          icon={IconUsers}
          readOnly
          value={value ? `${value} guest${value > 1 ? "s" : ""}` : ""}
        />
        <div className="absolute right-16 top-1/2 flex -translate-y-1/2 items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-32 w-32"
            onClick={handleGuestDecrement}
            disabled={value === undefined || value <= 1}
          >
            <IconMinus className="h-16 w-16" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-32 w-32"
            onClick={handleGuestIncrement}
            disabled={value === maxValue}
          >
            <IconPlus className="h-16 w-16" />
          </Button>
        </div>
      </div>
    );
  }
);

GuestCountInput.displayName = "GuestCountInput";

export default GuestCountInput;
