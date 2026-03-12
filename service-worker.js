const CACHE_NAME = 'cadangan-pwa-fullscreen-cache-v3';
const ASSETS_TO_CACHE = [
    '.',
    'index.html',
    'manifest.json',
    'assets/00.png' // Nama gambar diubah jadi 00.png
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

// Pastikan navigasi berjalan lancar
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, response.clone());
                    });
                    return response;
                })
                .catch(() => caches.match('index.html'))
        );
    }
});
