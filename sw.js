self.addEventListener('install', event => {
  event.waitUntil(
      caches.open('dm')
        .then(cache => cache.addAll([
            '/public/css/styles.css',
            '/public/js/main.js'
          ]))
      })
    );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request));
  );
});
