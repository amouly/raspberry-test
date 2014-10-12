/*jslint node: true */
/*global console*/
var http = require('http');
var gpio = require("pi-gpio");
var Router = require('node-simple-router');

var pins = [12, 16, 18, 22];
var i;
var router = new Router();

function show(pin) {
    'use strict';

    gpio.open(pin, "output", function (err) {
        // Set pin to high (1)
        gpio.write(pin, 1);
    });
}

/*
pins.forEach(function (pin) {
    'use strict';

    show(pin);
});
*/

router.get("/hello", function (request, response) {
    'use strict';

    response.end("Hello, World!");
});

router.get("/pin/:id", function (request, response) {
    'use strict';
    var pin = request.params.id;

    response.end("Pin Number: " + pin);

    show(pin);
});

var server = http.createServer(router);

server.listen(8000);

/*
http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World!\n');
}).listen(8000);
*/

console.log('Web Server running');
