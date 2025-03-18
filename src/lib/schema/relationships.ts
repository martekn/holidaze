import { z } from "zod";
import { baseUserSchema, baseListingSchema, baseBookingSchema } from "./entities";
import { baseApiResponseSchema, baseUserRegistrationSchema } from "./base";

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

// Api response for user profile
export const apiProfileResponseSchema = baseApiResponseSchema.extend({
  data: userWithVenueManagerSchema
});
export type TApiProfileResponse = z.infer<typeof apiProfileResponseSchema>;

// Api registration schema
export const apiRegistrationRequestSchema = baseUserRegistrationSchema.extend({
  venueManager: z.boolean()
});
export type TApiRegistrationRequest = z.infer<typeof apiRegistrationRequestSchema>;

// Api registration response schema
export const apiRegistrationResponseSchema = baseApiResponseSchema.extend({
  data: baseUserSchema
});
export type TApiRegistrationResponse = z.infer<typeof apiRegistrationResponseSchema>;

// Login schema for form and api
export const apiLoginRequestSchema = z.object({
  email: z.string().email({ message: "Pass in valid email address" }),
  password: z.string()
});

export type TApiLoginRequest = z.infer<typeof apiLoginRequestSchema>;

// Api login response schema
export const apiLoginResponseSchema = baseApiResponseSchema.extend({
  data: baseUserSchema.extend({ accessToken: z.string() })
});
export type TApiLoginResponse = z.infer<typeof apiLoginResponseSchema>;
