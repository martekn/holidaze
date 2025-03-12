export const COOKIE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_INFO: "user_info"
};

export const COOKIE_OPTIONS = {
  // Secure HTTP-only cookie
  secure: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    sameSite: "strict" as const
  },
  // Client-accessible cookie
  client: {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    sameSite: "strict" as const
  }
};
