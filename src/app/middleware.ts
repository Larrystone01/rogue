import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname.startsWith("/cart");
  const isAuthRoute = pathname === "/sign-in" || pathname === "/sign-up";

  // Protect dashboard
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Prevent logged-in users from accessing login/signup
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/cart", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*", "/sign-in", "/sig-nup"],
};
