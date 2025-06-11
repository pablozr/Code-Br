/**
 * Funções de cliente para CSRF
 * Este arquivo contém apenas funções que podem ser usadas no lado do cliente
 */

/**
 * Obtém um token CSRF do servidor
 * @returns Uma Promise que resolve para o token CSRF
 */
export async function fetchCsrfToken(): Promise<string> {
  try {
    const response = await fetch('/api/csrf');
    if (!response.ok) {
      throw new Error('Falha ao obter token CSRF');
    }
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Erro ao obter token CSRF:', error);
    return '';
  }
}

/**
 * Adiciona um token CSRF aos cabeçalhos de uma requisição fetch
 * @param headers Os cabeçalhos da requisição
 * @param token O token CSRF
 * @returns Os cabeçalhos com o token CSRF adicionado
 */
export function addCsrfHeader(headers: HeadersInit = {}, token: string): HeadersInit {
  const newHeaders = new Headers(headers);
  newHeaders.append('X-CSRF-Token', token);
  return newHeaders;
}
