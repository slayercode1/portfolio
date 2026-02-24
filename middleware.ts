import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Login page path is inlined here (Edge runtime can't import lib/constants)
  if (pathname.startsWith("/admin") && pathname !== "/admin/x9k2p7a") {
    const sessionCookie = getSessionCookie(request)

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/x9k2p7a", request.url))
    }

    // Cookie existence is a lightweight edge check only;
    // actual session validity is verified server-side via getSession()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
