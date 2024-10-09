import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Force parameters for getToken based on your setup
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "next-auth.session-token", // Ensure this matches the cookie name
    secureCookie: process.env.NEXTAUTH_URL?.startsWith("https://") ?? false, // Adjust based on environment
    raw: true, // If you want the decoded payload
  });

  if (!token) {
    console.log("No valid token found. Redirecting to / with auth error.");
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("error", "auth");
    return NextResponse.redirect(url);
  }

  // If a token exists, allow the request to proceed
  console.log("Token is valid:", token);
  return NextResponse.next();
}

export const config = {
  matcher: ["/Play/:path*"], // Protect all /Play subpaths
};
