import { areIntervalsOverlapping, endOfDay, isEqual, isWithinInterval, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";

/**
 * Checks if a date range is valid by ensuring it doesn't overlap with any booked dates.
 *
 * @param dateRange - The date range to validate, which may have from, to, or both dates
 * @param bookedDates - Array of booked date ranges in date format
 * @returns Returns true if the date range is valid (no overlaps with booked dates), false otherwise
 *
 * @example
 * // Returns true (no overlap)
 * isValidDateRange(
 *   { from: new Date('2023-01-10'), to: new Date('2023-01-15') },
 *   [{ dateFrom: '2023-01-01', dateTo: '2023-01-09' }]
 * );
 *
 * @example
 * // Returns false (overlaps with booked date)
 * isValidDateRange(
 *   { from: new Date('2023-01-05') },
 *   [{ dateFrom: '2023-01-01', dateTo: '2023-01-10' }]
 * );
 *
 * @example
 * // Returns false (invalid single-day range)
 * isValidDateRange(
 *   { from: new Date('2023-01-05'), to: new Date('2023-01-05') },
 *   []
 * );
 */
export const isValidDateRange = (
  dateRange: DateRange,
  bookedDates: { dateFrom: Date; dateTo: Date }[]
) => {
  if (!dateRange.from && dateRange.to) return true;
  if (!dateRange.from && !dateRange.to) return false;
  if (isEqual(dateRange.from as Date, dateRange.to as Date)) return false;

  if (dateRange.from && !dateRange.to) {
    const isInvalid = bookedDates.some(({ dateFrom, dateTo }) =>
      isWithinInterval(startOfDay(dateRange.from as Date), {
        start: startOfDay(dateFrom),
        end: endOfDay(dateTo)
      })
    );
    return !isInvalid;
  }

  const range = { start: startOfDay(dateRange.from as Date), end: endOfDay(dateRange.to as Date) };
  const isInvalid = bookedDates.some(({ dateFrom, dateTo }) =>
    areIntervalsOverlapping(range, {
      start: startOfDay(dateFrom),
      end: endOfDay(dateTo)
    })
  );
  return !isInvalid;
};
