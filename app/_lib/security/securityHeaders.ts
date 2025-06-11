import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Adiciona cabeçalhos de segurança à resposta
 * @param request A requisição Next.js
 * @param response A resposta Next.js
 * @returns A resposta com os cabeçalhos de segurança adicionados
 */
export function addSecurityHeaders(
  request: NextRequest,
  response: NextResponse
): NextResponse {
  // Definir política de segurança de conteúdo (CSP)
  const cspHeader = constructCSPHeader();
  
  // Adicionar cabeçalhos de segurança
  const headers = new Headers(response.headers);
  
  // Content-Security-Policy
  headers.set('Content-Security-Policy', cspHeader);
  
  // Strict-Transport-Security
  headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  
  // X-Content-Type-Options
  headers.set('X-Content-Type-Options', 'nosniff');
  
  // X-Frame-Options
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  
  // X-XSS-Protection
  headers.set('X-XSS-Protection', '1; mode=block');
  
  // Referrer-Policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions-Policy
  headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  
  // Cache-Control para recursos estáticos
  const url = request.nextUrl.pathname;
  if (
    url.startsWith('/_next/') ||
    url.includes('/images/') ||
    url.includes('/fonts/') ||
    url.endsWith('.ico') ||
    url.endsWith('.svg') ||
    url.endsWith('.png') ||
    url.endsWith('.jpg') ||
    url.endsWith('.jpeg') ||
    url.endsWith('.gif') ||
    url.endsWith('.webp') ||
    url.endsWith('.woff') ||
    url.endsWith('.woff2')
  ) {
    headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  } else if (url === '/') {
    // Cache mais curto para a página inicial
    headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=60, stale-while-revalidate=3600'
    );
  } else {
    // Cache padrão para outras páginas
    headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=60, stale-while-revalidate=3600'
    );
  }
  
  // Criar nova resposta com os cabeçalhos adicionados
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
    headers,
  });
}

/**
 * Constrói o cabeçalho Content-Security-Policy
 * @returns O valor do cabeçalho CSP
 */
function constructCSPHeader(): string {
  // Domínios confiáveis
  const trustedDomains = [
    "'self'",
    "*.codebr.com",
    "codebr.com",
    "*.vercel.app",
    "vercel.app",
  ];
  
  // Domínios de fontes confiáveis
  const fontSources = [
    "'self'",
    "fonts.googleapis.com",
    "fonts.gstatic.com",
  ];
  
  // Domínios de imagens confiáveis
  const imageSources = [
    "'self'",
    "data:",
    "blob:",
    "*.codebr.com",
    "codebr.com",
    "images.unsplash.com",
  ];
  
  // Domínios de scripts confiáveis
  const scriptSources = [
    "'self'",
    "'unsafe-inline'", // Necessário para alguns frameworks
    "'unsafe-eval'", // Necessário para alguns frameworks
    "*.codebr.com",
    "codebr.com",
  ];
  
  // Domínios de estilos confiáveis
  const styleSources = [
    "'self'",
    "'unsafe-inline'", // Necessário para alguns frameworks
    "*.codebr.com",
    "codebr.com",
    "fonts.googleapis.com",
  ];
  
  // Domínios de conexão confiáveis
  const connectSources = [
    "'self'",
    "*.codebr.com",
    "codebr.com",
    "*.vercel.app",
    "vercel.app",
  ];
  
  // Construir o cabeçalho CSP
  return [
    `default-src ${trustedDomains.join(' ')}`,
    `font-src ${fontSources.join(' ')}`,
    `img-src ${imageSources.join(' ')}`,
    `script-src ${scriptSources.join(' ')}`,
    `style-src ${styleSources.join(' ')}`,
    `connect-src ${connectSources.join(' ')}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "block-all-mixed-content",
    "upgrade-insecure-requests",
  ].join('; ');
}
