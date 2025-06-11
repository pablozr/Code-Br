'use client';

import { useEffect, useState } from 'react';
import { fetchCsrfToken, addCsrfHeader } from '@/app/_lib/csrf';

/**
 * Componente para gerar e gerenciar tokens CSRF
 * Adiciona o token CSRF ao cabeçalho de todas as requisições fetch
 */
export function CsrfProvider({ children }: { children: React.ReactNode }) {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    // Obter um token CSRF do servidor
    const getToken = async () => {
      const token = await fetchCsrfToken();
      if (token) {
        setCsrfToken(token);

        // Interceptar todas as requisições fetch para adicionar o token CSRF
        const originalFetch = window.fetch;
        window.fetch = async (input, init) => {
          const newInit = { ...init };

          // Adicionar o token CSRF ao cabeçalho
          newInit.headers = addCsrfHeader(newInit.headers, token);

          // Chamar o fetch original
          return originalFetch(input, newInit);
        };

        return () => {
          window.fetch = originalFetch;
        };
      }
    };

    const cleanup = getToken();

    // Limpar o interceptor quando o componente for desmontado
    return () => {
      cleanup.then(cleanupFn => cleanupFn && cleanupFn());
    };
  }, []);

  return <>{children}</>;
}

/**
 * Componente para adicionar um campo hidden com o token CSRF em formulários
 */
export function CsrfToken() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    // Obter um token CSRF do servidor
    const getToken = async () => {
      const token = await fetchCsrfToken();
      setCsrfToken(token);
    };

    getToken();
  }, []);

  if (!csrfToken) {
    return null;
  }

  return <input type="hidden" name="csrf-token" value={csrfToken} />;
}
