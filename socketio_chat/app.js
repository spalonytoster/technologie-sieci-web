/* jshint esversion: 6, node: true */
'use strict';
// var connect = require("connect");
var express = require('express');
var app = express();
var serveStatic = require("serve-static");

var httpServer = require("http").createServer(app);

var socketio = require("socket.io");
var io = socketio.listen(httpServer);
var routes = require('./routes');
var bodyParser = require('body-parser');
var _ = require('lodash');

app.use(serveStatic("public"));
app.use(serveStatic("bower_components/skeleton"));
app.use(serveStatic("bower_components/jquery/dist"));
app.use(serveStatic("bower_components/sweetalert/dist"));
app.use(serveStatic("bower_components/animate.css"));
app.use(serveStatic("node_modules/dot"));
app.use(bodyParser.json());
// io.set('heartbeat timeout', 10);
// io.set('heartbeat interval', 10);

var channels = {};

app.post('/channels/', function (req, res) {
  let toRet = [];
  _.forEach(channels, function (value, key) {
    toRet.push({
      name: value.name,
      id: value.id
    });
  });
  res.json({channels: toRet});
});
app.post('/channel/new/', function (req, res) {
  let name = req.body.name;
  let id = _.kebabCase(name);
  channels[id] = {
    name: name,
    id: id,
    channel: io
      .of('/' + id)
      .on('connection', function (socket) {
        console.log('Uruchomiłem kanał "/' + id + '"');
          socket.on('message', function (data) {
              console.log('/' + id + ': ' + data);
              channels[id].emit('message', '/' + id + ': ' + data);
          });
      })
  };
  res.json({name: name, id: id});
});

channels.general = {
  name: "General",
  id: "general",
  channel: io
    .of('/chat')
    .on('connection', function (socket) {
    	console.log('Uruchomiłem kanał "/chat"');
        socket.on('message', function (data) {
            console.log('/chat: ' + data);
            channels.general.emit('message', '/chat: ' + data);
        });
    })
};

channels.news = {
  name: "News",
  id: "news",
  channel: io
    .of('/news')
    .on('connection', function (socket) {
        console.log('Uruchomiłem kanał "/news"');
        socket.on('message', function (data) {
            console.log('/news: ' + data);
        	channels.news.emit('message', '/news: ' + data);
        });
    })
};

httpServer.listen(3000, function () {
    console.log('Serwer HTTP działa na pocie 3000');
});