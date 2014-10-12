/*jslint node: true */
/*global console*/
var http = require('http'),
    gpio = require("pi-gpio"),
    Router = require('node-simple-router'),
    router = new Router(),
    pins = [12, 16, 18, 22];

function activate(pin) {
    'use strict';
    var state;

    //Use the selected pin
    gpio.open(pin, "output", function (err) {

        //Read the state of the pin
        gpio.read(pin, function (err, value) {
            var newValue;

            if (value === 1) {
                newValue = 0;
                state = "OFF";

            } else if (value === 0) {
                newValue = 1;
                state = "ON";
            }

            // Set pin to the new value
            gpio.write(pin, newValue, function () {
                gpio.close(pin, function () {
                    console.log("Show: " + pin);
                });
            });
        });
    });

    return state;
}

//Liten to pin request
router.get("/pin/:id", function (request, response) {
    'use strict';

    var pin = parseInt(request.params.id, 10),
        text,
        state;

    response.writeHead(200, {'Content-Type': 'text/plain'});

    //Chek if the reques pin exist
    if (pins.indexOf(pin) >= 0) {

        //Start pin
        state = activate(pin);

        text = "Pin Number: " + pin + " found - State: " + state;
    } else {
        text = "Pin Number: " + pin + " not found";
    }

    response.end(text);
});

var server = http.createServer(router);

server.listen(8000);

console.log('Web Server running');
