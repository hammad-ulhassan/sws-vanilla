const APP = {
    SW: null,
    init() {
        if( "serviceWorker" in navigator ) {
            navigator.serviceWorker.register( "/sw.js", { scope: "/" })
            .then( registeration => {
                APP.SW = registeration.installing ||
                registeration.waiting ||
                registeration.active;
                console.log( "service worker registered" );
            } );
            // check if page is currently has a service worker.
            if( navigator.serviceWorker.controller ) {
                console.log( "we have a service worker installed." );
            }

            // handler to check if a new service worker is installed and activated
            navigator.serviceWorker.oncontrollerchange = ( ev ) => {
                console.log( "new service worker activated." )
            };

            //unregister
            // navigator.serviceWorker.getRegistrations().then( registerations => {
            //     for(let reg of registerations) {
            //         reg.unregister().then( isUnreg => console.log( isUnreg ) )
            //     }
            // } )
        } else {
            console.log( "sws is not supported." );
        }
    },
};

document.addEventListener( "DOMContentLoaded", APP.init );