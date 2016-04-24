var app = require('../app');

module.exports = {
  createNewChannel: function createNewChannel(req, res) {
    console.dir(app);
    console.dir(req.body);
    var channel = app.io
      .of('/test')
      .on('connection', function (socket) {
      	console.log('Uruchomiłem kanał "/test"');
          socket.on('message', function (data) {
              console.log('/chat: ' + data);
              chat.emit('message', '/test: ' + data);
          });
      });
    channels[name] = channel;
    return channel;
  },
  getAllChannels: function getAllChannels(req, res) {
    return channels;
  }
};
