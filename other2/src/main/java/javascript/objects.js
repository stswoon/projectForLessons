var getSetObject = {
    test1: [1, 2, 3],
    get height() {
        return this.test1.length;
    },
    get test1() {
        return [5, 6, 7];
    },

    test2: 'qqq',
    get test2() {
        return this.test2;
    },

    _test4: '111',
    get test4() {
        return this._test4;
    }

};
//console.log(getSetObject);
Object.defineProperty(getSetObject,
    "_test3", {
        get: function () {
            return this.test3;
        },
        set: function (value) {
            this.test3 = value;
        }
    }
);

//console.log(getSetObject.height);
//console.log(getSetObject.test1);
//getSetObject.test1 = [0, 8];
//console.log(getSetObject.test1);
//
////console.log(getSetObject.test2);//endless recursion
//
//console.log(getSetObject.test3);
//getSetObject.test3 = 'www';
//console.log(getSetObject.test3);
//console.log(getSetObject._test3);
//getSetObject._test3 = 'bbb';
//console.log(getSetObject._test3);
//console.log(getSetObject.test3);
//
//console.log(getSetObject.test4);
//getSetObject.test4 = '222'; //property is redonly because there is no set methid
//console.log(getSetObject.test4);


