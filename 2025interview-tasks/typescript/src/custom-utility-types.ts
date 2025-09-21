console.log("Hello from TypeScript!");

// type MyType = { a: string, b: number };
//
// let myType: MyType = {
//     a: '1',
//     b: 1
// }

interface TypeA {
    a: string;
    b: {
        c: number;
    }
}

type TypeAReadonly = Readonly<TypeA>;


type MyReadonly<T> = {
    readonly [Key in keyof T]: T[Key];
};

type TypeAMyReadonly = MyReadonly<TypeA>;

type MyReadonlyDeep<T> = {
    readonly [K in keyof T]: T[K] extends object ? MyReadonlyDeep<T[K]> : T[K];
};

type TypeAMyReadonlyDeep = MyReadonlyDeep<TypeA>;

//проблемы с отображением типов в идее, поэтому нужно сделать по другому хотя и работает все верно

type MyReadonlyDeep2<T> = T extends object
    ? { readonly [K in keyof T]: MyReadonlyDeep2<T[K]> }
    : T;

// Для «красивого» отображения в IDE — helper, который сплющивает тип.
type Expand<T> = T extends infer O
    ? { [K in keyof O]: O[K] }
    : never;


type TypeAMyReadonlyDeep2 = MyReadonlyDeep2<TypeA>;

type Pretty = Expand<TypeAMyReadonlyDeep2>;

//не работает - выводит как у меня


// -------------- Promise

type promise0 = Promise<void>;
type promise1 = Promise<number>;
type promise2 = Promise<Promise<Promise<number>>>;

type promise1awaited = Awaited<promise1>
let p1a: promise1awaited = 1;


let promiseTest = new Promise<number>((resolve, reject) => {

})

type MyAwaited<T> = T extends (resolve: infer V, ...args: any) => any ? V : never;
type promise1myAwaited = MyAwaited<promise1>
let p1myA: promise1myAwaited = 1;

type MyAwaited2<T> = T extends Promise<infer V> ? V : never
type promise1myAwaited2d = MyAwaited2<promise1>
let p1myA2: promise1myAwaited2d = 1;

type promise0myAwaited2d = MyAwaited2<promise0>
let p0myA2: promise0myAwaited2d = 1;


//---

type promise2awaited = Awaited<promise2>
let p2a: promise1awaited = 1;


type MyAwaitedDeep<T> =
    T extends Promise<infer V>
        ? MyAwaitedDeep<V>
        : T
type promise2myAwaitedDeep = MyAwaitedDeep<promise2>
let p2myADeep: promise2myAwaitedDeep = 1;

