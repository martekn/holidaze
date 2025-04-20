import { type NextRequest, NextResponse } from "next/server";
import { COOKIE_KEYS } from "./lib/cookies/constants";

const AUTHENTICATED_ROUTE_PATTERNS = [
  /^\/bookings\/[^/]+\/success$/,
  /^\/bookings\/[^/]+\/book$/,
  /^\/listings$/,
  /^\/listings\/[^/]+\/form$/,
  /^\/profile$/,
  /^\/profile\/bookings$/,
  /^\/profile\/hosted-listings$/,
  /^\/profile\/settings$/
];

const PUBLIC_ONLY_ROUTES = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthenticatedRoute = AUTHENTICATED_ROUTE_PATTERNS.some((pattern) => pattern.test(path));
  const isPublicOnlyRoute = PUBLIC_ONLY_ROUTES.includes(path);

  const authToken = request.cookies.get(COOKIE_KEYS.AUTH_TOKEN)?.value;
  const isAuthenticated = !!authToken;

  if (isAuthenticatedRoute && !isAuthenticated) {
    const fullUrl = path + request.nextUrl.search;
    return NextResponse.redirect(
      new URL(`/login?next=${encodeURIComponent(fullUrl)}`, request.nextUrl)
    );
  }

  if (isPublicOnlyRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/profile/settings", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"]
};
