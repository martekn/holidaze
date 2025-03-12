"use client";

import { TUserWithVenueManager } from "../schema";
import { COOKIE_KEYS } from "./constants";

import Cookies from "js-cookie";

const getCookie = <T>(cookieKey: string, parseJson: boolean = false): T | null => {
  const cookie = Cookies.get(cookieKey);

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

export const getUserData = (): TUserWithVenueManager | null => {
  return getCookie<TUserWithVenueManager>(COOKIE_KEYS.USER_INFO, true);
};
