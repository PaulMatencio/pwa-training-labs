(function() {
  'use strict';

  var filesToCache = [
    '.',
    'index.html',
    'pages/404.html',
    'js/main.js',
    'js/register.js'
  ];
  /*
  'examples/animals.json',
  'examples/kitten.jpg',
  'examples/words.txt'
  */

  function LogeError(error){
    console.log(error);
  }

  var staticCacheName = 'pages-cache-v1';
  self.addEventListener('install', function(event) {
    console.log('Service worker below installing...');
    /*
    *   Build Cache  and initial resource
    */
    event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    })

  );
    self.skipWaiting();
  });
  /*
  *   Only one service worker can be active at a time for a given scope
  *   newly installed service worker isn't activated until
  */
  self.addEventListener('activate', function(event) {
    console.log('Service worker below activating...');
    /*
    *   Update Cache should be done
    */
  });

  self.addEventListener('fetch', function(event) {
    event.respondWith(
    // Try the cache
      caches.match(event.request).then(function(response) {
        if (response) {
          console.log("get from cache");
          return response;
        }
        return fetch(event.request).then(function(response) {
          if (response.status === 404) {
            return caches.match('pages/404.html');
          }
          console.log("get from network");
          return response
        });
      }).catch(function() {
        // If both fail, show a generic fallback:
        return caches.match('/offline.html');
      })
    );
  });

})();
