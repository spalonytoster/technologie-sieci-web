/*jshint browser: true, globalstrict: true */
'use strict';
// Inicjalizacja UI
window.addEventListener("load", function (event) {
	var status  = document.getElementById("status");
	var open    = document.getElementById("open");
	var close   = document.getElementById("close");
	var send    = document.getElementById("send");
	var text    = document.getElementById("text");
	var message = document.getElementById("message");
	var socket;

	status.textContent = "Brak połącznia";
	close.disabled = true;
	send.disabled = true;
	// Po kliknięciu guzika „Połącz” tworzymy nowe połączenie WS
	open.addEventListener("click", function (event) {
		open.disabled = true;
		socket = new WebSocket("ws://" + location.host);
		socket.addEventListener("open", function (event) {
			close.disabled = false;
			send.disabled = false;
			status.src = "img/bullet_green.png";
		});
		socket.addEventListener("close", function (event) {
			open.disabled = false;
			status.src = "img/bullet_red.png";
		});
		socket.addEventListener("message", function (event) {
			message.textContent = "Serwer twierdzi, że otrzymał od Ciebie: '" + event.data + "'";
		});
		socket.addEventListener("error", function (event) {
			message.textContent = "Błąd połączenia z serwerem: '" + event + "'";
			open.disabled = false;
			status.src = "img/bullet_red.png";
		});
	});
	// Zamknij połączenie po kliknięciu guzika „Rozłącz”
	close.addEventListener("click", function (event) {
		close.disabled = true;
		send.disabled = true;
		message.textContent = "";
		socket.close();
	});
	// Wyślij komunikat do serwera po naciśnięciu guzika „Wyślij”
	send.addEventListener("click", function (event) {
		socket.send(text.value);
		text.value = "";
	});
});
