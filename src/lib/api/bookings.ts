"use server";

import { z } from "zod";
import {
  baseApiResponseSchema,
  baseBookingSchema,
  baseErrorSchema,
  bookingWithListingSchema,
  paginatedApiResponseSchema
} from "../schema";
import { apiFetch } from "../utils/api";

const createBookingResponseSchema = baseApiResponseSchema.extend({
  data: baseBookingSchema
});

type BookingData = {
  venueId: string;
  dateFrom: string | Date;
  dateTo: string | Date;
  guests: number;
};

const apiBookingsByUserSchema = paginatedApiResponseSchema.extend({
  data: z.array(bookingWithListingSchema)
});

export const getBookingsByUser = async (
  username: string,
  currentPage: number = 1,
  limit: number = 100,
  sortBy: string = "created"
) => {
  try {
    const response = await apiFetch(`/holidaze/profiles/${username}/bookings`, {
      query: { _venue: true, limit: limit, page: currentPage, sortBy: sortBy },
      requireAuth: true
    });
    const validated = apiBookingsByUserSchema.safeParse(response);
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

export const createBooking = async (data: BookingData) => {
  try {
    const response = await apiFetch("/holidaze/bookings", {
      data: data,
      method: "POST",
      requireAuth: true
    });
    const validated = createBookingResponseSchema.safeParse(response);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Invalid schema" }] };
  } catch (error) {
    const validated = baseErrorSchema.safeParse(error);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Unexpected error" }] };
  }
};

const apiBookingByIdSchema = baseApiResponseSchema.extend({ data: bookingWithListingSchema });

export const getBookingById = async (id: string) => {
  try {
    const response = await apiFetch(`/holidaze/bookings/${id}`, {
      query: { _venue: true },
      requireAuth: true
    });
    const validated = apiBookingByIdSchema.safeParse(response);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Invalid schema" }] };
  } catch (error) {
    const validated = baseErrorSchema.safeParse(error);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Unexpected error" }] };
  }
};
