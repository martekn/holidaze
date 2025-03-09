"use client";

import * as React from "react";
import { DateRange } from "react-day-picker";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { floatingWrapperStyles, formItemVariants, InputStylesProps } from "@/lib/styles";
import { DateRangeField } from "./date-range-field";
import { DateRangeLabel } from "./date-range-label";
import { useState } from "react";

interface RangeDatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  borderStyle?: InputStylesProps["borderStyle"];
  label?: string;
  isFloating?: boolean;
  placeholder?: string;
  bookedDates?: DateRange[];
  value?: DateRange | undefined | null;
  onChange?: (value: DateRange | undefined) => void;
}

export function DateRangePicker({
  className,
  isFloating = false,
  label,
  placeholder,
  borderStyle,
  bookedDates,
  value,
  onChange
}: RangeDatePickerProps) {
  const [open, setOpen] = useState(false);

  const matches = useMediaQuery("(min-width: 40em)");

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={"test"}
            className={cn(
              floatingWrapperStyles,
              "justify-start bg-background text-left font-normal focus-visible:outline-none"
            )}
          >
            <span className={cn(formItemVariants(), "relative", isFloating && "space-y-0")}>
              {label && (
                <DateRangeLabel isFloating={isFloating} date={value} isOpen={open}>
                  {label}
                </DateRangeLabel>
              )}
              <DateRangeField
                isFloating={isFloating}
                date={value}
                placeholder={placeholder}
                borderStyle={borderStyle}
              />
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={value?.from}
            selected={value === null ? undefined : value}
            onSelect={onChange}
            numberOfMonths={matches ? 2 : 1}
            showOutsideDays={false}
            excludeDisabled
            min={1}
            disabled={[{ before: new Date() }, ...(bookedDates || [])]}
            modifiers={{
              booked: bookedDates || []
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
