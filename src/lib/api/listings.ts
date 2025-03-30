import { z } from "zod";
import {
  baseApiResponseSchema,
  baseErrorSchema,
  listingWithBookingsAndOwnerSchema,
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

export const isListingResponse = (
  response: TApiListingData | TBaseError
): response is TApiListingData => {
  return "data" in response;
};
