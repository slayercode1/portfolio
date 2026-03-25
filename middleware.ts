import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

const LOGIN_PAGE = "/ctrl-9f3k2x"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = getSessionCookie(request)

  // Login page: redirect to dashboard if already authenticated
  if (pathname === LOGIN_PAGE) {
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/ctrl-9f3k2x/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // Protected pages: redirect to login if not authenticated
  if (!sessionCookie) {
    return NextResponse.redirect(new URL(LOGIN_PAGE, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/ctrl-9f3k2x/:path*"],
}
