/*jshint browser: true, globalstrict: true, devel: true, jquery: true */
/*global io: false */
/* globals swal */
"use strict";
// Inicjalizacja UI

$(function () {

	var username,
			activeChannel,
			channels = {};

	var createNewChannel = function createNewChannel(name) {

	};

	swal({
	  title: "Hello there!",
	  text: "Pick a nickname buddy :)",
	  type: "input",
	  showCancelButton: false,
	  closeOnConfirm: true,
	  animation: "slide-from-top",
	  inputPlaceholder: "Cool guy #54365"
	}, function(inputValue) {
	  if (inputValue === false) return false;
	  if (inputValue === "") {
	    swal.showInputError("You need to write something!");
	    return false;
	  }
	  // swal("Nice!", "You wrote: " + inputValue, "success");
		username = inputValue;
		$("#username").text(username);
	});


	$(".channel").click(function () {
		if (activeChannel) {
			$(activeChannel).removeClass("channel-selected");
		}
		activeChannel = this;
		$(this).toggleClass("channel-selected");
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
		  animation: "slide-from-top",
		  inputPlaceholder: "Cool guy #54365"
		}, function(inputValue) {
		  if (inputValue === false) return false;
		  if (inputValue === "") {
		    swal.showInputError("You need to write something!");
		    return false;
		  }
			createNewChannel();
		});
	});

});
// 	var chatStatus	= document.getElementById("chatStatus");
// 	var newsStatus	= document.getElementById("newsStatus");
// 	var open	    = document.getElementById("open");
// 	var close	    = document.getElementById("close");
// 	var chatSend	= document.getElementById("chatSend");
// 	var newsSend	= document.getElementById("newsSend");
// 	var chatText 	= document.getElementById("chatText");
// 	var newsText 	= document.getElementById("newsText");
// 	var chatMessage	= document.getElementById("chatMessage");
// 	var newsMessage	= document.getElementById("newsMessage");
//
// 	var chat, news;
//
// 	close.disabled = true;
// 	chatSend.disabled = true;
// 	newsSend.disabled = true;
// 	// Po kliknięciu guzika „Połącz” tworzymy nowe połączenie WS
// 	open.addEventListener("click", function(event) {
// 		open.disabled = true;
// 		chat = io('http://' + location.host + '/chat');
// 		news = io('http://' + location.host + '/news');
// 		var tempChannel;
//
// 		chat.on('connect', function () {
// 			close.disabled = false;
// 			chatSend.disabled = false;
// 			chatStatus.src = "img/bullet_green.png";
// 		  console.log('Nawiązano połączenie z kanałem "/chat"');
// 		});
// 		news.on('connect', function () {
// 			close.disabled = false;
// 			newsSend.disabled = false;
// 			newsStatus.src = "img/bullet_green.png";
// 		  console.log('Nawiązano połączenie z kanałem "/news"');
// 		});
// 		chat.on('disconnect', function () {
// 			open.disabled = false;
// 			chatStatus.src = "img/bullet_red.png";
// 		  console.log('Połączenie z kanałem "/chat" zostało zakończone');
// 		});
// 		news.on('disconnect', function () {
// 			open.disabled = false;
// 			newsStatus.src = "img/bullet_red.png";
// 		  console.log('Połączenie z kanałem "/news" zostało zakończone');
// 		});
// 		chat.on('message', function (data) {
// 			chatMessage.textContent = data;
// 		});
// 		news.on('message', function (data) {
// 			newsMessage.textContent = data;
// 		});
// 	});
// 	// Zamknij połączenie po kliknięciu guzika „Rozłącz”
// 	close.addEventListener("click", function(event) {
// 		close.disabled = true;
// 		chatSend.disabled = true;
// 		newsSend.disabled = true;
// 		chatMessage.textContent = "";
// 		newsMessage.textContent = "";
// 		chat.disconnect();
// 		news.disconnect();
// 	});
// 	// Wyślij komunikat do serwera po naciśnięciu guzika „Wyślij”
// 	chatSend.addEventListener("click", function(event) {
// 		chat.emit('message', chatText.value);
// 		console.log('Wysłałem wiadomość /chat: ' + chatText.value);
// 		chatText.value = "";
// 	});
// 	newsSend.addEventListener("click", function(event) {
// 		news.emit('message', newsText.value);
// 		console.log('Wysłałem wiadomość /news: ' + newsText.value);
// 		newsText.value = "";
// 	});
