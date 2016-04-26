/* jshint browser: true, globalstrict: true, devel: true, jquery: true */
/* global io: false */
/* globals swal, doT, _ , moment, noty */
"use strict";
// Inicjalizacja UI

$(function () {

	var username,
	selectedChannel,
	activeChannel,
	channels = {},
	systemChannel;

	var initSystemChannel = function initSystemChannel() {
		systemChannel = io('http://' + location.host + '/system');

		systemChannel.on('connect', function () {
			console.log('connected to /system hidden channel');
		});

		systemChannel.on('system-message', function (systemMessage) {
			var presence, body, channel;
			console.log(systemMessage);
			if (systemMessage.channelPresence) {
				presence = systemMessage.channelPresence;
				body = presence.createdBy +
			 				 ' created channel "' + presence.name + '".';
				channel = {
					id: presence.id,
					name: presence.name
				};
				addChannelToList(channel);
			}
			if (systemMessage.userPresence) {
				// TODO
			}
			noty({
				layout: 'topCenter',
				theme: 'relax',
				type: 'information',
				timeout: true,
				text: body,
				animation: {
					open: 'animated flipInX', // Animate.css class names
					close: 'animated flipOutX', // Animate.css class names
				}
			});
		});
	};

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
				return data;
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

		activeChannel.on('message', function (message) {
			if (message.from === username) {
				return;
			}
			console.log(message);
			channels[activeChannel.channelInfo.id].history.push(message);
			$('#messages-list').append(doT.template($('#their-message').text())(message));
			$("#messages-list").animate({ scrollTop: $('#messages-list').prop("scrollHeight")}, 300);
		});

		$('#messages-list').html('');
		if (channels[activeChannel.channelInfo.id].history.length > 0) {
			_.forEach(channels[activeChannel.channelInfo.id].history, function (message) {
				if (message.from == "Me") {
					$('#messages-list').append(doT.template($('#my-message').text())(message));
				}
				else {
					$('#messages-list').append(doT.template($('#their-message').text())(message));
				}
			});
		}
	};

	var addChannelToList = function addChannelToList(channel) {
		$('#channel-list').append(doT.template($('#channel-list-item').text())(channel));
		channels[channel.id] = channel;
		channels[channel.id].history = [];
		$('#' + channel.id).click(function () {
			if (selectedChannel) {
				$(selectedChannel).removeClass("channel-selected");
			}
			selectedChannel = this;
			$(this).toggleClass("channel-selected");
		});
	};

	var sendMessage = function sendMessage(event) {
		var body = $('#send-message-input').val();
		if (body === '') {
			return false;
		}
		var message = {
			from: username,
			body: body,
			time: moment().calendar()
		};
		activeChannel.emit('message', message);
		channels[activeChannel.channelInfo.id].history.push(message);
		$('#messages-list').append(doT.template($('#my-message').text())(message));
		$("#messages-list").animate({ scrollTop: $('#messages-list').prop("scrollHeight")}, 300);
		$('#send-message-input').val('');
		return false; //same as event.preventDefault();
	};

	$("#join-button").click(function () {
		if (!selectedChannel) {
			swal("Oops...", "You need to select a channel first!", "error");
			return false;
		}
		if (!activeChannel) {
			$('#chat-window').css('display', 'block');
			$('#chat-window').addClass('animated fadeInUp');
		}
		var channelId = $(selectedChannel).attr("id");
		connectToChannel(channels[channelId]);
		$('#' + channelId + ' .status').text('Connected');
	});

	$("#create-button").click(function () {
		var channel;
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
			channel = createNewChannel(inputValue);
		});
	});

	$('#send-message-form').submit(sendMessage);
	$('#send-message-button').click(sendMessage);

	(function registerUsername() {
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
			initSystemChannel();
		});
	})();

	(function updateChannels() {
		$.post("/channels", function (data) {
			channels = data;
			_.forEach(channels, function (channel) {
				addChannelToList(channel);
			});
		});
	})();

});
