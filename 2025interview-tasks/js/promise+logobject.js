//test console

const tmp = {a: 1, b: 2}
console.log("tmp=", tmp);
tmp.a = 10;

//в консоле будет {a: 1, b:2} но если сделать expand то будет {a: 10, b:2}


//---------------------------------

// MacroTasks Queue (Макротаски)
// Примеры: setTimeout, setInterval, setImmediate, I/O, DOM events.
//
// MicroTasks Queue (Микротаски)
// Примеры: Promise.then, queueMicrotask, process.nextTick (в Node.js).


//Call      Stack: A
//Queue MacroTask:
//Queue MicroTask:
//         Output:

//Call      Stack:
//Queue MacroTask: Macro1, Macro2
//Queue MicroTask: Micro1, Micro2, Micro3, Micro4
//         Output: A

//Call      Stack: 10
//Queue MacroTask: Macro1, Macro2
//Queue MicroTask: Micro1, Micro2, Micro3, Micro4
//         Output: A

//Call      Stack: B
//Queue MacroTask: Macro1, Macro2, Macro3
//Queue MicroTask: Micro1, Micro2, Micro3, Micro4, Micro5
//         Output: A, 10

//Call      Stack:
//Queue MacroTask: Macro1, Macro2, Macro3
//Queue MicroTask: Micro1, Micro2, Micro3, Micro4, Micro5
//         Output: A, 10

//Call      Stack: Call1, Call2, B
//Queue MacroTask: Macro1, Macro2, Macro3
//Queue MicroTask: Micro1, Micro2, Micro3, Micro4, Micro5
//         Output: A, 10

//Call      Stack: Call1, Call2
//Queue MacroTask: Macro1, Macro2, Macro3
//Queue MicroTask: Micro1, Micro2, Micro3, Micro4, Micro5
//         Output: A, 10, B

//Call      Stack: Call1
//Queue MacroTask: Macro1, Macro2, Macro3
//Queue MicroTask: Micro1, Micro2, Micro3, Micro4, Micro5
//         Output: A, 10, B

//Call      Stack:
//Queue MacroTask: Macro1, Macro2, Macro3
//Queue MicroTask: Micro1, Micro2, Micro3, Micro4, Micro5
//         Output: A, 10, B

//Call      Stack:
//Queue MacroTask: Macro1, Macro2, Macro3
//Queue MicroTask: Micro2, Micro3, Micro4, Micro5, Micro6
//         Output: A, 10, B, 1

//Call      Stack:
//Queue MacroTask: Macro1, Macro2, Macro3
//Queue MicroTask: Micro4, Micro5, Micro6, Micro7
//         Output: A, 10, B, 1, 3

//Call      Stack:
//Queue MacroTask: Macro1, Macro2, Macro3, Macro4
//Queue MicroTask: Micro5, Micro6, Micro7
//         Output: A, 10, B, 1, 3, 6

//Call      Stack:
//Queue MacroTask: Macro1, Macro2, Macro3, Macro4
//Queue MicroTask: Micro6, Micro7
//         Output: A, 10, B, 1, 3, 6, 11

//Call      Stack:
//Queue MacroTask: Macro1, Macro2, Macro3, Macro4
//Queue MicroTask: Micro7
//         Output: A, 10, B, 1, 3, 6, 11, 2

//Call      Stack:
//Queue MicroTask:
//Queue MacroTask: Macro1, Macro2, Macro3, Macro4
//         Output: A, 10, B, 1, 3, 6, 11, 2, 4

//Call      Stack:
//Queue MicroTask: Micro8
//Queue MacroTask: Macro3, Macro4
//         Output: A, 10, B, 1, 3, 6, 11, 2, 4, 5, 8

//Call      Stack:
//Queue MicroTask:
//Queue MacroTask: Macro3, Macro4
//         Output: A, 10, B, 1, 3, 6, 11, 2, 4, 5, 8, 9

//Call      Stack:
//Queue MicroTask: Micro9
//Queue MacroTask: Macro4
//         Output: A, 10, B, 1, 3, 6, 11, 2, 4, 5, 8, 9, 12

//Call      Stack:
//Queue MicroTask:
//Queue MacroTask: Macro4
//         Output: A, 10, B, 1, 3, 6, 11, 2, 4, 5, 8, 9, 12, 13

//Call      Stack:
//Queue MicroTask:
//Queue MacroTask:
//         Output: A, 10, B, 1, 3, 6, 11, 2, 4, 5, 8, 9, 12, 13, 7

//         Output: A, 10, B, 1, 3, 6, 11, 4, 2, 5, 8, 9, 12, 13, 7
// 11 - Micro5
//  2 - Micro6
//  4 - Micro7


console.log('A');

Promise.resolve()
    .then(() => {
        //Micro1
        console.log("1");
        return Promise.resolve();
    })
    .then(() => {
        //Micro6
        console.log("2")
    });

Promise.reject('e').catch(() => {
    //Micro2
    console.log('3')
});

Promise.resolve()
    .then(() => {
        //Micro3
        throw 'x';
    })
    .catch(() => {
        //Micro7
        console.log('4')
    });

setTimeout(() => {
    //Macro1
    console.log('5')
}, 0);

Promise.resolve().then(() => {
    //Micro4
    console.log('6');
    setTimeout(() => {
        //Macro4
        console.log('7')
    }, 0);
});

setTimeout(async () => {
    //Macro2
    console.log('8');
    await null;
    // Micro8
    console.log('9');
}, 0);
// same
// setTimeout(() => {
//     // Macro2
//     console.log('8');
//     Promise.resolve(null).then(() => {
//         console.log('9');
//     });
// }, 0);



(async function f() {
    console.log('10');
    await Promise.resolve();
    //Micro5
    console.log('11');
})();

new Promise((resolve) => {
    setTimeout(() => {
        //Macro3
        console.log('12');
        resolve();
    }, 0);
}).then(() => {
    //Micro9
    console.log('13');
});

(function F1() {
    (function F2() {
        console.log('B');
    })()  //Call2
})() //Call1
