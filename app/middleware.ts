import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirecionar rotas antigas para novas
  if (pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname === '/dashboard/contact') {
    return NextResponse.redirect(new URL('/contact', request.url));
  }

  if (pathname === '/dashboard/orcamento') {
    return NextResponse.redirect(new URL('/orcamento', request.url));
  }

  if (pathname === '/api/orcamento') {
    return NextResponse.rewrite(new URL('/api/orcamento', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/api/orcamento',
  ],
};
