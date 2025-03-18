"use server";

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { COOKIE_KEYS, COOKIE_OPTIONS } from "./constants";
import { cookies } from "next/headers";
import { TUserWithVenueManager } from "../schema";

const getCookie = <T>(
  cookieKey: string,
  cookieStore?: ReadonlyRequestCookies,
  parseJson: boolean = false
): T | null => {
  const store = cookieStore || cookies();
  const cookie = store.get(cookieKey)?.value;

  if (!cookie) return null;

  if (!parseJson) {
    return cookie as T;
  }

  try {
    return JSON.parse(cookie) as T;
  } catch (error) {
    console.error("Failed to parse user data from cookie:", error);
    return null;
  }
};

export const getAuthToken = (cookieStore?: ReadonlyRequestCookies): string | null => {
  return getCookie<string>(COOKIE_KEYS.AUTH_TOKEN, cookieStore);
};

export const getUserData = (cookieStore?: ReadonlyRequestCookies): TUserWithVenueManager | null => {
  return getCookie<TUserWithVenueManager>(COOKIE_KEYS.USER_INFO, cookieStore, true);
};

export const setAuthToken = (token: string): void => {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_KEYS.AUTH_TOKEN, token, COOKIE_OPTIONS.secure);
};

export const setUserData = (userData: TUserWithVenueManager): void => {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_KEYS.USER_INFO, JSON.stringify(userData), COOKIE_OPTIONS.client);
};

export const clearAllAuthCookies = (): void => {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_KEYS.AUTH_TOKEN);
  cookieStore.delete(COOKIE_KEYS.USER_INFO);
};
