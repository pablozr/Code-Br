'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

const defaultLanguage = 'pt-BR';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar imediatamente
    router.replace(`/${defaultLanguage}`);
  }, [router]);

  return (
    <>
      {/* Meta refresh como fallback para redirecionamento instantâneo */}
      <Head>
        <meta httpEquiv="refresh" content={`0;url=/${defaultLanguage}`} />
      </Head>

      {/* Loader de carregamento que parece parte do site */}
      <div className="page-loader">
        <div className="spinner"></div>
      </div>
    </>
  );
}
