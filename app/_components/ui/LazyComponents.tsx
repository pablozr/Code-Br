'use client';

import { lazy, Suspense } from 'react';
import { Box, Loader, Center } from '@mantine/core';

// Componente de loading otimizado
const OptimizedLoader = () => (
  <Center h={200}>
    <Loader 
      size="md" 
      color="rgba(153, 105, 229, 0.8)" 
      style={{ 
        filter: 'drop-shadow(0 0 8px rgba(153, 105, 229, 0.3))' 
      }} 
    />
  </Center>
);

// Lazy loading dos componentes pesados
export const LazyPriceCalculator = lazy(() => 
  import('./form/PriceCalculator').then(module => ({ 
    default: module.PriceCalculator 
  }))
);

export const LazyCompleteQuoteForm = lazy(() => 
  import('./form/CompleteQuoteForm').then(module => ({ 
    default: module.CompleteQuoteForm 
  }))
);

export const LazyContactForm = lazy(() => 
  import('./form/ContactForm').then(module => ({ 
    default: module.ContactForm 
  }))
);

export const LazyServicesSection = lazy(() => 
  import('../sections/ServicesSection').then(module => ({ 
    default: module.ServicesSection 
  }))
);

// HOC para wrapper com Suspense
export function withLazyLoading<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: React.ReactNode
) {
  return function LazyWrapper(props: T) {
    return (
      <Suspense fallback={fallback || <OptimizedLoader />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

// Componentes exportados com Suspense
export const PriceCalculatorLazy = withLazyLoading(LazyPriceCalculator);
export const CompleteQuoteFormLazy = withLazyLoading(LazyCompleteQuoteForm);
export const ContactFormLazy = withLazyLoading(LazyContactForm);
export const ServicesSectionLazy = withLazyLoading(LazyServicesSection);

// Hook para preload de componentes
export const usePreloadComponents = () => {
  const preloadPriceCalculator = () => import('./form/PriceCalculator');
  const preloadCompleteQuoteForm = () => import('./form/CompleteQuoteForm');
  const preloadContactForm = () => import('./form/ContactForm');
  const preloadServicesSection = () => import('../sections/ServicesSection');

  return {
    preloadPriceCalculator,
    preloadCompleteQuoteForm,
    preloadContactForm,
    preloadServicesSection,
  };
};
