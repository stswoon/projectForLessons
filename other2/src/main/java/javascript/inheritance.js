/*
function ParentClass(name) {
    this.name = name;
}
ParentClass.prototype.method = function() {
    console.log(this.name);
};

var parent = new ParentClass('John');
parent.method();

function ChildClass(name) {
    ParentClass.call(this, name); // call super
}
ChildClass.prototype = new ParentClass();
ChildClass.prototype.newMethod = function() {
    this.method();
};
var child = new ChildClass('Smith');
child.method();
child.newMethod();
console.log(child instanceof ParentClass); // true
*/

/*
(function() {
    window.ParentClass = function(name) {
        this.name = name;
    }
    //public methods
    $.extend(ParentClass.prototype, {
        method : function () {
            var s = _addSuffix.call(this);
            console.log(s);
        }
    });
    //private field
    var SUFFIX = "^suffix";
    //private method (non static because of _addSuffix#call)
    function _addSuffix() {
        return this.name + SUFFIX;
    }
})();
var parentClass = new ParentClass("Tom");
parentClass.method();
*/

/*
function inherit(ChildClass, ParentClass) {
    function tmp() {};
    tmp.prototype = ParentClass.prototype;
    ChildClass.prototype = new tmp();
    ChildClass.prototype.constructor = ChildClass;
    ChildClass.prototype.super = ParentClass.prototype;
}
function ParentClass(name) {
    this.name = name;
}
$.extend(ParentClass.prototype, {
    printName : function () {
        console.log(this.name);
    }
});
function ChildClass(name) {
    this.super.constructor.call(this, name+"qqq");
}
inherit(ChildClass, ParentClass);
var childClass = new ChildClass("Olga");
childClass.printName();
console.log(childClass.name);
*/

(function(){
    var num = 0;
    window.generateId = function() {
        return num++;
    }
})();
(function() {
    var fields = {}; //maybe defineProperty is better solution to make private fields?
    window.ParentClass = function(name) {
        this.id = generateId();
        fields[this.id] = {name: name};
    }

    $.extend(ParentClass.prototype, {
        getName: function () {
            return fields[this.id].name;
        }
    });
})();
var parentClass = new ParentClass("Ira");
console.log(parentClass.getName());
