self.addEventListener('message', function(e) {
    self.postMessage("start");
    var data = e.data;
    var n = data.n;
    var x = 0;
    for (var i = 0; i < n; ++i) {
        x++;
    }
    self.postMessage("end");
}, false);