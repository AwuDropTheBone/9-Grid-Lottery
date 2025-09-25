const CACHE_NAME = 'lottery-cache-v4'; // 更新快取名稱
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/fonts/MantouSans-Regular.ttf',
  '/images/grid-bg.png',
  '/images/start-btn.png',
  '/images/fullscreen-btn.png',
  '/images/modal-bg.png',
  '/images/back-btn.png',
  '/images/prize1.png',
  '/images/prize2.png',
  '/images/prize3.png',
  '/images/prize4.png',
  '/images/prize5.png',
  '/images/prize6.png',
  '/images/prize7.png',
  '/images/prize8.png',
  '/images/prize9.png',
  '/images/icon.png',
  '/images/icon-512.png',
  '/sounds/draw.mp3',
  '/sounds/result.mp3',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});