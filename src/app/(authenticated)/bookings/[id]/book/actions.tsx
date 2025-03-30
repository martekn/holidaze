"use server";

import { revalidatePath } from "next/cache";

export const revalidateBookingForm = (id: string) => {
  revalidatePath(`/bookings/${id}/book`);

  return { success: true };
};
