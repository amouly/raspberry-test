var http = require('http');
var gpio = require("pi-gpio");


gpio.open(16, "output", function(err) {        // Open pin 16 for output
    gpio.write(16, 1, function() {            // Set pin 16 high (1)
        gpio.close(16);                        // Close pin 16
    });
});

gpio.read(16, function(err, value) {
    if(err) throw err;
    console.log(value);    // The current state of the pin
});


http.createServer(function (request,response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World!\n');
}).listen(8000)

console.log('Web Server running at http://127.0.0.1:8000');



