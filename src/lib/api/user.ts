"use server";

import { getAuthToken, setUserData } from "../cookies/server";
import { apiProfileResponseSchema } from "../schema";
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
