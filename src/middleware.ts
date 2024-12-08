import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n } from "./i18n.config"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

// Get the preferred locale
function getLocale(request: NextRequest) {
  const headers: Record<string, any> = {}
  request.headers.forEach((value, key) => (headers[key] = value))
  const languages = new Negotiator({ headers }).languages()
  const locales = i18n.locales
  const defaultLocale = i18n.defaultLocale

  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameLocale = i18n.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameLocale) {
    const response = NextResponse.next()
    response.cookies.set("locale", pathnameLocale)
    return response
  }

  // Redirect if there is no locale
  const locale = getLocale(request)

  request.nextUrl.pathname = `/${locale}${pathname}`

  if (pathname == "/") {
    const response = NextResponse.rewrite(request.nextUrl)
    response.cookies.set("locale", i18n.defaultLocale)
    return response
  }
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico|logo*|images|public/|js).*)",
  ],
}
