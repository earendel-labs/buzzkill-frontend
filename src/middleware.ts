import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname, searchParams } = req.nextUrl;

  if (pathname.startsWith("/api/auth")) {
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

  const isLoggingOut = searchParams.get("loggingOut") === "true";
  const isPlaySubpage = pathname.startsWith("/Play");

  if (isLoggingOut) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && isPlaySubpage) {
    url.pathname = "/";
    if (!url.searchParams.has("error")) {
      url.searchParams.set("error", "auth");
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
