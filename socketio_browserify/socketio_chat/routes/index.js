module.exports = {
  createChannel: function createChannel(name) {
    var channel = io
      .of('/' + name)
      .on('connection', function (socket) {
      	console.log('Uruchomiłem kanał "/chat"');
          socket.on('message', function (data) {
              console.log('/chat: ' + data);
              chat.emit('message', '/chat: ' + data);
          });
      });
    return channel;
  }
};
