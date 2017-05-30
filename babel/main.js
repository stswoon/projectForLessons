// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/async_function
// https://habrahabr.ru/post/282477/
// https://ponyfoo.com/articles/understanding-javascript-async-await

//test1
{
    function test1() {
        console.log("---test1");
        add(3, 4).then(v => console.log(v));
    }

    async function add(a, b) {
        var a = resolveAfter2Seconds(a);
        var b = resolveAfter2Seconds(b);
        return await a + await b;
    }

    function resolveAfter2Seconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 2000);
        });
    }
}

//test2
{
    function test2() {
        console.log("---test2");
        addLong(5, 6).then(v => console.log(v));
    }

    async function addLong(a, b) {
        var a = await resolveAfter2Seconds(a);
        var b = await resolveAfter2Seconds(b);
        return a + b;
    }

    function resolveAfter2Seconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 2000);
        });
    }
}

//test3
{
    function test3() {
        console.log("---test3");
        asyncFunction()
            .then(() => console.log("no errors"))
            .catch((e) => console.error(e))
            .then(() => console.log('WA for finally'));
    }

    function errorAfter2Seconds() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("my error"));
            }, 2000);
        });
    }

    async function asyncFunction() {
        try {
            await errorAfter2Seconds();
        } catch (e) {
            e.message += " catched in asyncFunction";
            throw e;
        }
    }
}

//test4
{
    async function test4()
    //async return Promise so you need to handle in in click but for this test I only need to log for education purpose
    {
        console.log("---test4");
        asyncFun().then(x => console.log(`0: x=${x}`));
        console.log("1: ", asyncFun());
        console.log("2: ", await asyncFun()); //await not working without async
        console.log("3: ", await syncFun());
        console.log("4: ", syncFun());
    }

    async function asyncFun() {
        var value = await Promise
            .resolve(1)
            .then(x => x * 3)
            .then(x => x + 5)
            .then(x => x / 2);
        return value;
    }

    function syncFun() {
        return 10;
    }
}

//test5
{
    function test5() {
        console.log("---test5");
        concurrent().then((array) => console.log("array=", array));
    }

    async function concurrent() {
        var [r1, r2, r3] = await Promise.all(
            [resolveAfterSeconds(1), resolveAfterSeconds(2), resolveAfterSeconds(3)]);
        return [r1, r2, r3];
    }

    function resolveAfterSeconds(sec) {
        return new Promise(resolve => setTimeout(() => resolve(sec), sec * 1000));
    }
}

//test6
{
    function test6() {
        console.log("---test6");
        asyncFunction();
    }

    async function asyncFunction() {
        await resolveAfter2Seconds();
        setTimeout(() => console.log("test6-2"), 2000) //didn't log almost in same time as "test6-1" so it's work not the same way as CompletableFuture
    }

    function resolveAfter2Seconds() {
        return new Promise(resolve => setTimeout(() => {
            console.log("test6-1");
            resolve();
        }, 2000));
    }
}