import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl.clone();

  // Redirect to / if the user is logged out and trying to access a protected route
  if (!token && req.nextUrl.pathname.startsWith("/Play")) {
    console.log("No token found. Redirecting to /.");
    url.pathname = "/";
    url.searchParams.set("error", "auth");
    return NextResponse.redirect(url);
  }

  // Allow access to other routes if token is valid or if it’s not a protected route
  return NextResponse.next();
}

export const config = {
  matcher: ["/Play/:path*"], // Protect all /Play subpaths
};
