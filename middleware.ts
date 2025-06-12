import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { csrfProtection } from '@/app/_lib/csrf-server';
import { addSecurityHeaders } from '@/app/_lib/security/securityHeaders';

// Supported languages
export const locales = ['pt-BR', 'en', 'fr'];
export const defaultLocale = 'pt-BR';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});



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
      return NextResponse.next();
    }

    // Verificar CSRF - agora sem await
    const csrfResult = csrfProtection(request);
    if (csrfResult) {
      return csrfResult;
    }
    // Se não houver erro de CSRF, continuar com o processamento normal
    return NextResponse.next();
  }

  // Use next-intl middleware for internationalization
  const response = intlMiddleware(request);

  // Add security headers to the response
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
