'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      // Registrar service worker após o carregamento da página
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });

          console.log('Service Worker registered successfully:', registration);

          // Verificar atualizações
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Nova versão disponível
                  console.log('Nova versão do site disponível');
                  
                  // Opcional: mostrar notificação para o usuário
                  if (window.confirm('Nova versão disponível. Recarregar página?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });

          // Escutar mensagens do service worker
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'CACHE_UPDATED') {
              console.log('Cache atualizado:', event.data.url);
            }
          });

          // Cleanup de cache antigo periodicamente
          setInterval(() => {
            if (registration.active) {
              registration.active.postMessage({ type: 'CACHE_CLEANUP' });
            }
          }, 24 * 60 * 60 * 1000); // 24 horas

        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      });

      // Preload de recursos críticos
      const preloadCriticalResources = () => {
        const criticalResources = [
          '/_next/static/css/',
          '/_next/static/chunks/',
          '/fonts/',
        ];

        criticalResources.forEach(resource => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = resource;
          document.head.appendChild(link);
        });
      };

      // Executar preload após um pequeno delay
      setTimeout(preloadCriticalResources, 2000);
    }
  }, []);

  return null; // Este componente não renderiza nada
}

// Hook para controle manual do service worker
export const useServiceWorker = () => {
  const updateServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.update();
      }
    }
  };

  const unregisterServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.unregister();
      }
    }
  };

  const clearCache = async () => {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
    }
  };

  return {
    updateServiceWorker,
    unregisterServiceWorker,
    clearCache,
  };
};
