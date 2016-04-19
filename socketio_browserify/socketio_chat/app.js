var connect = require("connect");
var app = connect();
var serveStatic = require("serve-static");

var httpServer = require("http").createServer(app);

var socketio = require("socket.io");
var io = socketio.listen(httpServer);

app.use(serveStatic("public"));
app.use(serveStatic("bower_components/skeleton"));
app.use(serveStatic("bower_components/jquery/dist"));
app.use(serveStatic("bower_components/sweetalert/dist"));
// io.set('heartbeat timeout', 10);
// io.set('heartbeat interval', 10);

var chat = io
    .of('/chat')
    .on('connection', function (socket) {
    	console.log('Uruchomiłem kanał "/chat"');
        socket.on('message', function (data) {
            console.log('/chat: ' + data);
            chat.emit('message', '/chat: ' + data);
        });
    });

var news = io
    .of('/news')
    .on('connection', function (socket) {
        console.log('Uruchomiłem kanał "/news"');
        socket.on('message', function (data) {
            console.log('/news: ' + data);
        	socket.emit('message', '/news: ' + data);
        });
    });

httpServer.listen(3000, function () {
    console.log('Serwer HTTP działa na pocie 3000');
});
