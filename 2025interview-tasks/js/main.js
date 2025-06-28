//eventEmitter

class EventEmitter {
    #callbackMapping = {};

    subscribe(eventName, callback) {
        if (!this.#callbackMapping[eventName]) {
            this.#callbackMapping[eventName] = [];
        }
        this.#callbackMapping[eventName].push(callback);
    }

    unsubscribe(eventName, callback) {
        this.#callbackMapping[eventName] =
            this.#callbackMapping[eventName].filter(callbackItem => callbackItem !== callback);
    }

    fire(eventName, payload) {
        this.#callbackMapping[eventName].forEach(callback => {
            callback(payload);
        });
    }
}

const eventEmitter = new EventEmitter();
const callback = (payload) => console.log(`Callback catch event "test" with payload: ${JSON.stringify(payload)}`)
eventEmitter.subscribe("test", callback);
eventEmitter.fire("test", {data: "testData"});
eventEmitter.unsubscribe("test", callback);
eventEmitter.fire("test", {data: "shouldNotBeLogged"});

// Promise.all

function promiseAll(...promises) {
    return new Promise((resolve, reject) => {
        const result = Array(promises.length).fill(undefined);
        let count = 0;
        for (let i = 0; i < promises.length; i++) {
            promises[i]
                .then(data => {
                    result[i] = data;
                    count++;
                    if (count === promises.length) {
                        resolve(result);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        }
    });
}

const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(3), 1000));
promiseAll(Promise.resolve(1), Promise.resolve(2), timeoutPromise).then(results => {
    console.log("promiseAll results:", results);
})
promiseAll(timeoutPromise, Promise.reject("testReject")).catch(cause => {
    console.log("promiseAll rejects:", cause);
})

