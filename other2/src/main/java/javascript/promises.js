//https://scotch.io/tutorials/javascript-promises-for-dummies

'use strict';

// global flag

var flag = 0;
var flag_showOff = 0;

//promise creation

var willIGetNewPhone = function () {
    return new Promise(
        function (resolve, reject) {
            if (flag == 1) {
                var phone = {
                    brand: 'Samsung',
                    color: 'black'
                };
                resolve(phone);
            } else if (flag == 2) {
                var reason = new Error('mom is not happy');
                reject(reason);
            }
        }
    );
};

var showOff = function (phone) {
    return new Promise(
        function (resolve, reject) {
            if (flag_showOff == 1) {
                phone.newAttr = "newAttr";
                resolve(phone);
            } else if (flag_showOff == 2) {
                var reason = new Error('error in showOff');
                reject(reason);
            }
        }
    );
};


//use promises

var askMom = function () {
    setTimeout(() => {
        console.log("----- first call");
        flag = 1;
        willIGetNewPhone()
            .then(function (fulfilled) {
                console.log(fulfilled);
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }, 0);

    setTimeout(() => {
        console.log("----- second call");
        flag = 2;
        willIGetNewPhone()
            .then(function (fulfilled) {
                console.log(fulfilled);
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }, 1000);

    setTimeout(() => {
        console.log("----- chain");
        flag = 1;
        flag_showOff = 2;
        willIGetNewPhone()
            .then(function (fulfilled) {
                console.log("a" + fulfilled);
                console.log(fulfilled);
            })
            .catch(function (error) {
                console.log("0" + error.message);
            })
            .then(function (fulfilled) {
                return showOff(fulfilled);
            })
            .catch(function (error) {
                console.log("1" + error.message);
            })
            .then(function (fulfilled) {
                console.log("b" + fulfilled);
            })
            .catch(function (error) {
                console.log("2" +error.message);
            });
    }, 2000);


    setTimeout(() => {
        console.log("----- all");
        flag = 1;
        flag_showOff = 1;
        Promise.all([willIGetNewPhone(), showOff({})]) //or race for the first
            .then(function (results) {
                console.log(results[0]);
                console.log(results[1]);
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }, 3000);
};

askMom();