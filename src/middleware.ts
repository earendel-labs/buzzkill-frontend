import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname, searchParams } = req.nextUrl;
  console.log("Middleware triggered", { pathname, searchParams });

  if (pathname.startsWith("/api/auth")) {
    console.log("Skipping /api/auth routes");
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: process.env.NEXTAUTH_URL?.startsWith("https://")
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token",
    secureCookie: process.env.NEXTAUTH_URL?.startsWith("https://") ?? false,
    raw: true,
  });

  console.log("Token found:", token);

  const isLoggingOut = searchParams.get("loggingOut") === "true";
  const isPlaySubpage = pathname.startsWith("/Play");

  if (isLoggingOut) {
    console.log("User is logging out, redirecting to /");
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && isPlaySubpage) {
    console.log("Redirecting to / due to missing token");
    url.pathname = "/";
    if (!url.searchParams.has("error")) {
      url.searchParams.set("error", "auth");
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
