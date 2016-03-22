/*jshint node: true */
'use strict';

// Serwer realizujący „długie odpytywanie”
// test wydajności: ab -n 1000 -c 100 'http://127.0.0.1:3000/'
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Pragma': 'no-cache',
        'Content-Type': 'text/plain; charset=utf8'
    });
    res.write('Witam - write');
    res.end('witam również - end');
}).listen(3000, function () {
    console.log('Serwer działa na http://127.0.0.1:3000/');
});
