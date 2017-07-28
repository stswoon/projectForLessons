//https://stackoverflow.com/a/32749533/7860797

//test1
{
    function test1() {
        console.log("---test1");

        class MyError extends ExtendableError{}

        var myerror = new MyError("ll");
        console.log(myerror.message);
        console.log(myerror instanceof Error);
        console.log(myerror instanceof ExtendableError);
        console.log(myerror instanceof MyError);
        console.log(myerror.name);
        console.log(myerror.stack);
    }

    class ExtendableError extends Error {
        constructor(message) {
            // super();
            // this.message = message;
            // this.stack = (new Error()).stack;
            // this.name = this.constructor.name;
            super(message);
            this.name = this.constructor.name;
            if (typeof Error.captureStackTrace === 'function') {
                Error.captureStackTrace(this, this.constructor);
            } else {
                this.stack = (new Error(message)).stack;
            }
        }
    }
}

//test2
{
    function test2() {
        console.log("---test2");

        class MyError1 extends ExtendableError{}
        class MyError2 extends ExtendableError{}

        try {
            throw new MyError1("test1");
        }
        catch (e) {
            if (e instanceof MyError1) {
                throw new MyError2("test2");
            }
        }
    }

    class ExtendableError extends Error {
        constructor(message) {
            super(message);
            this.name = this.constructor.name;
            if (typeof Error.captureStackTrace === 'function') {
                Error.captureStackTrace(this, this.constructor);
            } else {
                this.stack = (new Error(message)).stack;
            }
        }
    }
}