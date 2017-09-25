(function() {
        'use strict';
        if (!('serviceWorker' in navigator)) {
          console.log('Service worker not supported');
          return;
        }
        navigator.serviceWorker.register('service-worker.js',{scope: './'})
        .then(function(registration) {
          console.log('Registered at scope',registration.scope);
        })
        .catch(function(error) {
          console.log('Registration failed:', error);
        });
})();
