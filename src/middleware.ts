import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Attempt to fetch the token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Log the token status
  console.log(`Token: ${token ? "Exists" : "Not Found"}`);

  // If no token is found, redirect to the homepage
  if (!token) {
    console.log("No token found. Redirecting to /.");
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("error", "auth");
    return NextResponse.redirect(url);
  }

  // If the token exists, proceed to the requested page
  return NextResponse.next();
}

// Match any path that starts with /Play, including subpaths
export const config = {
  matcher: ["/Play/:path*"], // Ensures it matches all subpaths under /Play
};
