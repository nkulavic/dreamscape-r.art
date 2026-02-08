import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Protect /admin routes (except /admin/login) and /api/admin routes
  const isAdminUI = request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login");
  const isAdminAPI = request.nextUrl.pathname.startsWith("/api/admin");

  if (isAdminUI || isAdminAPI) {
    // Check for Better Auth session cookie (prefixed with __Secure- on HTTPS)
    const sessionCookie =
      request.cookies.get("__Secure-better-auth.session_token") ||
      request.cookies.get("better-auth.session_token");

    if (!sessionCookie) {
      // For API routes, return 401 instead of redirecting
      if (isAdminAPI) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // For UI routes, redirect to login
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
