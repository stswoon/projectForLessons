(function (exports) {
    var names = ['monday', 'thusday', 'wensday', 'thursday', 'friday', 'suturday', 'sunday']
    exports.name = function(number) {return names[number];},
    exports.number = function(name) {return names.indexOf(name);}
})(this.weekDay = {});

//console.log(weekDay.name(2));

//standart CommonsJS
function require(name) {
    //stub
    function readFile() {
        return "" +
            "(function (exports) {" +
            "        var names = ['monday', 'thusday', 'wensday', 'thursday', 'friday', 'suturday', 'sunday']" +
            "        exports.name = function(number) {return names[number];}," +
            "            exports.number = function(name) {return names.indexOf(name);}" +
            "    })(this.weekDay = {});";
    }

    if (name in require.cache) {
        return require.cache[name];
    }

    //same like var code = function(exports, module) {code from readFile}
    var code = new Function("exports, module", readFile(name));
    var exports = {};
    var module = {exports: exports};
    code(exports, module);

    require.cache[anme] = module.exports;
    return module.exports;
}
require.cache = Object.create(null);

//AMD example
//stub
var define = function() {}
define([], function() {
    var names = ["monday", "thusday", "wensday", "thursday", "friday", "suturday", "sunday"]
    return {
        name: function(number) {return names[number];},
        number: function(name) {return names.indexOf(name);}
    };
});