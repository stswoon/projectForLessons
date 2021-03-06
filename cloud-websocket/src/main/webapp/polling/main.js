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
            type: "POST",
            url: self.url,
            data: self.data
        }).done(function(links) {
            links = JSON.parse(links);
            console.log("start response links=",links);
            var url = "http://" + window.location.host +  links.polling;

            var doPoll = function(url, callback){
                console.log("send polling");
                $.post(url, function(data) {
                    if (data === "true") {
                        console.log("end polling");
                        callback();
                    } else {
                        setTimeout(function() {
                            doPoll(url, callback);
                        }, 3000);
                    }
                });
            };

            doPoll(url, function(result) {
                $.get(links.finish, function(resp) {
                    self.callback(resp);
                })
            });
        });
    }
}


function runCase() {
    var longActionRequest = new LongActionRequest("/startLongServerAction");//report will be get after ~15sec
    longActionRequest.setData({data:"test"});
    longActionRequest.setCallback(function(result) {
        window.alert(result);
    });
    longActionRequest.send();
}