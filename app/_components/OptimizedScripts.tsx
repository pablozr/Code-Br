'use client';

import { useEffect } from 'react';
import Script from 'next/script';

/**
 * Componente para otimizar o carregamento de scripts e reduzir o Total Blocking Time
 */
export function OptimizedScripts() {
  useEffect(() => {
    // Função para carregar scripts não críticos após a página estar carregada
    const loadNonCriticalScripts = () => {
      // Aqui você pode adicionar qualquer script não crítico que precise ser carregado
      // após a renderização inicial da página
    };

    // Usar requestIdleCallback para carregar scripts quando o navegador estiver ocioso
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadNonCriticalScripts, { timeout: 2000 });
    } else {
      // Fallback para navegadores que não suportam requestIdleCallback
      setTimeout(loadNonCriticalScripts, 2000);
    }

    // Adicionar atributos de performance para imagens
    const addImagePerformanceAttributes = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      });
    };

    // Executar otimizações de imagem quando o navegador estiver ocioso
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(addImagePerformanceAttributes, { timeout: 1000 });
    } else {
      setTimeout(addImagePerformanceAttributes, 1000);
    }

    return () => {
      // Limpar qualquer listener ou timeout se necessário
    };
  }, []);

  return (
    <>
      {/* Scripts críticos que precisam ser carregados com prioridade */}
      <Script
        id="performance-metrics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Monitorar métricas de performance
            if ('PerformanceObserver' in window) {
              try {
                // Monitorar Largest Contentful Paint (LCP)
                const lcpObserver = new PerformanceObserver((entryList) => {
                  const entries = entryList.getEntries();
                  const lastEntry = entries[entries.length - 1];
                  console.log('LCP:', lastEntry.startTime);
                });
                lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

                // Monitorar First Input Delay (FID)
                const fidObserver = new PerformanceObserver((entryList) => {
                  const entries = entryList.getEntries();
                  const firstInput = entries[0];
                  console.log('FID:', firstInput.processingStart - firstInput.startTime);
                });
                fidObserver.observe({ type: 'first-input', buffered: true });

                // Monitorar Cumulative Layout Shift (CLS)
                let clsValue = 0;
                let clsEntries = [];
                const clsObserver = new PerformanceObserver((entryList) => {
                  const entries = entryList.getEntries();
                  entries.forEach(entry => {
                    // Apenas considerar se não foi causado por interação do usuário
                    if (!entry.hadRecentInput) {
                      clsValue += entry.value;
                      clsEntries.push(entry);
                    }
                  });
                  console.log('CLS:', clsValue);
                });
                clsObserver.observe({ type: 'layout-shift', buffered: true });
              } catch (e) {
                console.error('Error monitoring performance metrics:', e);
              }
            }
          `,
        }}
      />
    </>
  );
}
