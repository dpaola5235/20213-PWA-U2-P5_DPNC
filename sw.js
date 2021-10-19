const CACHE_NAME = "cache-v1";
const CACHE_STATIC_NAME = "static-v5";
const CACHE_DYNAMIC_NAME = "dynamic-v1";
const CACHE_INMUTABLE_NAME = "inmutable-v1";
console.log("Sw: instalado");

function cleanCache(cacheName, sizeItems){
    caches.open(cacheName)
    .then(cache =>{
        cache.keys()
        .then(keys => {
            console.log(keys);
            if(keys.length >= sizeItems){
                cache.delete(keys[0]).then(() => {
                    cleanCache(CACHE_DYNAMIC_NAME,sizeItems);
                })
            }
        });
    });
}

self.addEventListener("install",(event) =>{
    //crear caché y almacenar nuestro APPSHELL
    const promesaCache = caches.open(CACHE_STATIC_NAME)
    .then(cache =>{
        return cache.addAll([
            "/20213-PWA-U2-P5_DPNC",
            "index.html",
            "css/page.css",
            "image/inicio.png",
            "image/offline.png",
            "js/app.js",
            "pages/view-offline.html"
        ]);
    });

    const promInmutable = caches.open(CACHE_INMUTABLE_NAME)
    .then(cacheInmutable =>{
        return cacheInmutable.addAll([
            "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
        ]);
    });
    event.waitUntil(Promise.all([promesaCache,promInmutable]));

    event.waitUntil(promesaCache);
});

self.addEventListener("activate", (event) => {
    const resDeleteCache = caches.keys().then(keys => {
        keys.forEach(key => {
            if(key != CACHE_STATIC_NAME && key.includes("static")){
                return caches.delete(key);
            }
        });
    });
    event.waitUntil(resDeleteCache);
});

self.addEventListener("fetch", (event)=>{
    //3 Network with cache fallback
    //Primero busca en red, si no lo encuentra, devuelve un elemento genérico
    // const respuesta = fetch(event.request).then(res => {
    //         if (!res) {
    //             return caches.match(event.request)
    //             .then(resCache =>{
    //                 if(!resCache){
    //                     console.log("Respondemos con algo genérico");
    //                 }
    //                 console.log(resCache);
    //                 return resCache;
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             })
    //         }

    //         caches.open(CACHE_DYNAMIC_NAME).then(cache => {
    //             cache.put(event.request, res);
    //             cleanCache(CACHE_DYNAMIC_NAME, 5);
    //         });
    //      return res.clone();
    //     }).catch(error => {
    //         return caches.match(event.request)
    //             .then(resCache =>{
    //                 console.log(resCache);
    //                 return resCache;
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             });
    //     });

    // event.respondWith(respuesta);
    //-------------------------------------------------------
    //2 Cache with network fallback
    //Primero busca en caché, si no lo encuentra, va a la red'
     const respuestaCache = caches.match(event.request)
     .then(resp => {
         //si mi respuesta existe en caché
         if(resp){
             return resp;
         }
         console.log("No está en caché",event.request.url);
         return fetch(event.request)
         .then(respNet => {
             caches.open(CACHE_DYNAMIC_NAME)
             .then(cache => {
                 //guardo la respuesta de red en caché
                 console.log(event.request);
                 cache.put(event.request,respNet);
                 cleanCache(CACHE_DYNAMIC_NAME,5)
             });
             //regreso la respuesta de la red
             return respNet.clone();
         }).catch(() => {
             console.log("Error al solicitar el recurso");
             console.log(event.request.headers);
             if(event.request.headers.get("accept").includes("text/html")){
                return caches.match("/pages/view-offline.html");

             }
             if(event.request.url.includes(".jpg") || event.request.url.includes(".png")){
                 console.log("No esta la imagen");
                return caches.match("/image/offline.png");
             }

         });
     })
     event.respondWith(respuestaCache);
    //-------------------------------------------------------
    //1 Only caché
    // event.respondWith(caches.match(event.request));
});