import { NextRequest, NextResponse } from 'next/server';
import { LRUCache } from 'lru-cache';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

/**
 * Implementação de rate limiting para proteger as APIs
 * Limita o número de requisições por IP em um determinado intervalo de tempo
 */
export default function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (req: NextRequest, limit: number, token: string) =>
      new Promise<NextResponse | null>((resolve, reject) => {
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous';
        const tokenKey = `${token}:${ip}`;
        const tokenCount = (tokenCache.get(tokenKey) as number[]) || [0];
        
        if (tokenCount[0] === 0) {
          tokenCache.set(tokenKey, [1]);
          resolve(null);
        } else {
          tokenCount[0] += 1;
          
          const currentUsage = tokenCount[0];
          const isRateLimited = currentUsage >= limit;
          
          tokenCache.set(tokenKey, tokenCount);
          
          if (isRateLimited) {
            resolve(
              NextResponse.json(
                { error: 'Too Many Requests', message: 'Rate limit exceeded' },
                { status: 429 }
              )
            );
          } else {
            resolve(null);
          }
        }
      }),
  };
}
