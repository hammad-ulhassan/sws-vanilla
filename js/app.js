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
        caches.open(APP.cacheName).then(cache => {
            console.log(`Cache ${APP.cacheName} opened`, cache);

            let urlString = "images/bulb.jpg";
            cache.add(urlString);

            let url = new URL( "http://localhost:5500/images/music.jpg" );
            cache.add(url);

            let req = new Request( "images/hands.jpg" );
            cache.add( req );

            cache.keys().then( keys => {
                keys.forEach( ( key, index ) => {
                    console.log(index, key);
                } );
            } );
        })
    },
    deleteCache() {

    }
};

document.addEventListener( "DOMContentLoaded", APP.init );