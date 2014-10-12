var http = require('http');
var gpio = require("pi-gpio");


gpio.open(23, "output", function(err) {        // Open pin 16 for output
    gpio.write(23, 1, function() {            // Set pin 16 high (1)
        gpio.close(23);                        // Close pin 16
    });
});


http.createServer(function (request,response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World!\n');
}).listen(8000)

console.log('Web Server running at http://127.0.0.1:8000');



