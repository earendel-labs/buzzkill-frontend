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

  // Check for the token to determine if the user is authenticated
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "next-auth.session-token",
    secureCookie: process.env.NEXTAUTH_URL?.startsWith("https://") ?? false,
    raw: true,
  });

  // If loggedOut is present, bypass error redirect
  const isLoggedOut = searchParams.get("loggedOut") === "true";

  // Redirect to root with error=auth if unauthenticated and not logging out
  if (!token && !isLoggedOut) {
    url.pathname = "/";
    if (!url.searchParams.has("error")) {
      url.searchParams.set("error", "auth");
    }
    return NextResponse.redirect(url);
  }

  // Remove the loggedOut parameter to clean up URL
  if (isLoggedOut) {
    url.searchParams.delete("loggedOut");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Play/:path*"],
};
