import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/Play"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Attempt to fetch the token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log(`Path: ${pathname}, Token: ${token ? "Exists" : "Not Found"}`);

  if (protectedRoutes.includes(pathname)) {
    if (!token) {
      console.log("No token found. Redirecting to /.");
      const url = req.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("error", "auth");
      return NextResponse.redirect(url);
    }
  }

  // If token exists or accessing unprotected route, proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/Play"],
};
