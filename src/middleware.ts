import { type NextRequest, NextResponse } from "next/server";
import { COOKIE_KEYS } from "./lib/cookies/constants";

const AUTHENTICATED_ROUTES = [
  "/bookings/[id]/success",
  "/listings",
  "/listings/[id]/book",
  "/listings/[id]/edit",
  "/listings/[id]/edit/preview",
  "/listings/[id]/create",
  "/listings/[id]/create/preview",
  "/profile",
  "/profile/bookings",
  "/profile/hosted-listings",
  "/profile/settings"
];

const PUBLIC_ONLY_ROUTES = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthenticatedRoute = AUTHENTICATED_ROUTES.includes(path);
  const isPublicOnlyRoute = PUBLIC_ONLY_ROUTES.includes(path);

  const authToken = request.cookies.get(COOKIE_KEYS.AUTH_TOKEN)?.value;
  const isAuthenticated = !!authToken;

  if (isAuthenticatedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(`/login?next=${path}`, request.nextUrl));
  }

  if (isPublicOnlyRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/profile/settings", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"]
};
