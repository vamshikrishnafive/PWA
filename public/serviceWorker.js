const CACH_NAME = 'version-1';
const urlsToCache = ["index.html", "offline.html"];

const self = this;

//Install Serviceworker
self.addEventListener('input', (event) => {
    event.waitUntil(
        caches.open(CACH_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    )
});

//Listen for request
self.addEventListener('fetch', (event) => {
    event.respondWith(event.request)
        .then(() => {
            return fetch(event.request).catch(() => caches.match('offline.html'))
        })
});

//Activate Serviceworker
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACH_NAME);
    event.waitUntil(
        caches.keys().then((cachNames)=>Promise.all(
            cachNames.map((cachNames) => {
                if(!cacheWhiteList.includes(cachNames)) {
                    return caches.delete(cachNames)
                }
            })
        ))
    )
});