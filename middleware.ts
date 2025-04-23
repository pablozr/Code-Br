import { NextRequest, NextResponse } from 'next/server';

// Supported languages
export const locales = ['pt-BR', 'en', 'fr'];
export const defaultLocale = 'pt-BR';

// Get the preferred locale from request headers
function getLocale(request: NextRequest) {
  // Check if there is a cookie with the locale
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Check the accept-language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const parsedLocales = acceptLanguage.split(',').map(l => l.split(';')[0].trim());
    
    // Check for exact matches first
    for (const locale of parsedLocales) {
      if (locales.includes(locale)) {
        return locale;
      }
    }
    
    // Check for partial matches (e.g., 'en-US' should match 'en')
    for (const locale of parsedLocales) {
      const languageCode = locale.split('-')[0];
      const matchedLocale = locales.find(l => l.startsWith(languageCode));
      if (matchedLocale) {
        return matchedLocale;
      }
    }
  }

  // Default to pt-BR if no match
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  // Copy the search params
  request.nextUrl.searchParams.forEach((value, key) => {
    newUrl.searchParams.set(key, value);
  });

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_vercel).*)',
  ],
};
