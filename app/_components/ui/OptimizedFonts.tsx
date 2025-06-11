'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function OptimizedFonts() {
  const pathname = usePathname();

  useEffect(() => {
    // Função para carregar fontes sob demanda
    const loadFonts = async () => {
      // Carregar apenas as fontes necessárias para a página atual
      if (pathname === '/' || pathname?.startsWith('/pt-BR') || pathname?.startsWith('/en') || pathname?.startsWith('/fr')) {
        // Pré-carregar fontes para a página inicial
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = '/fonts/manrope-var.woff2';
        fontLink.as = 'font';
        fontLink.type = 'font/woff2';
        fontLink.crossOrigin = 'anonymous';
        document.head.appendChild(fontLink);
      }
    };

    loadFonts();
  }, [pathname]);

  return null;
}
