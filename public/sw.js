// Service Worker para cache e performance
const CACHE_NAME = 'saas-starter-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Recursos para cache estático
const STATIC_ASSETS = [
  '/',
  '/pt-BR',
  '/manifest.json',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
];

// Recursos para cache dinâmico
const CACHE_STRATEGIES = {
  // Cache first para recursos estáticos
  static: [
    /\/_next\/static\//,
    /\/static\//,
    /\.(?:js|css|woff2?|png|jpg|jpeg|gif|svg|ico)$/,
  ],
  // Network first para páginas
  pages: [
    /\/pt-BR\//,
    /\/en\//,
    /\/fr\//,
  ],
  // Stale while revalidate para API
  api: [
    /\/api\//,
  ],
};

// Instalar service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Installed');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Ativar service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar requests não-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignorar requests de outros domínios
  if (url.origin !== location.origin) {
    return;
  }
  
  // Estratégia de cache baseada no tipo de recurso
  if (isStaticAsset(request.url)) {
    event.respondWith(cacheFirst(request));
  } else if (isPageRequest(request.url)) {
    event.respondWith(networkFirst(request));
  } else if (isApiRequest(request.url)) {
    event.respondWith(staleWhileRevalidate(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

// Verificar se é um recurso estático
function isStaticAsset(url) {
  return CACHE_STRATEGIES.static.some(pattern => pattern.test(url));
}

// Verificar se é uma página
function isPageRequest(url) {
  return CACHE_STRATEGIES.pages.some(pattern => pattern.test(url));
}

// Verificar se é uma API request
function isApiRequest(url) {
  return CACHE_STRATEGIES.api.some(pattern => pattern.test(url));
}

// Cache First Strategy
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache First failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network First Strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback para páginas offline
    if (request.destination === 'document') {
      return new Response(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Offline</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 50px; 
                background: #0A0A0A; 
                color: white; 
              }
            </style>
          </head>
          <body>
            <h1>Você está offline</h1>
            <p>Verifique sua conexão com a internet e tente novamente.</p>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    return new Response('Offline', { status: 503 });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });
  
  return cachedResponse || fetchPromise;
}

// Background sync para formulários
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implementar sincronização em background se necessário
  console.log('Background sync triggered');
}

// Push notifications (se necessário no futuro)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Cleanup de cache antigo
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_CLEANUP') {
    event.waitUntil(cleanupOldCaches());
  }
});

async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => 
    !name.includes(STATIC_CACHE) && !name.includes(DYNAMIC_CACHE)
  );
  
  return Promise.all(oldCaches.map(name => caches.delete(name)));
}
