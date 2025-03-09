import { z } from "zod";
import { mediaSchema, locationSchema, amenitySchema } from "./base";

// User schema
export const baseUserSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    avatar: mediaSchema,
    banner: mediaSchema,
    bio: z.string().nullable()
  })
  .passthrough();
export type TBaseUser = z.infer<typeof baseUserSchema>;

// Listing schema
export const baseListingSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    media: z.array(mediaSchema),
    price: z.number(),
    maxGuests: z.number(),
    rating: z.number(),
    created: z.string(),
    updated: z.string(),
    meta: amenitySchema,
    location: locationSchema
  })
  .passthrough();
export type TBaseListing = z.infer<typeof baseListingSchema>;

// Booking schema
export const baseBookingSchema = z
  .object({
    id: z.string(),
    dateFrom: z.string(),
    dateTo: z.string(),
    guests: z.number(),
    created: z.string(),
    updated: z.string()
  })
  .passthrough();
export type TBaseBooking = z.infer<typeof baseBookingSchema>;
