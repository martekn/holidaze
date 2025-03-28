import { DateRange } from "react-day-picker";
import { z } from "zod";

// Media schema
export const mediaSchema = z.object({
  url: z.string(),
  alt: z.string()
});
export type TMedia = z.infer<typeof mediaSchema>;

// Location schema
export const locationSchema = z.object({
  address: z.string().nullable(),
  city: z.string().nullable(),
  zip: z.string().nullable(),
  country: z.string().nullable(),
  continent: z.string().nullable(),
  lat: z.number().nullable(),
  lng: z.number().nullable()
});
export type TLocation = z.infer<typeof locationSchema>;

// Amenity schema
export const amenitySchema = z.object({
  wifi: z.boolean(),
  parking: z.boolean(),
  breakfast: z.boolean(),
  pets: z.boolean()
});
export type TAmenity = z.infer<typeof amenitySchema>;

// API Response Base schemas
export const paginatedMetaSchema = z.object({
  isFirstPage: z.boolean(),
  isLastPage: z.boolean(),
  currentPage: z.number(),
  previousPage: z.number().nullable(),
  nextPage: z.number().nullable(),
  pageCount: z.number(),
  totalCount: z.number()
});
export type TPaginatedMeta = z.infer<typeof paginatedMetaSchema>;

// Base structure of api responses
export const baseApiResponseSchema = z.object({
  data: z.unknown(),
  meta: z.record(z.unknown()).or(z.object({}))
});
export type TBaseApiResponse = z.infer<typeof baseApiResponseSchema>;

// Paginated api response
export const paginatedApiResponseSchema = baseApiResponseSchema.extend({
  meta: paginatedMetaSchema
});
export type TPaginatedApiResponse = z.infer<typeof paginatedApiResponseSchema>;

// Base error schema
export const baseErrorSchema = z.object({
  errors: z.array(
    z.object({
      message: z.string(),
      code: z.string().optional(),
      path: z.array(z.union([z.string(), z.number()])).optional()
    })
  ),
  status: z.string().optional(),
  statusCode: z.number().optional()
});
export type TBaseError = z.infer<typeof baseErrorSchema>;

// Base registration schema
export const baseUserRegistrationSchema = z.object({
  name: z
    .string({ required_error: "Username is required" })
    .max(20, "Username cannot be longer than 20 characters"),
  email: z
    .string({
      required_error: "Email is required"
    })
    .email()
    .regex(/^[\w\-.]+@(stud\.)?noroff\.no$/, "Only stud.noroff.no emails are allowed to register")
    .trim(),
  password: z.string().min(8, "Password must be at least 8 characters long")
});
export type TBaseUserRegistration = z.infer<typeof baseUserRegistrationSchema>;

export const requiredDateRangeSchema = z.custom<DateRange>(
  (val) => {
    return (
      val &&
      typeof val === "object" &&
      "from" in val &&
      "to" in val &&
      val.from instanceof Date &&
      val.to instanceof Date
    );
  },
  {
    message: "Please select check-in and check-out dates"
  }
);
export type TRequiredDateRange = z.infer<typeof requiredDateRangeSchema>;
