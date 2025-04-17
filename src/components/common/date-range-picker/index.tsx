"use client";

import * as React from "react";
import { DateRange } from "react-day-picker";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils/shadcn-utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formItemVariants, InputStylesProps } from "@/lib/styles";
import { DateRangeField } from "./date-range-field";
import { DateRangeLabel } from "./date-range-label";
import { useState } from "react";

interface RangeDatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  borderStyle?: InputStylesProps["borderStyle"];
  label?: string;
  placeholder?: string;
  bookedDates?: DateRange[];
  value?: DateRange | undefined | null;
  onChange?: (value: DateRange | undefined) => void;
}

export function DateRangePicker({
  className,
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
              "justify-start bg-background text-left font-normal focus-visible:outline-none"
            )}
          >
            <span className={cn(formItemVariants(), "relative")}>
              {label && (
                <DateRangeLabel date={value} isOpen={open}>
                  {label}
                </DateRangeLabel>
              )}
              <DateRangeField date={value} placeholder={placeholder} borderStyle={borderStyle} />
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
