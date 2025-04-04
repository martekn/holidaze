import { format, differenceInDays, isSameMonth, isSameYear } from "date-fns";

export const getFormattedDate = (date: Date) => {
  const currentDate = new Date();

  const isOverAYearAgo = differenceInDays(currentDate, date) > 365;
  const isSameMonthLastYear = isSameMonth(currentDate, date) && !isSameYear(currentDate, date);

  const includeYear = isOverAYearAgo || isSameMonthLastYear;

  return includeYear ? format(date, "MMMM do, yyyy") : format(date, "MMMM do");
};
