if('serviceWorker' in navigator) {
    window.addEventListener('load', function(){
    navigator.serviceWorker.register('/sw.js').then(function(registration){
        console.log('Service Worker registration successful with scope: ',registration.scope);
    }, function(err){
        console.log('service worker registration failed: ',err);
    });
    })
}

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    'index.html',

];
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            console.log("opened cache");
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response){
                return response;

            }
            return fetch(event.request);
        })
    );
});