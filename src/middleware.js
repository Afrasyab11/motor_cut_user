import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
export function middleware(request) {
    // Accessing the "token" cookie directly from the request
    const token = request.cookies.get("token");
    console.log("Token:", token);
    if (token && (request.nextUrl.pathname.startsWith("/auth")|| request.nextUrl.pathname=="/")) {
        return NextResponse.redirect(new URL("/main/dashboard", request.url));
    }
    // Redirect if no token is found
    if (!token && (request.nextUrl.pathname.startsWith("/main"))) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    // Proceed if token exists
    return NextResponse.next();
}




export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}