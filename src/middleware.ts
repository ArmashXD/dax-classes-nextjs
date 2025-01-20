import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname; // profile/:id --> authenticated
  const token = request.cookies.get("token");

  const isTokenValid = token && token?.value !== "undefined";

  const guestRoutes = ["/login", "/register", "/"];

  if (guestRoutes.includes(url)) {
    if (isTokenValid) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!isTokenValid) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/profile/:id"],
};
