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
            } )
        } else {
            console.log( "sws is not supported." );
        }
    },
};

document.addEventListener( "DOMContentLoaded", APP.init );