import { inputIconStyles, inputStyles, InputStylesProps, inputWrapperStyles } from "@/lib/styles";
import { cn } from "@/lib/utils/shadcn-utils";
import { IconCalendar } from "@tabler/icons-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

type DateRangeFieldProps = {
  date: DateRange | undefined | null;
  borderStyle?: InputStylesProps["borderStyle"];
  placeholder?: string;
};

const DateRangeField = ({ date, borderStyle, placeholder }: DateRangeFieldProps) => {
  return (
    <span className={cn(inputWrapperStyles, "block w-full")}>
      <IconCalendar className={cn(inputIconStyles)} />
      <span
        className={cn(
          inputStyles({ borderStyle, layout: "withIcon" }),
          "group-focus-visible:gap-8 group-focus-visible:border-neutral-700 group-focus-visible:outline-none group-focus-visible:ring-1 group-focus-visible:ring-ring group-data-[state='open']:gap-8 group-data-[state='open']:border-neutral-700 group-data-[state='open']:outline-none group-data-[state='open']:ring-1 group-data-[state='open']:ring-ring"
        )}
      >
        {date?.from ? (
          date.to ? (
            <>
              {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
            </>
          ) : (
            format(date.from, "LLL dd, y")
          )
        ) : (
          <span className={cn("font-normal")}>{placeholder || "Pick a date"}</span>
        )}
      </span>
    </span>
  );
};

export { DateRangeField };
