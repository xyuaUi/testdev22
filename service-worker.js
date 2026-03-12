const CACHE_NAME = 'pwa-redmi10-cache-v2';
const ASSETS = [
    '.',
    'index.html',
    'manifest.json',
    'assets/00.png',
    'assets/icons/icon-48x48.png',
    'assets/icons/icon-72x72.png',
    'assets/icons/icon-96x96.png',
    'assets/icons/icon-192x192.png',
    'assets/icons/icon-512x512.png'
];

// Instal Cache dengan Lifetime Efisien
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Aktivasi & Bersihkan Cache Lama
self.addEventListener('activate', (e) => {
    const WHITELIST = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then(names => {
            return Promise.all(
                names.map(name => !WHITELIST.includes(name) && caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch dengan Cache yang Efisien
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(res => res || fetch(e.request).then(fetchRes => {
                caches.open(CACHE_NAME).then(cache => cache.put(e.request, fetchRes.clone()));
                return fetchRes;
            }))
    );
});
