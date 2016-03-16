/*
// http://www.html5rocks.com/ru/tutorials/workers/basics/
//var worker = new Worker('doWork.js'); //work only on servers, on local PC this cause security exception the line below shows inline workers
var blob = new Blob([
    "onmessage = function(e) {\n" +
    "\tpostMessage('start');\n"+
    "\tvar data = e.data;\n" +
    "\tvar n = data.n;\n" +
    "\tvar x = 0;\n" +
    "\tfor (var i = 0; i < n; ++i) {\n"+
    "\t\tx++;\n"+
    "\t}\n" +
    "\tpostMessage('end');\n"+
    "}\n"
]);
var blobURL = window.URL.createObjectURL(blob);
var worker = new Worker(blobURL);
//var worker = new Worker(URL.createObjectURL(new Blob(["("+worker_function.toString()+")()"], {type: 'text/javascript'})));
worker.addEventListener('message', function(e) {
    console.log('webworker: ' + e.data);
}, false);
worker.postMessage({n:1000000000*3});

function withOutWebWorker(n) {
    console.log("start");
    var x = 0;
    for (var i = 0; i < n; ++i) {
        x++;
    }
    console.log("end");
}

withOutWebWorker(1000000000*3);
*/

/*
sample result

 start
 end
 6 work
 webworker: start
 5 work
 webworker: end
*/

