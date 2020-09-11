const staticCacheName = "smash-static";
const dynamicCache = "site-dynamic";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/icons/unknown.png",
  "/icons",
  "/weather7.jpeg",
  "/favicon",
  "/404.html",
  "/Taju-WeatherApp.code-workspace",
];
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (evt) => {
  console.log("service worker has been activated");
});

self.addEventListener("fetch", (evt) => {
  //console.log("fetch event", evt);
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          return caches.open(dynamicCache).then((cache) => {
            cache.put(evt.request.url, fetchRes.clone());
            return fetchRes;
          });
        })
      );
    })
  );
});
