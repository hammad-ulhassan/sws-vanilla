const APP = {
  SW: null,
  cacheName: "assetCache1",
  init() {
    // if( "serviceWorker" in navigator ) {
    //     navigator.serviceWorker.register( "/sw.js", { scope: "/" })
    //     .then( registeration => {
    //         APP.SW = registeration.installing ||
    //         registeration.waiting ||
    //         registeration.active;
    //         console.log( "service worker registered" );
    //     } );
    //     // check if page is currently has a service worker.
    //     if( navigator.serviceWorker.controller ) {
    //         console.log( "we have a service worker installed." );
    //     }

    //     // handler to check if a new service worker is installed and activated
    //     navigator.serviceWorker.oncontrollerchange = ( ev ) => {
    //         console.log( "new service worker activated." )
    //     };

    //     //unregister
    //     // navigator.serviceWorker.getRegistrations().then( registerations => {
    //     //     for(let reg of registerations) {
    //     //         reg.unregister().then( isUnreg => console.log( isUnreg ) )
    //     //     }
    //     // } )
    // } else {
    //     console.log( "sws is not supported." );
    // }
    APP.startCaching();

    // document.querySelector( "header>h2" )
    // .addEventListener( "click", APP.deleteCache )
  },
  startCaching() {
    return caches
      .open(APP.cacheName)
      .then((cache) => {
        // console.log(`Cache ${APP.cacheName} opened`, cache);

        let urlString = "images/bulb.jpg";
        cache.add(urlString);

        let url = new URL("http://localhost:5500/images/music.jpg");
        cache.add(url);

        let req = new Request("images/hands.jpg");
        cache.add(req);

        cache.keys().then((keys) => {
          keys.forEach((key, index) => {
            // console.log(index, key);
          });
        });
        return cache;
      })
      .then( ( cache ) => {
        caches.has(APP.cacheName).then((hasCache) => {
        });
        let urlString = "images/minis.jpg";
        return caches.match(urlString).then((cacheResponse) => {
          // this resp is the same as if i had done fetch.
          if (
            cacheResponse &&
            cacheResponse.status < 400 &&
            cacheResponse.headers.get("content-type") &&
            cacheResponse.headers.get("content-type").match(/^image\//i)
          ) {
            console.log( "found in the cache" );
            console.log( cacheResponse );
            return cacheResponse;
          } else {
            console.error( "no match found" );
            return fetch( urlString ) //if cache miss then fetch from backend
            .then( fetchResponse => {
                if( ! fetchResponse.ok ) {
                    throw fetchResponse.statusText;
                }
                // we cant put resp object in cache and return it as well. we have to make copy.
                cache.put(
                    urlString,
                    fetchResponse.clone()
                );// put since add() is fetch and add it into cache. but we have fetched it ourselves
                return fetchResponse;
            } );
          }
        });
      }).then( resp => {
        console.log( resp )
      } )
  },
  deleteCache() {},
};

document.addEventListener("DOMContentLoaded", APP.init);
