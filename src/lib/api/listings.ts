"use server";

import { z } from "zod";
import {
  baseApiResponseSchema,
  baseErrorSchema,
  baseListingSchema,
  listingWithBookingsAndOwnerSchema,
  paginatedApiResponseSchema,
  TBaseError
} from "../schema";
import { apiFetch } from "../utils/api";

const apiListingSchema = baseApiResponseSchema.extend({ data: listingWithBookingsAndOwnerSchema });
export type TApiListingData = z.infer<typeof apiListingSchema>;

export const getListingById = async (id: string) => {
  try {
    const response = await apiFetch(`/holidaze/venues/${id}`, {
      query: { _bookings: true, _owner: true }
    });
    const validated = apiListingSchema.safeParse(response);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Invalid schema" }] };
  } catch (error) {
    const validated = baseErrorSchema.safeParse(error);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Unexpected error" }] };
  }
};

const apiProfileListingsSchema = paginatedApiResponseSchema.extend({
  data: z.array(baseListingSchema)
});

export const getListingsByProfile = async (username: string, currentPage: number) => {
  try {
    const response = await apiFetch(`/holidaze/profiles/${username}/venues`, {
      query: { _venue: true, limit: 12, page: currentPage },
      requireAuth: true
    });
    const validated = apiProfileListingsSchema.safeParse(response);
    if (validated.success) {
      return validated.data;
    }
    return { errors: [{ message: "Invalid schema" }] };
  } catch (error) {
    const validated = baseErrorSchema.safeParse(error);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Unexpected error" }] };
  }
};
export const isListingResponse = (
  response: TApiListingData | TBaseError
): response is TApiListingData => {
  return "data" in response;
};
