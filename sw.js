const CACHE = 'bujo-habits-v2';
const ASSETS = [
  '/habit-tracker-pwa/',
  '/habit-tracker-pwa/index.html',
  '/habit-tracker-pwa/manifest.json',
  '/habit-tracker-pwa/icon-192.png',
  '/habit-tracker-pwa/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS.filter(a => !a.includes('icon'))))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/index.html')))
  );
});
