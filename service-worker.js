const CACHE_NAME = 'cute-pets-game-cache-v2';
const ROOT_URL = 'https://xyuaui.github.io/testdev22/';
const ASSETS_TO_CACHE = [
    ROOT_URL,
    ROOT_URL + 'index.html',
    ROOT_URL + 'styles.css',
    ROOT_URL + 'app.js',
    ROOT_URL + 'manifest.json',
    ROOT_URL + 'assets/couch.png',
    ROOT_URL + 'assets/forum.png',
    ROOT_URL + 'assets/the-lamb.png',
    ROOT_URL + 'assets/item-shop.png',
    ROOT_URL + 'assets/paw-icon.png',
    ROOT_URL + 'assets/coin-icon.png',
    ROOT_URL + 'assets/user-avatar.png',
    ROOT_URL + 'assets/mic-icon.png',
    ROOT_URL + 'assets/trophy-icon.png',
    ROOT_URL + 'assets/icons/icon-48x48.png',
    ROOT_URL + 'assets/icons/icon-72x72.png',
    ROOT_URL + 'assets/icons/icon-96x96.png',
    ROOT_URL + 'assets/icons/icon-192x192.png',
    ROOT_URL + 'assets/icons/icon-512x512.png'
];

// Instal service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

// Aktivasi service worker & hapus cache lama
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Menghapus cache lama:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => self.clients.claim())
    );
});

// Fetch asset dari cache atau jaringan
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, response.clone());
                    });
                    return response;
                })
                .catch(() => {
                    return caches.match(event.request) || caches.match(ROOT_URL + 'index.html');
                })
        );
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    return response || fetch(event.request);
                })
        );
    }
});
