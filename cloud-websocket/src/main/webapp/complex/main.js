function LongActionRequest(url) {
    this.url = url;
    this.data = null;
    this.callback = null;

    this.setData = function(data) {
        this.data = data;
    };

    this.setCallback = function(callback) {
        this.callback = callback;
    };

    this.send = function() {
        var self = this;
        $.ajax({
            type: "GET",
            url: self.url,
            data: self.data
        }).done(function(webSocketUrl) {
            console.log("webSocketUrl="+webSocketUrl);
            var wsUrl = "ws://" + window.location.host + webSocketUrl;
            self.socket = new WebSocket(wsUrl); // "ws://localhost:8080/notification"
            self.socket.onopen = function () {
                console.log("Соединение открылось");
            };
            self.socket.onclose = function () {
                console.log ("Соединение закрылось");
            };
            self.socket.onmessage = function (event) {
                console.log ("Пришло сообщение с содержанием:", event.data);
                self.callback(event.data);
            };
        });
    }
}


function runCase() {
    var longActionRequest = new LongActionRequest("/getReport?id=123");//report will be get after ~15sec
    longActionRequest.setData({});
    longActionRequest.setCallback(function(result) {
        window.alert(result);
    });
    longActionRequest.send();
}