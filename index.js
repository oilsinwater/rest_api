/*
 * Primary file for API
 *
 */

// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');
let StringDecoder = require('string_decoder').StringDecoder;
const path = require('path');
const config = require('./config');
const _data = require('./lib/data');



// Testing
// @TODO delete this
_data.update('test', 'newFile', {'fizz' : 'buzz'} , function(err) {
  console.log('this was the error', err);
});
// Instantiate the HTTP server
let httpServer = http.createServer(function (req, res) {
  unifiedServer(req, res);
});
// Instantiate the HTTPS server
let httpsServerOptions = {
  'key' : fs.readFileSync('./https/key.pem'),
  'cert' : fs.readFileSync('./https/cert.pem')
};
let httpsServer = https.createServer(httpsServerOptions, function (req, res) {
  unifiedServer(req, res);
});
// Start the HTTPS Server
httpsServer.listen(config.httpsPort, function () {
  console.log('The server is up and running now on port ' + config.httpPort);
});
// Start HTTP server 
httpServer.listen(config.httpPort, function () {
  console.log('The server is up and running now on port ' + config.httpPort);
});
// All the server logic for both the http and the https server
let unifiedServer = function(req, res) {
  // Parse the url
  let parsedUrl = url.parse(req.url, true);

  // Get the path
  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  let queryStringObject = parsedUrl.query;

  // Get the HTTP method
  let method = req.method.toLowerCase();

  //Get the headers as an object
  let headers = req.headers;

  // Get the payload,if any
  let decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', function (data) {
    buffer += decoder.write(data);
  });
  req.on('end', function () {
    buffer += decoder.end();

    // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
    let chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object to send to the handler
    let data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, function (statusCode, payload) {

      // Use the status code called back from the handler, or set the default status code to 200
      statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

      // Use the payload called back from the handler, or set the default payload to an empty object
      payload = typeof (payload) == 'object' ? payload : {};

      // Convert the payload to a string
      let payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // log the request to the path
      console.log("Returning this response: ", statusCode, payloadString);

    });
  });
};

// Define all the handlers
let handlers = {};


// Ping handler
handlers.ping = function(data, callback) {
  callback(200);
};

// Not found handler
handlers.notFound = function (data, callback) {
  callback(404);
};

// Define the request router
let router = {
  'ping': handlers.ping,
};
