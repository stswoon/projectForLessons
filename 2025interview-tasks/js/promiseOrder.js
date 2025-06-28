// promise order

console.log('start')
Promise.resolve(1).then((res) => {
    console.log(res)
})
Promise.resolve(2).then((res) => {
    console.log(res)
})
console.log('end')
// start, end, 1, 2

console.log('start');
const promise1 = Promise.resolve().then(() => {
    console.log('promise1');
    const timer2 = setTimeout(() => {
        console.log('timer2')
    }, 0)
});
const timer1 = setTimeout(() => {
    console.log('timer1')
    const promise2 = Promise.resolve().then(() => {
        console.log('promise2')
    })
}, 0)
console.log('end');
// start, end, promise1, timer1, promise2, timer2

const promise = new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
        console.log("timerStart");
        resolve("success");
        console.log("timerEnd");
    }, 0);
    console.log(2);
});
promise.then((res) => {
    console.log(res);
});
console.log(4);
//1, 2, 4, timerStart, timerEnd, success(!)

console.log('script start');
setTimeout(function () {
    console.log('setTimeout');
}, 0);
Promise
    .resolve()
    .then(function () {
        console.log('promise1');
        1
    })
    .then(function () {
        console.log('promise2');
    });
console.log('script end');
//script start, script end, promise1, promise2, setTimeout


console.log('A');
setTimeout(() => {
    console.log('B');
}, 0);
Promise.resolve().then(() => {
    console.log('C');
});
console.log('D');
//A, D, C, B

console.log('1');
setTimeout(() => {
    console.log('2');
}, 0);
Promise.resolve().then(() => {
    console.log('3');
    return Promise.resolve();
}).then(() => {
    console.log('4');
});
console.log('5');
//1, 5, 3, 4, 2

console.log('Start');
setTimeout(() => {
    console.log('Timeout 1');
    Promise.resolve().then(() => {
        console.log('Inner Promise 1');
    });
}, 0);
Promise.resolve().then(() => {
    console.log('Promise 1');
});
setTimeout(() => {
    console.log('Timeout 2');
}, 0);
console.log('End');
//Start, End, Promise 1, Timeout 1, Inner Promise 1(!), Timeout 2

console.log('Start');
setTimeout(() => {
    console.log('Timeout A');
    Promise.resolve().then(() => {
        console.log('Promise inside Timeout A');
    });
}, 0);
Promise.resolve().then(() => {
    console.log('Promise B');
    setTimeout(() => {
        console.log('Timeout inside Promise B');
    }, 0);
});
//Start, Promise B, Timeout A, Promise inside Timeout A, Timeout inside Promise B

console.log('Init');
setTimeout(() => {
    console.log('Timeout 1');
    Promise.resolve().then(() => {
        console.log('Promise in Timeout 1');
    });
}, 0);
Promise.resolve()
    .then(() => {
        console.log('Promise 1');
    })
    .then(() => {
        console.log('Promise 2');
        setTimeout(() => {
            console.log('Timeout 2');
            Promise.resolve().then(() => {
                console.log('Promise in Timeout 2');
            });
        }, 0);
    });
console.log('Done');
//Init, Done, Promise 1, Promise 2, Timeout 1, Promise in Timeout 1, Timeout 2, Promise in Timeout 2
