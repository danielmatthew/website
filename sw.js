self.addEventListener('install', function(event) {
  event.waitUntil(
      caches.open('dm').then(function(cache) {
        return cache.addAll([
            '/',
            '/index.html',
            '/public/css/styles.css',
            '/public/js/main.js'
          ]);
      })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
