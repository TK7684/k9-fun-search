const CACHE = 'k9-v4';
const ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png',
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(ks =>
            Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;

    var url = new URL(e.request.url);
    if (url.hostname === 'docs.google.com' || url.hostname === 'scontent.fbkk8-2.fna.fbcdn.net') {
        e.respondWith(
            fetch(e.request).catch(() => new Response('', { status: 503 }))
        );
        return;
    }

    e.respondWith(
        caches.match(e.request).then(cached => {
            const fetched = fetch(e.request).then(response => {
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE).then(c => c.put(e.request, clone));
                }
                return response;
            }).catch(() => cached);
            return cached || fetched;
        })
    );
});
