'use strict';

const version = '2';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(`static-${version}`)
      .then(cache => cache.addAll([
        '/public/css/styles.css',
        '/public/js/main.js'
      ]))
    );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});


/*
const CACHE_NAME = 'dependencies-cache';

self.addEventListener('install', function(event) {
  console.log('[install] Kicking off service worker registration!');
  event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          return fetch('files-to-cache.json')
          .then(function(response) {
            return response.json();
          })
          .then(function(files) {
            console.log('[install] Adding files from JSON file: ', files);
            return cache.addAll(files);
          });
        })
        .then(function() {
          console.log('[install] All required resources have been cached;',
        'the Service Worker was successfully installed!');

          return self.skipWaiting();
        })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          console.log(
            '[fetch] Returning from Service Worker cache: ',
            event.request.url
          );
          return response;
        }

        console.log('[fetch] Returning from server: ', event.request.url);
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[activate] Activating service worker!');
  console.log('[activate] Claiming this service worker!');
  event.waitUntil(self.clients.claim());
});*/
