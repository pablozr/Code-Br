'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Preload de recursos críticos (versão simplificada)
export function ResourcePreloader() {
  const pathname = usePathname();

  useEffect(() => {
    // DNS prefetch para domínios externos
    const dnsPrefetch = (domain: string) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    };

    // Preconnect para recursos críticos
    const preconnect = (domain: string) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    // Executar preloads baseado na rota
    if (pathname === '/' || pathname?.startsWith('/pt-BR') || pathname?.startsWith('/en') || pathname?.startsWith('/fr')) {
      // DNS prefetch para serviços externos
      dnsPrefetch('//fonts.googleapis.com');
      dnsPrefetch('//fonts.gstatic.com');

      // Preconnect para recursos críticos
      preconnect('https://fonts.googleapis.com');
      preconnect('https://fonts.gstatic.com');
    }

    // Preload de imagens críticas com tratamento de erro
    const preloadCriticalImages = () => {
      const criticalImages = [
        '/images/hero-bg.webp',
        '/images/services-bg.webp',
      ];

      criticalImages.forEach(src => {
        // Verificar se a imagem existe antes de fazer preload
        const img = new Image();
        img.onload = () => {
          // Imagem carregou com sucesso, fazer prefetch
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = src;
          document.head.appendChild(link);
        };
        img.onerror = () => {
          // Imagem não existe ou falhou ao carregar, ignorar silenciosamente
          console.warn(`Imagem crítica não encontrada: ${src}`);
        };
        img.src = src;
      });
    };

    // Executar preload de imagens após um pequeno delay
    const timer = setTimeout(preloadCriticalImages, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null; // Este componente não renderiza nada
}

// Hook para preload manual de recursos (simplificado)
export const useResourcePreloader = () => {
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined') {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = src;
        document.head.appendChild(link);
        resolve();
      } else {
        resolve();
      }
    });
  };

  const preloadFont = (fontFamily: string, fontWeight: string = '400') => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = `/fonts/${fontFamily}-${fontWeight}.woff2`;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  };

  return {
    preloadImage,
    preloadFont,
  };
};
