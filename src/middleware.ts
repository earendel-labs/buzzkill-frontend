import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname, searchParams } = req.nextUrl;

  // Skip middleware for /api/auth routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Determine the cookie name based on the environment
  const cookieName = process.env.NEXTAUTH_URL?.startsWith("https://")
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";

  // Check for the token to determine if the user is authenticated
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName,
    secureCookie: process.env.NEXTAUTH_URL?.startsWith("https://") ?? false,
    raw: true,
  });

  // Check if the request is part of the logout flow
  const isLoggingOut = searchParams.get("loggingOut") === "true";
  const isPlaySubpage = pathname.startsWith("/Play");

  // Handle the case where the user is logging out
  if (isLoggingOut) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect to root with error=auth if unauthenticated and accessing /Play subpage
  if (!token && isPlaySubpage) {
    url.pathname = "/";
    if (!url.searchParams.has("error")) {
      url.searchParams.set("error", "auth");
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Play/:path*"],
};
