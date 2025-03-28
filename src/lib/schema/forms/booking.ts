import { z } from "zod";
import { requiredDateRangeSchema } from "../base";
import { TBaseListing } from "../entities";

// Booking form schema
export const getBookingFormSchema = (maxGuests: TBaseListing["maxGuests"]) => {
  return z.object({
    dateRange: requiredDateRangeSchema,
    guestCount: z.number().min(1).max(maxGuests)
  });
};

export type TBookingFormData = z.infer<ReturnType<typeof getBookingFormSchema>>;
