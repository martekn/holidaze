import { differenceInCalendarDays } from "date-fns";

export interface BookingCalculation {
  nights: number;
  totalPrice: number;
  isValidRange: boolean;
}
/**
 * Calculates booking details based on date range and nightly price
 *
 * @param dateRange - The date range for the booking
 * @param [dateRange.from] - Start date of the booking
 * @param [dateRange.to] - End date of the booking
 * @param pricePerNight - Price per night for the booking
 *
 * @returns An object containing:
 * @returns nights - Number of nights (0 if invalid range)
 * @returns totalPrice - Total price (nights × pricePerNight)
 * @returns isValidRange - True if date range is valid (from < to)
 *
 * @example
 * // Returns { nights: 7, totalPrice: 700, isValidRange: true }
 * calculateBookingDetails(
 *   { from: new Date('2023-06-01'), to: new Date('2023-06-08') },
 *   100
 * );
 *
 * @example
 * // Returns { nights: 0, totalPrice: 0, isValidRange: false }
 * calculateBookingDetails(undefined, 100);
 */
export const calculateBookingDetails = (
  dateRange: { from?: Date; to?: Date } | undefined,
  pricePerNight: number
): BookingCalculation => {
  if (!dateRange?.from || !dateRange?.to) {
    return { nights: 0, totalPrice: 0, isValidRange: false };
  }

  const nights = differenceInCalendarDays(dateRange.to, dateRange.from);
  const totalPrice = nights * pricePerNight;

  return {
    nights,
    totalPrice,
    isValidRange: nights > 0
  };
};
