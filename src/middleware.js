

import { NextResponse } from "next/server";

export function middleware(request) {
  // Accessing the "token" cookie directly from the request
  const token = request.cookies.get("token");
  // const token = sessionStorage.getItem("token");


  // Redirect logged-in users away from login and home to the dashboard
  if (
    token &&
    (request.nextUrl.pathname.startsWith("/auth") ||
      request.nextUrl.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/main/dashboard", request.url));
  }

  // Handle access to /main/terms-conditions independently of token
  if (request.nextUrl.pathname.startsWith("/terms-conditions")) {
    return NextResponse.next(); // Allow access regardless of token
  }

  // Redirect users without a token to the home page if trying to access other /main paths
  if (!token && request.nextUrl.pathname.startsWith("/main")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Proceed normally if none of the above conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
