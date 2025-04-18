<<<<<<< HEAD
self.addEventListener('install', function (e) {
    e.waitUntil(
      caches.open('chewie-tracker').then(function (cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/script.js',
          '/manifest.json'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function (e) {
    e.respondWith(
      caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
      })
    );
  });
=======
self.addEventListener('install', function (e) {
    e.waitUntil(
      caches.open('chewie-tracker').then(function (cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/script.js',
          '/manifest.json'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function (e) {
    e.respondWith(
      caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
      })
    );
  });
>>>>>>> 29491ddaba619918281625bc9bc90bc7ba2cccae
  