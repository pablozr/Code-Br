import { NextRequest, NextResponse } from 'next/server';

/**
 * Verifica se o token CSRF é válido
 * @param request A requisição Next.js
 * @returns true se o token for válido, false caso contrário
 */
export function validateCsrfToken(request: NextRequest): boolean {
  const cookieToken = request.cookies.get('csrf-token')?.value;
  const headerToken = request.headers.get('x-csrf-token');

  if (!cookieToken || !headerToken) {
    return false;
  }

  return cookieToken === headerToken;
}

/**
 * Middleware para proteção CSRF
 * @param request A requisição Next.js
 * @returns A resposta Next.js ou undefined para continuar a cadeia de middleware
 */
export function csrfProtection(request: NextRequest): NextResponse | undefined {
  // Verificar apenas requisições POST, PUT, DELETE
  if (['POST', 'PUT', 'DELETE'].includes(request.method)) {
    const isValid = validateCsrfToken(request);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }
  }

  return undefined;
}
