"use server";

import { redirect } from "next/navigation";
import { clearAllAuthCookies, setAuthToken } from "../cookies/server";
import {
  apiLoginResponseSchema,
  apiRegistrationResponseSchema,
  TApiLoginRequest,
  TApiRegistrationRequest
} from "../schema";
import { apiFetch } from "../utils/api";
import { setUser } from "./user";

export const loginUser = async (
  data: TApiLoginRequest,
  redirectPath?: string | null,
  redirectUser: boolean = true
) => {
  try {
    const response = await apiFetch("/auth/login", { data: data, method: "POST" });
    const validated = apiLoginResponseSchema.safeParse(response);

    if (!validated.success) {
      throw new Error("Invalid login response schema");
    }

    const token = validated.data.data.accessToken;
    setAuthToken(token);
    await setUser(token);
  } catch (error) {
    return error;
  }
  if (redirectUser) redirect(redirectPath ?? "/");
};

export const registerUser = async (data: TApiRegistrationRequest, redirectPath?: string | null) => {
  try {
    const response = await apiFetch("/auth/register", { data: data, method: "POST" });
    const validated = apiRegistrationResponseSchema.safeParse(response);

    if (!validated.success) {
      throw new Error("Invalid registration response schema");
    }

    await loginUser({ email: data.email, password: data.password }, null, false);
  } catch (error) {
    return error;
  }

  redirect(redirectPath ?? "/");
};

export const logoutUser = () => {
  clearAllAuthCookies();
  redirect("/");
};
