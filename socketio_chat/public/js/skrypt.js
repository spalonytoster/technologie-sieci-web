/* jshint browser: true, globalstrict: true, devel: true, jquery: true */
/* global io: false */
/* globals swal, doT */
"use strict";
// Inicjalizacja UI

(function () {
	$(function () {

		var username,
				selectedChannel,
				activeChannel,
				channels = [],
				history = [];

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
				  activeChannel = io('http://' + location.host + '/' + name);

					activeChannel.on('connect', function () {
					  console.log('Nawiązano połączenie z kanałem "/%s"', name);
					});
					activeChannel.on('disconnect', function () {
						// TODO
					});
					activeChannel.on('message', function (data) {
						// TODO
					});
				}
			});
		};

		var addChannelToList = function (channel) {
			$('#channel-list').append(doT.template($('#channel-list-item').text())(channel));
			$('#' + channel.id).click(function () {
				if (selectedChannel) {
					$(selectedChannel).removeClass("channel-selected");
				}
				selectedChannel = this;
				$(this).toggleClass("channel-selected");
				console.log($(selectedChannel).text());
			});
		};

		var updateChannels = function updateChannels() {
			$.post("/channels", function (data) {
				channels = data.channels;
				channels.forEach(function (channel) {
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
			var channelName = $(activeChannel).text();
			var activeChannel = channels[channelName];
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

	});
})();