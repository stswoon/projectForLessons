function wrapCall(f) {
    return function() {
        return f.apply(null, arguments);
    }
}

function log() {
    for (key in arguments) {
        console.log(arguments[key]);
    }
}
//wrapCall(log, 1, 2);
//wrapCall(log, 3, 4)(5, 6);
//wrapCall(log)(7, 8);

var l = [1,2,3].filter(function(value) {
    return value > 2;
});
//console.log(l);

var l = [1,2,3].map(function(value) {
    return value + 1;
});
//console.log(l);
