const CACHE_NAME = 'cute-pets-game-cache-v2';
const ASSETS_TO_CACHE = [
    '.',
    'index.html',
    'styles.css',
    'app.js',
    'manifest.json',
    'assets/couch.png',
    'assets/forum.png',
    'assets/the-lamb.png',
    'assets/item-shop.png',
    'assets/paw-icon.png',
    'assets/coin-icon.png',
    'assets/user-avatar.png',
    'assets/mic-icon.png',
    'assets/trophy-icon.png',
    'assets/icons/icon-48x48.png',
    'assets/icons/icon-72x72.png',
    'assets/icons/icon-96x96.png',
    'assets/icons/icon-192x192.png',
    'assets/icons/icon-512x512.png'
];

// Instal Cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

// Aktivasi & Hapus Cache Lama
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => self.clients.claim())
    );
});

// Fetch Asset
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
