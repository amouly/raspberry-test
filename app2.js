/*jslint node: true */
/*global console*/
var http = require('http'),
    gpio = require('rpi-gpio'),
    async = require('async'),
    Router = require('node-simple-router'),
    router = new Router(),
    pins = [12, 16, 18, 22];




function readInput(pinId) {
    'use strict';
    /*
    gpio.setup(pinI, gpio.DIR_IN, function () {
        gpio.read(pinI, function(err, value) {
            console.log('The value is ' + value);
        });
    });
    */
    return pinId + 1;
}








//Liten to pin request
router.get("/", function (request, response) {
    'use strict';

    response.writeHead(200, {'Content-Type': 'text/plain'});

    async.map(pins, readInput, function (err, results) {

        console.log(results);

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
    /*
    if (pins.indexOf(pinId) >= 0) {


    } else {
        response.write("Pin Number: " + pinId + " not found");
    }
    */

    response.end("end");
});

var server = http.createServer(router);

server.listen(8000);

console.log('Web Server running');
