'use client';

import { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { Box, Skeleton } from '@mantine/core';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallback?: React.ReactNode;
  aspectRatio?: number;
  blur?: boolean;
  lazyLoad?: boolean;
  preloadOnHover?: boolean;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fallback,
  aspectRatio,
  blur = true,
  priority = false,
  lazyLoad = true,
  preloadOnHover = false,
  quality = 85,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(!priority);
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(priority || !lazyLoad);
  const imgRef = useRef<HTMLDivElement>(null);

  // Calcular altura baseada no aspect ratio se fornecido
  const calculatedHeight = aspectRatio && width && !height
    ? typeof width === 'number' ? Math.round(width / aspectRatio) : undefined
    : height;

  // Determinar o placeholder blur
  const blurDataURL = blur
    ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHXG8H/QAAAABJRU5ErkJggg=='
    : undefined;

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (!lazyLoad || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazyLoad, isInView]);

  // Preload on hover
  useEffect(() => {
    if (!preloadOnHover || !imgRef.current) return;

    const handleMouseEnter = () => {
      if (!isInView) {
        setIsInView(true);
      }
    };

    const element = imgRef.current;
    element.addEventListener('mouseenter', handleMouseEnter, { once: true });

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [preloadOnHover, isInView]);

  // Resetar estado de erro se a src mudar
  useEffect(() => {
    setError(false);
    setIsLoading(true);
  }, [src]);

  if (error && fallback) {
    return <>{fallback}</>;
  }

  return (
    <Box ref={imgRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {isLoading && isInView && (
        <Skeleton
          height={calculatedHeight || height || '100%'}
          width={width || '100%'}
          animate={true}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        />
      )}

      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={calculatedHeight || height}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
          placeholder={blur ? 'blur' : undefined}
          blurDataURL={blurDataURL}
          priority={priority}
          quality={quality}
          sizes={props.sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            ...props.style,
          }}
          {...props}
        />
      )}

      {/* Placeholder quando não está em view */}
      {!isInView && (
        <Box
          style={{
            width: width || '100%',
            height: calculatedHeight || height || '200px',
            backgroundColor: 'rgba(25, 25, 25, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      )}
    </Box>
  );
}

// Componente otimizado para hero images
export function HeroImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      priority={true}
      lazyLoad={false}
      quality={90}
      sizes="100vw"
    />
  );
}

// Hook para preload de imagens
export const useImagePreloader = () => {
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && typeof Image !== 'undefined') {
        const img = document.createElement('img') as HTMLImageElement;
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
      } else {
        resolve();
      }
    });
  };

  return { preloadImage };
};
