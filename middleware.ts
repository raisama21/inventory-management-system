import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const session = request.cookies.get("auth_session");

    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        if (!session?.value) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (request.nextUrl.pathname.startsWith("/signup")) {
        if (session?.value) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    if (request.nextUrl.pathname.startsWith("/login")) {
        if (session?.value) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }
}
