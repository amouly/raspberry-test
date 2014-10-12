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
        gpio.write(pin, 1, function () {
            gpio.close(pin, function () {
                console.log("Show: " + pin);
            });
        });
    });
}

router.get("/pin/:id", function (request, response) {
    'use strict';
    var pin = parseInt(request.params.id, 10),
        text;

    response.writeHead(200, {'Content-Type': 'text/plain'});

    //Chek if the reques pin exist
    if (pins.indexOf(pin) >= 0) {
        text = "Pin Number: " + pin + " found";

        //Start pin
        show(pin);
    } else {
        text = "Pin Number: " + pin + " not found";
    }

    response.end(text);
});

var server = http.createServer(router);

server.listen(8000);

console.log('Web Server running');
