/* jshint browser: true, globalstrict: true, devel: true, jquery: true */
/* global io: false */
/* globals swal, doT, _ , moment*/
"use strict";
// Inicjalizacja UI

var username,
		selectedChannel,
		activeChannel,
		channels = {};
$(function () {


	var createNewChannel = function createNewChannel(name) {
		// $.post("/channel/new/", {name: name}, function(data) {
		// 	console.log('Channel "%s" has been created with id: "%s"', data.name, data.id);
		//   activeChannel = io('http://' + location.host + '/' + name);
		// 	activeChannel.on('connect', function () {
		// 	  console.log('Nawiązano połączenie z kanałem "/"' + name);
		// 	});
		// 	activeChannel.on('disconnect', function () {
		// 		// TODO
		// 	});
		// 	activeChannel.on('message', function (data) {
		// 		// TODO
		// 	});
		// }, "json");
		$.ajax({
		  url: "/channel/new/",
		  type:"POST",
		  data: JSON.stringify({name: name}),
		  contentType:"application/json; charset=utf-8",
		  dataType:"json",
		  success: function(data) {
				console.log('Channel "%s" has been created with id: "%s"', data.name, data.id);
				addChannelToList(data);
			}
		});
	};

	var connectToChannel = function connectToChannel(channel) {
		if (activeChannel) {
			$('#' + activeChannel.channelInfo.id + ' .status').text('');
			activeChannel.disconnect();
			activeChannel = null;
		}
		activeChannel = io('http://' + location.host + '/' + channel.id);
		activeChannel.channelInfo = channel;
		activeChannel.on('connect', function () {
			console.log('Nawiązano połączenie z kanałem "/%s"', channel.id);
		});
		activeChannel.on('disconnect', function () {
			console.log('Rozłączono z kanałem "/%s"', channel.id);
		});
		activeChannel.on('message', function (data) {
			console.log(data);
		});
	};

	var addChannelToList = function addChannelToList(channel) {
		$('#channel-list').append(doT.template($('#channel-list-item').text())(channel));
		channels[channel.id] = channel;
		$('#' + channel.id).click(function () {
			if (selectedChannel) {
				$(selectedChannel).removeClass("channel-selected");
			}
			selectedChannel = this;
			$(this).toggleClass("channel-selected");
		});
	};

	var updateChannels = function updateChannels() {
		$.post("/channels", function (data) {
			channels = data;
			_.forEach(channels, function (channel) {
				addChannelToList(channel);
			});
		});
	};

	updateChannels();

	swal({
	  title: "Hello there!",
	  text: "Pick a nickname buddy :)",
	  type: "input",
	  showCancelButton: false,
	  closeOnConfirm: true,
		allowEscapeKey: false,
	  inputPlaceholder: "Cool guy #54365"
	}, function(inputValue) {
	  if (inputValue === false) return false;
	  if (inputValue === "") {
	    swal.showInputError("You need to write something!");
	    return false;
	  }
		username = inputValue;
		$("#username").text(username);
	});

	$("#join-button").click(function () {
		var channelId = $(selectedChannel).attr("id");
		connectToChannel(channels[channelId]);
		$('#' + channelId + ' .status').text('Connected');
	});

	$("#create-button").click(function () {
		swal({
		  title: "Create channel",
		  text: "Enter channel name:",
		  type: "input",
		  showCancelButton: false,
		  closeOnConfirm: true,
		  inputPlaceholder: "Eg. \"Awesome nerd channel\""
		}, function(inputValue) {
		  if (inputValue === false) return false;
		  if (inputValue === "") {
		    swal.showInputError("You need to write something!");
		    return false;
		  }
			createNewChannel(inputValue);
		});
	});

	var sendMessage = function sendMessage(event) {
		var body = $('#send-message-input').val();
		activeChannel.emit('message', body);
		// channels[activeChannel.channelInfo.id];
		$('#messages-list').append(doT.template($('#my-message').text())({
			body: body,
			time: moment().calendar()
		}));
		$('#send-message-input').val('');
		$("#messages-list").animate({ scrollTop: $('#messages-list').prop("scrollHeight")}, 600);
		event.preventDefault();
	};
	$('#send-message-form').submit(sendMessage);
	$('#send-message-button').click(sendMessage);

});
