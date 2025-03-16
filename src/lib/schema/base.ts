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
      message: z.string()
    })
  ),
  status: z.string().optional(),
  statusCode: z.number().optional()
});
export type TBaseError = z.infer<typeof baseErrorSchema>;

// Api error response
export const apiErrorResponseSchema = z.object({
  error: z.boolean(),
  data: baseErrorSchema
});
export type TApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
