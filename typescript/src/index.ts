class Person {
    private name: string;

    constructor(name) {
        this.name = "Name is " + name;
    }

    public getName() {
        return this.name;
    }

    private getPrivateName() {
        return "private: " + this.name;
    }

    protected getProtectedName() {
        return "protected: " + this.name;
    }
}

class John extends Person {
    public constructor() {
        super("John")
    }
}

class Brown extends Person {
    public constructor() {
        super("Brown")
    }
}

class Robot {
    public getName() {
        return "Robot";
    }
}

var person: Person = new John();
console.log(person.getName());
person = new window["Brown"];
console.log(person.getName());
person = new Robot();
console.log(person.getName());

let test = new John()