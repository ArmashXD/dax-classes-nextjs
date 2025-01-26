import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const token = request.cookies.get("token");

  const isTokenValid = token && token?.value !== "undefined";

  const guestRoutes = ["/login", "/register"];

  if (guestRoutes.includes(url) && isTokenValid) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isTokenValid && !guestRoutes.includes(url)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard", "/profile/:id"],
};
