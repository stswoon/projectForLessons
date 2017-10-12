var socket = null;

function startNotification() {
    socket = new WebSocket("ws://localhost:8080/notification");

    socket.onopen = function () {
        console.log("Соединение открылось");
    };
    socket.onclose = function () {
        console.log ("Соединение закрылось");
    };
    socket.onmessage = function (event) {
        console.log ("Пришло сообщение с содержанием:", event.data);
    };
}

function send() {
    socket.send("hello from client");
}
