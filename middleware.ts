import { NextRequest, NextResponse } from 'next/server';
import { csrfProtection } from '@/app/_lib/csrf-server';
import { addSecurityHeaders } from '@/app/_lib/security/securityHeaders';

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

  // Skip middleware para arquivos estáticos e recursos que não precisam de processamento
  if (
    pathname.startsWith('/_next/static/') ||
    pathname.startsWith('/_next/image/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/sw.js') ||
    pathname.startsWith('/workbox-')
  ) {
    const response = NextResponse.next();
    // Cache headers para recursos estáticos
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return response;
  }

  // Aplicar proteção CSRF para rotas de API
  if (pathname.startsWith('/api/')) {
    // Pular a rota /api/csrf para evitar loop infinito
    if (pathname === '/api/csrf') {
      return;
    }

    // Verificar CSRF - agora sem await
    const csrfResult = csrfProtection(request);
    if (csrfResult) {
      return csrfResult;
    }
    // Se não houver erro de CSRF, continuar com o processamento normal
    return;
  }

  // Tratar a rota raiz de forma especial para evitar flash de erro
  if (pathname === '/') {
    // Usar rewrite em vez de redirect para evitar flash de erro
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}`, request.url);

    // Reescrever a URL para mostrar o conteúdo da página com o locale correto
    // sem mudar a URL no navegador
    const response = NextResponse.rewrite(newUrl);

    // Headers de performance para página inicial
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    response.headers.set('X-DNS-Prefetch-Control', 'on');

    return addSecurityHeaders(request, response);
  }

  // Ignorar outras rotas específicas que têm redirecionamento explícito
  if (pathname === '/contact' || pathname === '/orcamento') {
    // Apenas adicionar cabeçalhos de segurança sem redirecionar
    const response = NextResponse.next();
    // Headers específicos para páginas de formulário
    response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    response.headers.set('X-DNS-Prefetch-Control', 'on');
    return addSecurityHeaders(request, response);
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Adicionar cabeçalhos de segurança à resposta
    const response = NextResponse.next();

    // Headers de performance baseado na rota
    if (pathname.includes('/orcamento') || pathname.includes('/contact')) {
      response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    } else {
      response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    }

    response.headers.set('X-DNS-Prefetch-Control', 'on');
    return addSecurityHeaders(request, response);
  }

  // Redirect if there is no locale (para outras rotas que não têm redirecionamento explícito)
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);

  // Copy the search params
  request.nextUrl.searchParams.forEach((value, key) => {
    newUrl.searchParams.set(key, value);
  });

  // Redirecionar com cabeçalhos de segurança
  const response = NextResponse.redirect(newUrl);
  return addSecurityHeaders(request, response);
}

export const config = {
  matcher: [
    // Rota raiz com prioridade máxima
    '/',
    // Rotas de internacionalização (exceto rotas internas)
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|_vercel).*)',
    // Rotas de API para proteção CSRF
    '/api/:path*',
  ],
};
