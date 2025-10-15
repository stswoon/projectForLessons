//https://www.youtube.com/watch?v=f0hz-nNB7vI

const X = {a: 1, b: 2};

function getProp<T>(obj: T, key: keyof T) {
    return obj[key];
}

getProp(X, 'a')
getProp(X, 'notexist')

function getProp2<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

getProp2(X, 'a')
getProp2(X, 'notexist')


//------------------


interface User {
    id: number;
    name: string;
}

type MyMap<K extends string | number, V> = {
    [key in K]: V
}

type MyPartial<T> = {
    [K in keyof T]?: T[K]
}

const user12: MyPartial<User> = {
    name: "test"
}


//----------------------


interface Post {
    id: number;
    body: string
}

const p0: Post = {id: 1, body: "test"};

function updateEntity<T extends object>(
    entity: T,
    update: Partial<T>
): T {
    return {...entity, ...update};
}

const p1 = updateEntity(p0, {body: "test2"})
const p2 = updateEntity(p0, {age: 42})


//---------------------

type Status = "open" | "closed";

type WithBrackets<T extends string> = `[${T}]`
type WithBrackets2<T extends string> = { [K in T]: `[${K}]` }[T]

type StatusWithBrackets = WithBrackets<Status>;
type StatusWithBrackets2 = WithBrackets2<Status>;

const v: StatusWithBrackets = "open"
const v2: StatusWithBrackets2 = "open"
