/*global require,console*/
var http = require('http');
var gpio = require("pi-gpio");

var pins = [12, 16, 18, 22];
var i;

function show(pin) {
    'use strict';

    gpio.open(pin, "output", function (err) {
        // Set pin to high (1)
        gpio.write(pin, 1, function () {
            gpio.close(pin);
        });
    });
}

pins.forEach(function (pin) {
    'use strict';

    show(pin);
});

gpio.read(16, function (err, value) {
    'use strict';

    if (err) { throw err; }
    console.log(value);    // The current state of the pin
});


http.createServer(function (request, response) {
    'use strict';

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World!\n');
}).listen(8000);

console.log('Web Server running at http://127.0.0.1:8000');



