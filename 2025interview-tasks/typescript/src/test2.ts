const arr = [1, 2, 3, null]

const arr2 = arr.filter(v => !!v);

function isNumberGuard(v: number | null): v is number {
    return typeof v === "number";
    // return !isNaN(v);
}

const arr3 = arr.filter(isNumberGuard);


//----------------------------


const example1Data = [
    {name: "John", age: 22},
    {name: "Jane", age: 25},
];
// Result
// {
//   "John": 22,
//   "Jane": 25
// }

type AccType = Record<string, number>;
const result = example1Data.reduce<AccType>(
    (acc, item) => {
        // console.log("item=", item);
        acc[item.name] = item.age;
        return acc;
    },
    {}
);
console.log("result=", result)

// function myReduce<K>(arr: K[], callback: (prevV: K, currValue: K) => K): K;
function myReduce<T, K>(arr: K[], callback: (prevV: T, currValue: K) => T, initValue?: T): T {
    // const hasInit = initValue !== null && initValue !== undefined;
    //
    // let prevValue: T | K = hasInit ? initValue : arr[0];
    //
    // for (let i = hasInit ? 0 : 1; ++i; i < arr.length) {
    //     prevValue = callback(prevValue as T, arr[i]);
    // }
    let prevValue = initValue;
    arr.forEach((item, index) => {
        if (index === 0 && !prevValue) {
            prevValue = item as any as T;
        } else {
            prevValue = callback(prevValue as T, item);
        }
    });
    return prevValue as T;
}

const result2 = myReduce<AccType, typeof example1Data[0]>(
    example1Data,
    (acc, item) => {
        console.log("item=", item);
        acc[item.name] = item.age;
        return acc;
    },
    {}
);
console.log("result2=", result2)


const arrTest = [1, 2, 3];
const result3 = arrTest.reduce((acc, item) => acc + item);
const result4 = myReduce<number, number>(arrTest, (acc, item) => acc + item);
console.log("result3=", result3);
console.log("result4=", result4);
