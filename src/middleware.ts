import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n.config';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { CityIds } from './types/Shared';
import { cities } from './data';

// Get the preferred locale
function getLocale(request: NextRequest) {
  const headers: Record<string, string | string[] | undefined> = {};
  request.headers.forEach((value, key) => (headers[key] = value));
  const languages = new Negotiator({ headers }).languages();
  const locales = i18n.locales;
  const defaultLocale = i18n.defaultLocale;

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameLocale = i18n.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  const pathnameCity = cities.find(
    (item) => item.key === pathname.split('/')[2]
  )?.key;
  const city =
    pathnameCity ??
    request.cookies.get('city')?.value ??
    CityIds[CityIds.ABU_DHABI];
  const locale = pathnameLocale || getLocale(request);

  // if (pathnameLocale) {
  //   const response = NextResponse.next();
  //   response.cookies.set('locale', pathnameLocale);
  //   return response;
  // }

  if (!pathnameLocale) {
    // Redirect to include locale and city
    request.nextUrl.pathname = `/${locale}/${city}${pathname}`;
    const response = NextResponse.redirect(request.nextUrl);
    response.cookies.set('locale', locale);
    response.cookies.set('city', city);
    return response;
  }

  if (!pathname.includes(`/${city}`)) {
    // Redirect to include city in the path if missing
    request.nextUrl.pathname = `/${locale}/${city}${pathname.replace(
      `/${locale}`,
      ''
    )}`;
    const response = NextResponse.redirect(request.nextUrl);
    response.cookies.set('locale', locale);
    response.cookies.set('city', city);
    return response;
  }
  // Redirect if there is no locale

  const response = NextResponse.next();
  response.cookies.set('locale', locale);
  response.cookies.set('city', city);
  return response;
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|logo*|iconpsi*|visiticon*|images|icons|public/|js).*)',
  ],
};
