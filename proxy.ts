import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Redirect unauthenticated users away from dashboard
  if (pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect logged-in users away from login page
  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
