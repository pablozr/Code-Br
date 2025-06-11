export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

/**
 * Endpoint para gerar um token CSRF
 * Esta implementação usa o padrão de "double submit cookie"
 * - Um cookie HttpOnly para segurança
 * - O mesmo valor retornado ao cliente para uso em cabeçalhos
 */
export async function GET() {
  try {
    // Gerar um novo token CSRF
    const token = nanoid(32);

    // Criar a resposta
    const response = NextResponse.json({ token });

    // Definir o cookie na resposta com await
    await response.cookies.set('csrf-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Permite que o cookie seja enviado em navegações de nível superior
      path: '/',
      maxAge: 60 * 60, // 1 hora
    });

    return response;
  } catch (error) {
    console.error('Erro ao gerar token CSRF:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar token CSRF' },
      { status: 500 }
    );
  }
} 