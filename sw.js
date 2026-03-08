const CACHE_NAME = 'kt-cogitator-v8';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  
  // Vulkus Maps
  './maps/vulkus_1.jpg',
  './maps/vulkus_2.jpg',
  './maps/vulkus_3.jpg',
  './maps/vulkus_4.jpg',
  './maps/vulkus_5.jpg',
  './maps/vulkus_6.jpg',
  './maps/vulkus_7.jpg',
  './maps/vulkus_8.jpg',
  './maps/vulkus_9.jpg',
  './maps/vulkus_10.jpg',
  './maps/vulkus_11.jpg',
  './maps/vulkus_12.jpg',
  
  // Gallowdark Maps
  './maps/gallowdark_1.jpg',
  './maps/gallowdark_2.jpg',
  './maps/gallowdark_3.jpg',
  './maps/gallowdark_4.jpg',
  './maps/gallowdark_5.jpg',
  './maps/gallowdark_6.jpg',
  './maps/gallowdark_7.jpg',
  './maps/gallowdark_8.jpg',
  './maps/gallowdark_9.jpg',
  './maps/gallowdark_10.jpg',
  './maps/gallowdark_11.jpg',
  './maps/gallowdark_12.jpg',
  './maps/gallowdark_13.jpg'
];

// Install Event: Forces immediate activation
self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event: Seeks and destroys old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Purging old cogitator data:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Serves files from the cache if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
