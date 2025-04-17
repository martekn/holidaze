import { labelStyles } from "@/lib/styles";
import { cn } from "@/lib/utils/shadcn-utils";
import { DateRange } from "react-day-picker";

type DateRangeLabelProps = {
  date: DateRange | undefined | null;
  children: React.ReactNode;
  isOpen: boolean;
};

const DateRangeLabel = ({ children }: DateRangeLabelProps) => {
  return <span className={cn(labelStyles())}>{children}</span>;
};

export { DateRangeLabel };
