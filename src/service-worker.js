
workbox.core.setCacheNameDetails({ prefix: "emarifer-personal-gps" });

workbox.routing.registerRoute(
    new RegExp('.*(www.ign.es\/wms-inspire|openstreetmap|opentopomap).*'),
    new workbox.strategies.CacheFirst({
        cacheName: 'cache-map',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 600,// Limitamos a 60 el  número de recursos de ese directorio que queremos cachear.
                maxAgeSeconds: 24 * 60 * 60// Tiempo de vida de la cache 
            })
        ]
    })
); // NetworkFirst, CacheFirst, StaleWhileRevalidate

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [{ "url": "/img/icons/favicon-32x32.png", "revision": "1.0" }]
    .concat(self.__precacheManifest || []); // Agregado el precache del favicon
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("index.html"));

/**
 * LIMITAR EL NUMERO DE ENTRADAS DE UNA CACHE. VER:
 * https://pablomagaz.com/blog/escribiendo-service-workers-con-workbox
 */

/**
 * 
 * AGREGAR UN ITEM AL PRECACHEO. VER:
 * https://github.com/GoogleChrome/workbox/issues/1762
 * https://developers.google.com/web/tools/workbox/modules/workbox-precaching
 * 
 * EL ICONO QUE USA COMO FAVICON VUE ES favicon-32x32.png
 */