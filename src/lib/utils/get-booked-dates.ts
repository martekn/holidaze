import { TListingWithBookings } from "../schema";

/**
 * Extracts booked date ranges from a listing's bookings
 *
 * @param bookings - Array of bookings from a listing
 * @returns Array of date range objects representing booked periods
 *
 * @example
 * // Returns [{from: Date('2023-06-01'), to: Date('2023-06-07')}]
 * getBookedDates([
 *   { dateFrom: '2023-06-01', dateTo: '2023-06-07',}
 * ]);
 *
 * @example
 * // Returns []
 * getBookedDates([]);
 *
 * @description
 * This utility function transforms raw booking data into usable Date ranges.
 * Each booking's dateFrom/dateTo strings are converted to Date objects.
 * Returns an empty array if no bookings exist.
 */
export const getBookedDates = (bookings: TListingWithBookings["bookings"]) => {
  if (bookings.length === 0) return [];

  const bookedDates = bookings.map((booking) => {
    return { from: new Date(booking.dateFrom), to: new Date(booking.dateTo) };
  });

  return bookedDates;
};
