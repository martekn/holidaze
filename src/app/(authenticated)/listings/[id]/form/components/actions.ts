"use server";

import { revalidatePath } from "next/cache";

export const revalidatePage = () => {
  revalidatePath("/profile/hosted-listings");
};
