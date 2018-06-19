/**
 * Primary file for the API
 */

// Dependencies
const url = require('url');
const http = require('http');
let StringDecoder = require('string_decoder').StringDecoder;


// The server shold respond to tall requests with a string
let server = http.createServer(function(req, res) {
    //  Get the url and parse it
    let parsedUrl = url.parse(req.url, true);
    // Get the path from the url
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g,'');
    
    // Get the query string as an object
    let queryStringObject = parsedUrl.query;
    
    // Get the HTTP method
    let method = req.method.toLowerCase();

    // Get the headers as an object
    let headers = req.headers;

    // Get the payload, if any 
    let decoder = new StringDecoder('utf-8');
    let buffer = ''; // really just a placeholder for a string
    req.on('data', function(data){ // requst emits a data object to bind on, 
        buffer += decoder.write(data); // creates a simple string utf 8
    });
    req.on('end', function(){
        buffer += decoder.end();

        // Send the response from the url
        res.end('Hello World\n');
        // Log the path of the request path fromm the user
        console.log('Request received with this payload: ', buffer); 

    });

});
// Start the server, and have it listen on port 3000
server.listen(3000, function(){
     console.log('The server is listening on port 3000 now');
 });

