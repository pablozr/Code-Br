'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { Box, Skeleton } from '@mantine/core';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallback?: React.ReactNode;
  aspectRatio?: number;
  blur?: boolean;
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
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(!priority);
  const [error, setError] = useState(false);

  // Calcular altura baseada no aspect ratio se fornecido
  const calculatedHeight = aspectRatio && width && !height
    ? typeof width === 'number' ? Math.round(width / aspectRatio) : undefined
    : height;

  // Determinar o placeholder blur
  const blurDataURL = blur
    ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHXG8H/QAAAABJRU5ErkJggg=='
    : undefined;

  // Resetar estado de erro se a src mudar
  useEffect(() => {
    setError(false);
  }, [src]);

  if (error && fallback) {
    return <>{fallback}</>;
  }

  return (
    <Box style={{ position: 'relative', overflow: 'hidden' }}>
      {isLoading && (
        <Skeleton
          height={calculatedHeight || height || '100%'}
          width={width || '100%'}
          animate={true}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        />
      )}
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
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          ...props.style,
        }}
        {...props}
      />
    </Box>
  );
}
