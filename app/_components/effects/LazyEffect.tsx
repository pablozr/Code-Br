'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Box, Skeleton } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';

interface LazyEffectProps {
  children: ReactNode;
  height?: number | string;
  width?: number | string;
  threshold?: number;
  placeholder?: ReactNode;
  rootMargin?: string;
  skipIntersection?: boolean;
}

export function LazyEffect({
  children,
  height = 400,
  width = '100%',
  threshold = 0.1,
  placeholder,
  rootMargin = '200px',
  skipIntersection = false,
}: LazyEffectProps) {
  const [loaded, setLoaded] = useState(false);
  const { ref, entry } = useIntersection({
    threshold,
    rootMargin,
  });

  useEffect(() => {
    if (skipIntersection || (entry?.isIntersecting && !loaded)) {
      // Usar um pequeno atraso para evitar jank na renderização
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [entry, loaded, skipIntersection]);

  return (
    <Box ref={ref} style={{ height, width, position: 'relative' }}>
      {!loaded && (
        placeholder || (
          <Skeleton
            height={height}
            width={width}
            animate={true}
          />
        )
      )}
      
      {loaded && children}
    </Box>
  );
}
