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
				channels = [];

		var createNewChannel = function createNewChannel(name) {
			$.post("/channel/new", {name: name}, function(data) {
			  activeChannel = io('http://' + location.host + '/' + name);

				activeChannel.on('connect', function () {
				  console.log('Nawiązano połączenie z kanałem "/" + name');
				});
				activeChannel.on('disconnect', function () {
					// TODO
				});
				activeChannel.on('message', function (data) {
					// TODO
				});
			});
		};

		var addChannelToList = function (channel) {
			$('#channel-list').append(doT.template($('#channelListItem').text())(channel));
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
