import { usePathname } from 'next/navigation';

/**
 * Hook que retorna o pathname de forma segura, garantindo que não seja null
 */
export function useSafePathname(): string {
  const pathname = usePathname();
  return pathname || '/';
}

/**
 * Extrai o locale do pathname de forma segura
 */
export function getLocaleFromPathname(pathname: string | null): string {
  if (!pathname) return 'pt-BR';
  const segments = pathname.split('/');
  return segments[1] || 'pt-BR';
} 