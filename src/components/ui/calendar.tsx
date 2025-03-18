// This is using the v9 of react daypicker
// Shadcn does not support v9 yet and have therefore used
// https://date-picker.luca-felix.com/ as a starting point
// There was a bug with the year picker and have used the following workaround:
// https://github.com/flixlix/shadcn-date-picker/issues/10#issuecomment-2654647772

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/shadcn-utils";
import { differenceInCalendarDays } from "date-fns";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import * as React from "react";
import {
  DayPicker,
  labelNext,
  labelPrevious,
  useDayPicker,
  type DayPickerProps
} from "react-day-picker";
import { buttonStyles } from "@/lib/styles";

export type CalendarProps = DayPickerProps & {
  /**
   * In the year view, the number of years to display at once.
   * @default 12
   */
  yearRange?: number;

  /**
   * Wether to show the year switcher in the caption.
   * @default true
   */
  showYearSwitcher?: boolean;

  monthsClassName?: string;
  monthCaptionClassName?: string;
  weekdaysClassName?: string;
  weekdayClassName?: string;
  monthClassName?: string;
  captionClassName?: string;
  captionLabelClassName?: string;
  buttonNextClassName?: string;
  buttonPreviousClassName?: string;
  navClassName?: string;
  monthGridClassName?: string;
  weekClassName?: string;
  dayClassName?: string;
  dayButtonClassName?: string;
  rangeStartClassName?: string;
  rangeEndClassName?: string;
  selectedClassName?: string;
  todayClassName?: string;
  outsideClassName?: string;
  disabledClassName?: string;
  rangeMiddleClassName?: string;
  hiddenClassName?: string;
};

type NavView = "days" | "years";

/**
 * A custom calendar component built on top of react-day-picker.
 * @param props The props for the calendar.
 * @default yearRange 12
 * @returns
 */
function Calendar({
  className,
  showOutsideDays = true,
  showYearSwitcher = true,
  yearRange = 12,
  numberOfMonths,
  ...props
}: CalendarProps) {
  const [navView, setNavView] = React.useState<NavView>("days");
  const [displayYears, setDisplayYears] = React.useState<{
    from: number;
    to: number;
  }>(
    React.useMemo(() => {
      const currentYear = new Date().getFullYear();
      return {
        from: currentYear - Math.floor(yearRange / 2 - 1),
        to: currentYear + Math.ceil(yearRange / 2)
      };
    }, [yearRange])
  );

  const { onPrevClick, startMonth, endMonth } = props;

  const columnsDisplayed = navView === "years" ? 1 : numberOfMonths;

  const _monthsClassName = cn("relative flex gap-24", props.monthsClassName);
  const _monthCaptionClassName = cn(
    "relative mx-40 flex h-32 items-center justify-center ",
    props.monthCaptionClassName
  );
  const _weekdaysClassName = cn("flex flex-row", props.weekdaysClassName);
  const _weekdayClassName = cn(
    "w-32 text-sm font-normal text-muted-foreground",
    props.weekdayClassName
  );
  const _monthClassName = cn("w-full", props.monthClassName);
  const _captionClassName = cn(
    "relative flex items-center justify-center pt-4",
    props.captionClassName
  );
  const _captionLabelClassName = cn("truncate text-sm font-medium", props.captionLabelClassName);
  const buttonNavClassName = buttonStyles({
    variant: "outline",
    className: "absolute h-32 w-32 bg-transparent p-0 opacity-50 hover:opacity-100"
  });
  const _buttonNextClassName = cn(buttonNavClassName, "right-0", props.buttonNextClassName);
  const _buttonPreviousClassName = cn(buttonNavClassName, "left-0", props.buttonPreviousClassName);
  const _navClassName = cn("flex items-start absolute inset-x-0", props.navClassName);
  const _monthGridClassName = cn(" mx-auto mt-16", props.monthGridClassName);
  const _weekClassName = cn("mt-8 flex w-max items-start", props.weekClassName);
  const _dayClassName = cn(
    "flex size-32 flex-4 items-center justify-center p-0 text-sm",
    props.dayClassName
  );
  const _dayButtonClassName = cn(
    buttonStyles({ variant: "ghost" }),
    "size-32 rounded-md p-0 font-normal transition-none aria-selected:opacity-100",
    props.dayButtonClassName
  );
  const buttonRangeClassName =
    "bg-neutral-300/60 [&>button]:bg-neutral-700 [&>button]:text-neutral-100 [&>button]:hover:bg-neutral-700/90 [&>button]:hover:text-neutral-100";
  const _rangeStartClassName = cn(
    buttonRangeClassName,
    "day-range-start rounded-s-md ",
    props.rangeStartClassName
  );
  const _rangeEndClassName = cn(
    buttonRangeClassName,
    "day-range-end rounded-e-md ",
    props.rangeEndClassName
  );
  const _rangeMiddleClassName = cn(
    "bg-neutral-300/60 !text-foreground [&>button]:bg-transparent [&>button]:!text-foreground [&>button]:hover:!bg-neutral-200 [&>button]:hover:!text-foreground",
    props.rangeMiddleClassName
  );
  const _selectedClassName = cn(
    "[&>button]:bg-neutral-700 [&>button]:text-neutral-100 [&>button]:hover:bg-neutral-700 [&>button]:hover:text-neutral-100",
    props.selectedClassName
  );
  const _todayClassName = cn(
    "[&>button]:after:block [&>button]:after:content-[''] [&>button]:after:h-[1px] [&>button]:after:w-full [&>button]:after:bg-neutral-700 [&>button]:relative [&>button]:after:absolute [&>button]:after:bottom-0 [&>button]:after:inset-x-0 ",
    props.todayClassName
  );
  const _outsideClassName = cn(
    "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
    props.outsideClassName
  );
  const _disabledClassName = cn("text-muted-foreground opacity-50", props.disabledClassName);
  const _hiddenClassName = cn("invisible flex-16", props.hiddenClassName);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-12", className)}
      classNames={{
        months: _monthsClassName,
        month_caption: _monthCaptionClassName,
        weekdays: _weekdaysClassName,
        weekday: _weekdayClassName,
        month: _monthClassName,
        caption: _captionClassName,
        caption_label: _captionLabelClassName,
        button_next: _buttonNextClassName,
        button_previous: _buttonPreviousClassName,
        nav: _navClassName,
        month_grid: _monthGridClassName,
        week: _weekClassName,
        day: _dayClassName,
        day_button: _dayButtonClassName,
        range_start: _rangeStartClassName,
        range_middle: _rangeMiddleClassName,
        range_end: _rangeEndClassName,
        selected: _selectedClassName,
        today: _todayClassName,
        outside: _outsideClassName,
        disabled: _disabledClassName,
        hidden: _hiddenClassName
      }}
      modifiersClassNames={{
        booked: "bg-neutral-200 line-through"
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? IconChevronLeft : IconChevronRight;
          return <Icon className="h-16 w-16" />;
        },
        Nav: ({ className }) => (
          <Nav
            className={className}
            displayYears={displayYears}
            navView={navView}
            setDisplayYears={setDisplayYears}
            startMonth={startMonth}
            endMonth={endMonth}
            onPrevClick={onPrevClick}
          />
        ),
        CaptionLabel: (props) => (
          <CaptionLabel
            showYearSwitcher={showYearSwitcher}
            navView={navView}
            setNavView={setNavView}
            displayYears={displayYears}
            {...props}
          />
        ),
        MonthGrid: ({ className, children, ...props }) => (
          <MonthGrid
            className={className}
            displayYears={displayYears}
            startMonth={startMonth}
            endMonth={endMonth}
            navView={navView}
            setNavView={setNavView}
            {...props}
          >
            {children}
          </MonthGrid>
        )
      }}
      numberOfMonths={columnsDisplayed}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

function Nav({
  className,
  navView,
  startMonth,
  endMonth,
  displayYears,
  setDisplayYears,
  onPrevClick,
  onNextClick
}: {
  className?: string;
  navView: NavView;
  startMonth?: Date;
  endMonth?: Date;
  displayYears: { from: number; to: number };
  setDisplayYears: React.Dispatch<React.SetStateAction<{ from: number; to: number }>>;
  onPrevClick?: (date: Date) => void;
  onNextClick?: (date: Date) => void;
}) {
  const { nextMonth, previousMonth, goToMonth } = useDayPicker();

  const isPreviousDisabled = (() => {
    if (navView === "years") {
      return (
        (startMonth &&
          differenceInCalendarDays(new Date(displayYears.from - 1, 0, 1), startMonth) < 0) ||
        (endMonth && differenceInCalendarDays(new Date(displayYears.from - 1, 0, 1), endMonth) > 0)
      );
    }
    return !previousMonth;
  })();

  const isNextDisabled = (() => {
    if (navView === "years") {
      return (
        (startMonth &&
          differenceInCalendarDays(new Date(displayYears.to + 1, 0, 1), startMonth) < 0) ||
        (endMonth && differenceInCalendarDays(new Date(displayYears.to + 1, 0, 1), endMonth) > 0)
      );
    }
    return !nextMonth;
  })();

  const handlePreviousClick = React.useCallback(() => {
    if (!previousMonth) return;
    if (navView === "years") {
      setDisplayYears((prev) => ({
        from: prev.from - (prev.to - prev.from + 1),
        to: prev.to - (prev.to - prev.from + 1)
      }));
      onPrevClick?.(new Date(displayYears.from - (displayYears.to - displayYears.from), 0, 1));
      return;
    }
    goToMonth(previousMonth);
    onPrevClick?.(previousMonth);
  }, [previousMonth, goToMonth, setDisplayYears, onPrevClick, navView, displayYears]);

  const handleNextClick = React.useCallback(() => {
    if (!nextMonth) return;
    if (navView === "years") {
      setDisplayYears((prev) => ({
        from: prev.from + (prev.to - prev.from + 1),
        to: prev.to + (prev.to - prev.from + 1)
      }));
      onNextClick?.(new Date(displayYears.from + (displayYears.to - displayYears.from), 0, 1));
      return;
    }
    goToMonth(nextMonth);
    onNextClick?.(nextMonth);
  }, [goToMonth, nextMonth, setDisplayYears, onNextClick, navView, displayYears]);
  return (
    <nav className={cn("flex items-center", className)}>
      <Button
        variant="outline"
        className="absolute left-0 h-32 w-32 bg-transparent p-0 opacity-80 hover:opacity-100"
        type="button"
        tabIndex={isPreviousDisabled ? undefined : -1}
        disabled={isPreviousDisabled}
        aria-label={
          navView === "years"
            ? `Go to the previous ${displayYears.to - displayYears.from + 1} years`
            : labelPrevious(previousMonth)
        }
        onClick={handlePreviousClick}
      >
        <IconChevronLeft className="h-16 w-16" />
      </Button>

      <Button
        variant="outline"
        className="absolute right-0 h-32 w-32 bg-transparent p-0 opacity-80 hover:opacity-100"
        type="button"
        tabIndex={isNextDisabled ? undefined : -1}
        disabled={isNextDisabled}
        aria-label={
          navView === "years"
            ? `Go to the next ${displayYears.to - displayYears.from + 1} years`
            : labelNext(nextMonth)
        }
        onClick={handleNextClick}
      >
        <IconChevronRight className="h-16 w-16" />
      </Button>
    </nav>
  );
}

function CaptionLabel({
  children,
  showYearSwitcher,
  navView,
  setNavView,
  displayYears,
  ...props
}: {
  showYearSwitcher?: boolean;
  navView: NavView;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
  displayYears: { from: number; to: number };
} & React.HTMLAttributes<HTMLSpanElement>) {
  if (!showYearSwitcher) return <span {...props}>{children}</span>;
  return (
    <Button
      className="h-32 w-full truncate text-sm font-medium"
      variant="ghost"
      size="sm"
      onClick={() => setNavView((prev) => (prev === "days" ? "years" : "days"))}
    >
      {navView === "days" ? children : displayYears.from + " - " + displayYears.to}
    </Button>
  );
}

function MonthGrid({
  className,
  children,
  displayYears,
  startMonth,
  endMonth,
  navView,
  setNavView,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  displayYears: { from: number; to: number };
  startMonth?: Date;
  endMonth?: Date;
  navView: NavView;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
} & React.TableHTMLAttributes<HTMLTableElement>) {
  if (navView === "years") {
    return (
      <YearGrid
        displayYears={displayYears}
        startMonth={startMonth}
        endMonth={endMonth}
        setNavView={setNavView}
        navView={navView}
        className={className}
        {...props}
      />
    );
  }
  return (
    <table className={className} {...props}>
      {children}
    </table>
  );
}

function YearGrid({
  className,
  displayYears,
  startMonth,
  endMonth,
  setNavView,
  navView,
  ...props
}: {
  className?: string;
  displayYears: { from: number; to: number };
  startMonth?: Date;
  endMonth?: Date;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
  navView: NavView;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { goToMonth, selected: selectedRange } = useDayPicker<{
    mode: "range";
  }>();
  const { selected: selectedSingle } = useDayPicker<{
    mode: "single";
  }>();
  const { selected: selectedMultiple } = useDayPicker<{
    mode: "multiple";
  }>();

  const getSelectedMonth = React.useCallback((): number => {
    if (selectedRange && selectedRange.from instanceof Date) {
      return selectedRange.from.getMonth();
    }
    if (selectedSingle && selectedSingle instanceof Date) {
      return selectedSingle.getMonth();
    }
    if (selectedMultiple && selectedMultiple.length > 0 && selectedMultiple[0] instanceof Date) {
      return selectedMultiple[0].getMonth();
    }
    return new Date().getMonth();
  }, [selectedRange, selectedSingle, selectedMultiple]);

  return (
    <div className={cn("grid grid-cols-4 gap-y-8", className)} {...props}>
      {Array.from({ length: displayYears.to - displayYears.from + 1 }, (_, i) => {
        const isBefore =
          differenceInCalendarDays(
            new Date(displayYears.from + i, 11, 31),
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            startMonth!
          ) < 0;
        const isAfter =
          differenceInCalendarDays(
            new Date(displayYears.from + i, 0, 0),
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            endMonth!
          ) > 0;
        const isDisabled = isBefore || isAfter;
        return (
          <Button
            key={i}
            className={cn(
              "h-32 w-full px-4 text-sm font-normal text-foreground",
              displayYears.from + i === new Date().getFullYear() &&
                "relative font-medium after:absolute after:inset-x-auto after:bottom-0 after:block after:h-[1px] after:w-40 after:bg-neutral-700 after:content-[''] hover:text-neutral-700"
            )}
            variant="ghost"
            onClick={() => {
              setNavView("days");
              goToMonth(new Date(displayYears.from + i, getSelectedMonth()));
            }}
            disabled={navView === "years" ? isDisabled : undefined}
          >
            {displayYears.from + i}
          </Button>
        );
      })}
    </div>
  );
}

export { Calendar };
