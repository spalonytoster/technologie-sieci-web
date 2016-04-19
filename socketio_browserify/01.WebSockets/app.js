/*jshint node: true */
var http            = require("http");
var connect         = require("connect");
var serveStatic     = require('serve-static');
var WebSocketServer = require("ws").Server;

var app = connect();
var httpServer;
var wsServer;
var history = [];

app.use(serveStatic("public"));

httpServer = http.createServer(app);

wsServer = new WebSocketServer({
    server: httpServer
});

wsServer.on("connection", function (ws) {
	var ipAddr = ws._socket.remoteAddress;
    ws.on("message", function (message, flags) {
        history.push(message);
        console.log(history);
        console.dir(flags);
        // console.dir(ws);
        ws.send(message, flags);
    });
    ws.on("error", function () {
    	console.log("Błąd: IP: " + ipAddr);
    });
});

httpServer.listen(3000, function () {
    console.log('Serwer HTTP działa na porcie 3000');
});
