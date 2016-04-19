/*jshint browser: true */
/*global io: false */
"use strict";
// Inicjalizacja UI
window.addEventListener("load", function (event) {
    var status = document.getElementById("status");
    var open = document.getElementById("open");
    var close = document.getElementById("close");
    var send = document.getElementById("send");
    var text = document.getElementById("text");
    var message = document.getElementById("message");
    var socket;

    status.textContent = "Brak połącznia";
    close.disabled = true;
    send.disabled = true;

    // Po kliknięciu guzika „Połącz” tworzymy nowe połączenie WS
    open.addEventListener("click", function (event) {
        open.disabled = true;
        socket = io.connect('http://' + location.host);

        socket.on('connect', function () {
            close.disabled = false;
            send.disabled = false;
            status.src = "img/bullet_green.png";
            console.log('Nawiązano połączenie przez Socket.io');
        });
        socket.on('disconnect', function () {
            open.disabled = false;
            status.src = "img/bullet_red.png";
            console.log('Połączenie przez Socket.io zostało zakończone');
        });
        socket.on("error", function (err) {
            message.textContent = "Błąd połączenia z serwerem: '" + JSON.stringify(err) + "'";
        });
        socket.on("echo", function (data) {
            message.textContent = "Serwer twierdzi, że otrzymał od Ciebie: '" + data + "'";
        });
    });

    // Zamknij połączenie po kliknięciu guzika „Rozłącz”
    close.addEventListener("click", function (event) {
        close.disabled = true;
        send.disabled = true;
        message.textContent = "";
        socket.disconnect();
    });

    // Wyślij komunikat do serwera po naciśnięciu guzika „Wyślij”
    send.addEventListener("click", function (event) {
        socket.emit('message', text.value);
        console.log('Wysłałem wiadomość: ' + text.value);
        text.value = "";
    });
});
