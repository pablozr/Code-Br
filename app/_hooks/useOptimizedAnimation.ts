'use client';

import { useState, useEffect, useRef } from 'react';

interface UseOptimizedAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook otimizado para animações que só são ativadas quando o elemento está visível
 * Reduz o Total Blocking Time carregando animações apenas quando necessário
 */
export function useOptimizedAnimation({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true
}: UseOptimizedAnimationOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Não executar no servidor
    if (typeof window === 'undefined') return;

    const currentRef = ref.current;
    if (!currentRef) return;

    // Usar requestIdleCallback para adiar a criação do observer até que o navegador esteja ocioso
    const idleId = window.requestIdleCallback(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            if (triggerOnce) {
              setHasAnimated(true);
              observer.unobserve(currentRef);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(currentRef);

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, { timeout: 2000 }); // Timeout de 2 segundos para garantir que o observer seja criado

    return () => {
      window.cancelIdleCallback(idleId);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible: triggerOnce ? isVisible || hasAnimated : isVisible };
}

// Polyfill para requestIdleCallback
if (typeof window !== 'undefined' && !('requestIdleCallback' in window)) {
  (window as any).requestIdleCallback = (callback: any, options?: any) => {
    const start = Date.now();
    return window.setTimeout(() => {
      callback({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
      });
    }, options?.timeout || 1);
  };

  (window as any).cancelIdleCallback = (id: number) => {
    clearTimeout(id);
  };
}
