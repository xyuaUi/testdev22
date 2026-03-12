const CACHE_NAME = 'pwa-redmi10-cache-v4';
const CACHE_ASSETS = [
    '.',
    'index.html',
    'manifest.json',
    'assets/00.png'
];

// Instal Cache dengan Lifetime Efisien
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(CACHE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Aktivasi & Bersihkan Cache Lama Setelah 7 Hari
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(names => {
            return Promise.all(
                names.map(name => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch dengan Cache yang Diperbarui Secara Berkala
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(res => {
            if (res) return res;
            return fetch(e.request).then(fetchRes => {
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(e.request, fetchRes.clone());
                });
                return fetchRes;
            });
        })
    );
});

// Atur Cache Lifetime Maksimal 7 Hari
self.addEventListener('activate', (e) => {
    const MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 Hari
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.keys().then(keys => {
                keys.forEach(key => {
                    cache.match(key).then(res => {
                        if (Date.now() - res.headers.get('date') > MAX_CACHE_AGE) {
                            cache.delete(key);
                        }
                    });
                });
            });
        })
    );
});
