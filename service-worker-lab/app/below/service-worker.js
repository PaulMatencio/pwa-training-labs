/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
(function() {
  'use strict';
  console.log(self);
  // TODO - 3.1: Add install and activate event listeners
  self.addEventListener('install', function(event) {
    console.log('Service worker below installing...');
    // TODO 3.4: Skip waiting to active immediately the new service worker
    self.skipWaiting();
  });
  /*
  *   Only one service worker can be active at a time for a given scope
  *   newly installed service worker isn't activated until
  *   the existing service worker is no longer in use.
  *   or must be unregistered
  */
  self.addEventListener('activate', function(event) {
    console.log('Service worker below activating...');
    console.log('I am the New service worker'):
  });


  // TODO - 3.3: Add a comment to change the service worker

  // TODO - 4: Add fetch listener
  self.addEventListener('fetch', function(event) {
    console.log('Fetching:', event.request.url);
    //  Cache API or indexedDB API can be called from here 
  });

})();
