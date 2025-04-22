import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import acceptLanguage from 'accept-language';

// Configurar os idiomas suportados
acceptLanguage.languages(['pt-BR', 'en', 'fr']);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

const cookieName = 'i18next';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar se a URL já tem um parâmetro de debug para evitar loops
  const url = request.nextUrl.clone();
  if (url.searchParams.has('__isMiddlewareReload')) {
    return NextResponse.next();
  }

  // Ignorar arquivos estáticos e API
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.webp')
  ) {
    return NextResponse.next();
  }

  // Redirecionar rotas antigas para novas com o idioma padrão
  if (pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/pt-BR', request.url));
  }

  if (pathname === '/dashboard/contact') {
    return NextResponse.redirect(new URL('/pt-BR/contact', request.url));
  }

  if (pathname === '/dashboard/orcamento') {
    return NextResponse.redirect(new URL('/pt-BR/orcamento', request.url));
  }

  if (pathname === '/api/orcamento') {
    return NextResponse.rewrite(new URL('/api/orcamento', request.url));
  }

  // Verificar se a rota é a raiz e redirecionar para o idioma padrão
  if (pathname === '/') {
    const response = NextResponse.redirect(new URL('/pt-BR', request.url));
    response.cookies.set(cookieName, 'pt-BR');
    return response;
  }

  // Verificar idioma
  let language;

  // 1. Verificar se o idioma está na URL
  const pathnameHasLocale = /^\/(pt-BR|en|fr)(\/|$)/.test(pathname);
  if (pathnameHasLocale) {
    const locale = pathname.split('/')[1];
    if (['pt-BR', 'en', 'fr'].includes(locale)) {
      language = locale;

      // Se o idioma já estiver na URL, apenas definir o cookie se necessário
      const response = NextResponse.next();
      const currentCookie = request.cookies.get(cookieName);

      if (!currentCookie || currentCookie.value !== language) {
        response.cookies.set(cookieName, language);
      }

      return response;
    }
  }

  // Se chegou aqui, o idioma não está na URL ou não é válido

  // 2. Verificar cookie
  language = request.cookies.get(cookieName)?.value;

  if (!language || !['pt-BR', 'en', 'fr'].includes(language)) {
    // 3. Verificar cabeçalho Accept-Language
    language = acceptLanguage.get(request.headers.get('Accept-Language'));
  }

  if (!language || !['pt-BR', 'en', 'fr'].includes(language)) {
    // 4. Usar idioma padrão
    language = 'pt-BR';
  }

  // Adicionar um parâmetro para evitar loops de redirecionamento
  url.searchParams.set('__isMiddlewareReload', '1');

  // Redirecionar para a URL com o idioma
  const redirectUrl = new URL(`/${language}${pathname === '/' ? '' : pathname}`, request.url);
  redirectUrl.search = url.searchParams.toString();

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(cookieName, language);

  return response;
}
