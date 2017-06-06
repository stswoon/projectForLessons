//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Classes
//http://javascript.crockford.com/private.html
//http://2ality.com/2016/01/private-data-classes.html
//http://javascript.ru/tutorial/object/inheritance#factory
//https://habrahabr.ru/post/175029/
//https://stackoverflow.com/a/33533611/7860797
//http://javascript.ru/tutorial/object/inheritance#nasledovanie-na-klassah-funkciya-extend
//https://stackoverflow.com/a/33533611/7860797


class UserNative {
    constructor(name, privateName) {
        this.name = name;
    }

    sayHi() {
        console.log(this.name);
    }
}


//test1
{

    let User = (function () {
        var p = {};
        p.privateParam = null;
        function privateFunction() {
            console.log("test");
        }

        class User {
            constructor(name, privateName) {
                this.name = name;
                p.privateParam = privateName;
            }

            sayHi() {
                console.log(this.name);
                privateFunction();
                console.log(p.privateParam);
            }
        }

        return User;
    }());
    let user = new User("q", "1");
    user.sayHi();
    let user2 = new User("w", "2");
    user2.sayHi();
    user.sayHi();
}

//test2
{
    // class Animal {
    //     constructor(name) {
    //         this.name = name;
    //     }
    // }
    // function Rabbit(name, privateParam) {
    //     // вызвать конструктор родителя,
    //     // получить родительский объект в me
    //     var me = Animal(name);
    //     // добавить приватную переменную
    //     var pp = privateParam;
    //     /* добавить новые методы к me */
    //     me.getJumps = function() { console.log(pp) };
    //     // поставить правильное свойство конструктора
    //     // (делаем вид, что объект создали мы, а не Animal)
    //     me.constructor = arguments.callee;
    //     return me;
    // }
    // console.log("test2-------");
    // let user = new Rabbit("rabbit1","1");
    // user.sayHi();
    // let user2 = new Rabbit("rabbit2","2");
    // user2.sayHi();
    // user.sayHi();

}

//test3
{
    var myclass = function () {
        // Internal Self
        var self = this;
        // Private function
        self.myfunction = function () {
            console.log('wassup');
        };
        // Private Fields
        self.field1 = undefined;

        // Class Instance
        self.me =
            {
                // Constructor
                construct: function () {
                    // Create field
                    self.field1 = arguments[0];

                    // Call Private method
                    self.myfunction();

                    // Remove construct
                    delete self.me.construct;

                    // Return correct this.
                    return self.me;
                },

                // Public function
                render: function () {
                    console.log(self.field1);
                }

            };

        // Create class and return it.
        return self.me.construct.apply(self.me, arguments);
    };

// Create Class
    var mc = new myclass('1');
    mc.render();
    var mc2 = new myclass('2');
    mc2.render();
    mc.render();
}

//test4
{
    //https://stackoverflow.com/a/33533611/7860797
    // let Person = (function () {
    //     let privateProps = new WeakMap();
    //
    //     class Person {
    //         constructor(name) {
    //             this.name = name; // this is public
    //             privateProps.set(this, {age: 20}); // this is private
    //         }
    //         greet() {
    //             // Here we can access both name and age
    //             console.log(`name: ${this.name}, age: ${privateProps.get(this).age}`);
    //         }
    //     }
    //
    //     return Person;
    // })();
    //
    // let joe = new Person('Joe');
    // joe.greet();


    let Car = (function () {
        let privateProps = new WeakMap(); //to as function
        function pp(bind, set) {
            if (set) privateProps.set(bind, set);
            return privateProps.get(bind)
        };
        class Car {
            constructor(name, speed) {
                this.name = name;
                // privateProps.set(this, {speed: speed});
                pp(this, {});
                pp(this).speed = speed;
            }

            name() {
                console.log(this.name);
            }

            speed() {
                console.log(pp(this).speed)
            }
            addSpeed() {
                pp(this).speed = 30;
            }
        }
        return Car;
    })();

// Create Class
    var mc = new Car('lada', 10);
    mc.speed();
    var mc2 = new Car('bmw', 20);
    mc2.speed();
    mc.speed();

    mc2.addSpeed();
    mc2.speed();

    class MyCar extends Car {
        speed() {
            super.speed();
            console.log("failed")
        }
    }

    let mc3 = new MyCar("test", 0);
    mc3.speed();
}