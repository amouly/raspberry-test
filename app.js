/*jslint node: true */
/*global console*/
var http = require('http'),
    gpio = require('rpi-gpio'),
    Router = require('node-simple-router'),
    router = new Router(),
    pins = [12, 16, 18, 22];

function setAction(pin, value) {
    'use strict';

    //Use the selected pin
    gpio.open(pin, "output", function (err) {

        // Set pin to the new value
        gpio.write(pin, value, function () {

            //Close connection
            gpio.close(pin, function () {
                console.log("Show: " + pin);
            });
        });
    });
}

//Liten to pin request
router.get("/", function (request, response) {
    'use strict';

    response.writeHead(200, {'Content-Type': 'text/plain'});

    pins.forEach(function (pin) {
        gpio.read(pin, function (err, value) {
            response.write("Pin Number: " + pin + " found - State: " + value);

            return value;
        });
    });

    response.end("end");
});

//Liten to pin request
router.get("/pin/:id/:action", function (request, response) {
    'use strict';

    var pinId = parseInt(request.params.id, 10),
        text,
        pinAction = request.params.action;

    response.writeHead(200, {'Content-Type': 'text/plain'});

    //Chek if the reques pin exist
    if (pins.indexOf(pinId) >= 0) {

        if (pinAction) {
            setAction(pinId, 1);
        } else {
            setAction(pinId, 0);
        }

        gpio.read(pinId, function (err, value) {
            response.write("Pin Number: " + pinId + " found - State: " + value);
        });
    } else {
        response.write("Pin Number: " + pinId + " not found");
    }

    response.end("end");
});

var server = http.createServer(router);

server.listen(8000);

console.log('Web Server running');
