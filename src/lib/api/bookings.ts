"use server";

import {
  baseApiResponseSchema,
  baseBookingSchema,
  baseErrorSchema,
  bookingWithListingSchema
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

const apiBookingSchema = baseApiResponseSchema.extend({ data: bookingWithListingSchema });

export const getBookingById = async (id: string) => {
  try {
    const response = await apiFetch(`/holidaze/bookings/${id}`, {
      query: { _venue: true },
      requireAuth: true
    });
    const validated = apiBookingSchema.safeParse(response);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Invalid schema" }] };
  } catch (error) {
    const validated = baseErrorSchema.safeParse(error);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Unexpected error" }] };
  }
};
