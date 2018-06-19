/**
 * Primary file for the API
 */

// Dependencies
const url = require('url');
const http = require('http');


 // The server shold respond to tall requests with a string
let server = http.createServer(function(req, res) {

    //  Get the url and parse it
    let parsedUrl = url.parse(req.url, true);

    // Get the path from the url
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // Send the response from the url
    res.end('Hello World\n');

    // Log the path of the request path fromm the user
    console.log('Request is received on this path: '+trimmedPath);



});


 // Start the server, and have it listen on port 3000
 server.listen(3000, function(){
     console.log('The server is listening on port 3000 now');
 });