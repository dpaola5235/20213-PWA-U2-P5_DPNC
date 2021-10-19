self.addEventListener("install", () => {
  console.log("SW: Instalado");
});

self.addEventListener("fetch", e => {
    /* const respOff = new Response(`
        
            Bienvenido a la pagina OfflineAudioCompletionEvent

            Para poder usar la app necesitas conexion a internet
        
        `); */

  /*   const respOffHtml = new Response(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                <link rel="stylesheet" href="css/page.css" >
                <title>Mi PWA | Caches</title>
            </head>
            <body>
                <h1>Bienvenido a la pagina Offline </h1>
                <p> Para poder usar la app necesitas conexion a internet </p>
            </body>
            </html>
        `,{
            headers:{
                'Content-Type': 'text/html'
            }
        }) */
    // marca error porque necesitamos conexion para hacer fetch
    const respOffFile = fetch('pages/view-offline.html');

    const resp = fetch(e.request)
        .catch( () => {
            console.log("SW: Error en la peticion");
            return respOffFile;
        });


   // console.log(e.request.url);

    e.respondWith(resp)
    
});
