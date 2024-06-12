// Create web server
// 1. Load the http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var comments = require('./comments.json');
var path = require('path');
var mime = require('mime');

// 2. Create a server
http.createServer(function(req, res) {
    // 3. Parse the request containing file name
    var pathname = url.parse(req.url).pathname;
    // 4. Print the name of the file for which request is made.
    console.log("Request for " + pathname + " received.");

    // 5. Read the requested file content from file system
    fs.readFile(pathname.substr(1), function(err, data) {
        if (err) {
            console.log(err);
            // HTTP Status: 404 : NOT FOUND
            // Content Type: text/plain
            res.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            // Page found
            // HTTP Status: 200 : OK
            // Content Type: text/plain
            res.writeHead(200, {'Content-Type': mime.lookup(path.basename(pathname))});
            // Write the content of the file to response body
            res.write(data.toString());
        }
        // Send the response body
        res.end();
    });

    // 6. Listen on the 8080 port
}).listen(8080);

console.log("Server running at http://