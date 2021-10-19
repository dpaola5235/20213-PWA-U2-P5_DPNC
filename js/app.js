let url = window.location.href;
//PWA-U2-P3-DPNC/sw.js
let swDirect = '/sw.js'

if (navigator.serviceWorker) {
  console.log("Si esta disponible")
  if(url.includes('localhost')){
    swDirect = '/sw.js'
  }

  navigator.serviceWorker.register(swDirect);
  
}else{
  console.log("No esta disponible")
}

/* if (window.caches) {
  console.log("Tenemos caches");

  //metodo open abre y si no exixte crea el cache
  caches.open("prueba");
  caches.open("v2");

  caches.has("prueba").then(result => {
    console.log(result);
  });
  caches.open("cache-v1").then(cache => {
    //cache.add('/index.html');

    cache
      .addAll([
        "/index.html",
        "/css/page.css",
        "/image/inicio.jpg",
        "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      ])
      .then(() => {
        //cache.delete('css/page.css');
        cache.put("index.html", new Response("Actualizado desde Cache"));
      });

    cache.match("index.html").then(res => {
      res.text().then(text => {
        console.log(text);
      });
      console.log(res);
    });
  });

  caches.keys().then(keys => {
    console.log(keys);
  });
}
 */