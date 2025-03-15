self.addEventListener( "install", ( event ) => {
    console.log( "installed" )
} );


self.addEventListener( "activate", ( event ) => {
    console.log( "activated" )
} );


self.addEventListener( "fetch", ( event ) => {
    console.log( "intercept an http request", event.request )
} );


self.addEventListener( "message", ( event ) => {
    console.log( "message from message" )
} );