import { z } from "zod";
import { baseUserSchema, baseListingSchema, baseBookingSchema } from "./entities";

// Booking with customer
export const bookingWithCustomerSchema = baseBookingSchema.extend({
  customer: baseUserSchema
});
export type TBookingWithCustomer = z.infer<typeof bookingWithCustomerSchema>;

// Listing with bookings
export const listingWithBookingsSchema = baseListingSchema.extend({
  bookings: z.array(baseBookingSchema),
  _count: z.object({
    bookings: z.number()
  })
});

export type TListingWithBookings = z.infer<typeof listingWithBookingsSchema>;

// Listing with owner and bookings
export const listingWithBookingsAndOwnerSchema = listingWithBookingsSchema.extend({
  owner: baseUserSchema,
  _count: z.object({
    bookings: z.number()
  })
});
export type TListingWithBookingsAndOwner = z.infer<typeof listingWithBookingsAndOwnerSchema>;

// Booking with listing
export const bookingWithListingSchema = baseBookingSchema.extend({
  venue: baseListingSchema
});
export type TBookingWithListing = z.infer<typeof bookingWithListingSchema>;

// User with venue manager state
export const userWithVenueManagerSchema = baseUserSchema.extend({ venueManager: z.boolean() });
export type TUserWithVenueManager = z.infer<typeof userWithVenueManagerSchema>;
