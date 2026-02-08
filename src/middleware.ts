import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Only protect /admin routes (except /admin/login)
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login")
  ) {
    // Check for Better Auth session cookie
    const sessionCookie = request.cookies.get("better-auth.session_token");

    if (!sessionCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
