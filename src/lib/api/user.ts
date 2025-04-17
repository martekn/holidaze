"use server";

import { revalidatePath } from "next/cache";
import { getAuthToken, getUserData, setUserData } from "../cookies/server";
import { apiProfileResponseSchema, TUserWithVenueManager } from "../schema";
import { apiFetch } from "../utils/api";
import { getTokenPayload } from "../utils/get-token-payload";

export const setUser = async (accessToken?: string) => {
  const token = accessToken ?? getAuthToken();
  if (!token) {
    console.error("Authentication token is required but not found");
    return;
  }

  const payload = getTokenPayload(token);
  const username = payload.name;

  const response = await apiFetch(`/holidaze/profiles/${username}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });

  const validated = apiProfileResponseSchema.safeParse(response);
  if (!validated.success) {
    throw new Error("Invalid profile response schema");
  }
  setUserData(validated.data.data);
};

export const updateUser = async (data: Partial<TUserWithVenueManager>) => {
  const user = await getUserData();

  if (!user) return;

  const newUserData = { ...user, ...data };

  const username = user.name;
  const response = await apiFetch(`/holidaze/profiles/${username}`, {
    method: "PUT",
    requireAuth: true,
    data: newUserData
  });

  const validated = apiProfileResponseSchema.safeParse(response);
  if (!validated.success) {
    throw new Error("Invalid profile response schema");
  }
  revalidatePath("/profile/hosted-listings");
  setUserData(validated.data.data);
};
