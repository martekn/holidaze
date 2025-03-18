import { floatingLabelStyles, labelStyles } from "@/lib/styles";
import { cn } from "@/lib/utils/shadcn-utils";
import { DateRange } from "react-day-picker";

type DateRangeLabelProps = {
  date: DateRange | undefined | null;
  children: React.ReactNode;
  isOpen: boolean;
  isFloating?: boolean;
};

const DateRangeLabel = ({ isFloating = false, date, isOpen, children }: DateRangeLabelProps) => {
  if (isFloating) {
    return (
      <span
        className={cn(
          labelStyles(),
          floatingLabelStyles({
            variant: "withIcon",
            state: date?.to || date?.from || isOpen ? "floating" : "default"
          }),
          "z-10"
        )}
      >
        {children}
      </span>
    );
  }
  return <span className={cn(labelStyles())}>{children}</span>;
};

export { DateRangeLabel };
