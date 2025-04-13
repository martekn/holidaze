"use server";

import { z } from "zod";
import {
  baseApiResponseSchema,
  baseErrorSchema,
  baseListingSchema,
  listingWithBookingsAndOwnerSchema,
  listingWithBookingsSchema,
  paginatedApiResponseSchema,
  TBaseError,
  TBaseListing
} from "../schema";
import { apiFetch } from "../utils/api";
import { revalidatePath } from "next/cache";

const apiListingsSchema = paginatedApiResponseSchema.extend({
  data: z.array(listingWithBookingsSchema)
});

export const getListings = async (currentPage: number) => {
  try {
    const response = await apiFetch(`/holidaze/venues`, {
      query: { _bookings: true, page: currentPage }
    });
    const validated = apiListingsSchema.safeParse(response);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Invalid schema" }] };
  } catch (error) {
    const validated = baseErrorSchema.safeParse(error);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Unexpected error" }] };
  }
};
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

type baseListingData = Omit<TBaseListing, "id" | "created" | "updated">;

const apiListingDataSchema = baseApiResponseSchema.extend({
  data: baseListingSchema
});
export const createListing = async (data: baseListingData) => {
  const rating = Math.random() * (5 + Number.EPSILON);
  try {
    const response = await apiFetch("/holidaze/venues/", {
      data: { ...data, rating },
      method: "POST",
      requireAuth: true
    });

    revalidatePath(`/profile/hosted-listings`);
    const validated = apiListingDataSchema.safeParse(response);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Invalid schema" }] };
  } catch (error) {
    console.log(error);
    const validated = baseErrorSchema.safeParse(error);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Unexpected error" }] };
  }
};
export const updateListing = async (id: string, data: baseListingData) => {
  try {
    const response = await apiFetch(`/holidaze/venues/${id}`, {
      data: data,
      method: "PUT",
      requireAuth: true
    });
    revalidatePath(`/profile/hosted-listings`);

    const validated = apiListingDataSchema.safeParse(response);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Invalid schema" }] };
  } catch (error) {
    console.log(error);
    const validated = baseErrorSchema.safeParse(error);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Unexpected error" }] };
  }
};
export const deleteListing = async (id: string) => {
  try {
    const response = await apiFetch(`/holidaze/venues/${id}`, {
      method: "DELETE",
      requireAuth: true
    });

    if (!response) return null;

    return { errors: [{ message: "Invalid schema" }] };
  } catch (error) {
    console.log(error);
    const validated = baseErrorSchema.safeParse(error);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Unexpected error" }] };
  }
};
