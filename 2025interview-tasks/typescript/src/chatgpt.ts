// 🧩 Базовые (Junior/Middle)
// 1. Типизация функции
// Напиши типизацию функции так, чтобы она принимала массив чисел
// и возвращала среднее значение
function average(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

// 2. Опциональные поля
// Опиши интерфейс User, где email — необязательное поле

interface User2 {
    name: string;
    age: number;
    email?: string;
}

class User3 {
    name!: string;
    age: number;
}

const user2: User2 = {name: "Alex", age: 25};


// 3. Union и Narrowing
// Напиши функцию, которая принимает string | number
// и возвращает длину строки или число в квадрате
function processValue(value: string | number): number {
    if (typeof value === "string") {
        return value.length;
    } else {
        return value * value;
    }
}

// 4. Generic функция
// Напиши универсальную функцию getFirst, которая возвращает первый элемент массива
function getFirst<T>(arr: T[]): T {
    return arr[0];
}

const num = getFirst([1, 2, 3]); // number
const str = getFirst(["a", "b"]); // string

// 5. Readonly тип
// Сделай объект полностью readonly (вложенные поля тоже)
interface Config {
    port: number;
    db: { host: string; port: number, abc: { qwe: boolean } };
}

type DeepReadonly<T> = T extends Object ? DeepReadonly<T> : Readonly<T>

const config: DeepReadonly<Config> = {} as any;

config.db.abc = false;


// ⚙️ Средний уровень (Middle)
// 6. Тип функции mapObject
// Сделай функцию mapObject типобезопасной
function mapObject<T extends Record<string, any>, R>(
    obj: T,
    fn: <V extends T[keyof T]>(value: V) => R
): { [K in keyof T]: R } {
    const result = {} as { [K in keyof T]: R };
    for (const key in obj) {
        result[key] = fn(obj[key]);
    }
    return result;
}

const res = mapObject({a: 1, b: 2}, (x) => x.toString());
// Ожидается тип: { a: string; b: string }

// 7. Extract / Exclude
type EventType = "click" | "scroll" | "mousemove" | "keydown";

// Сделай тип, который исключает "mousemove"
type WithoutMouseMove = Exclude<EventType, "mousemove">

// 8. Conditional types
// Если T — массив, вернуть тип его элементов, иначе вернуть сам T
type Unpack<T> = T extends (infer K)[] ? K : T

type A2 = Unpack<string[]>; // string
type B2 = Unpack<number>;   // number

const tA: A2;
const tB: B2

// 9. keyof и Record
type User3 = { id: number; name: string; email: string };

// Напиши функцию pick(obj, keys), которая возвращает только выбранные поля

type MyPick2<T, K extends keyof T> = {
    [P in K]: T[P];
};

function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    // const result = {} as Pick<T, K>;
    const result = {} as Pick<T, K>;
    for (const k of keys) {
        result[k] = obj[k];
    }
    return result;
}

const user3 = {id: 1, name: "John", email: "j@j.com"};
const result33 = pick(user3, ["id", "name"]);
// result: { id: number; name: string }

// 10. Утверждение типа и type guards
// Реализуй type guard
function isString(value: unknown): value is string {
    return typeof value === "string"
}

function print(value: unknown) {
    if (isString(value)) {
        console.log(value.toUpperCase());
    }
}

// 🧠 Продвинутые (Senior)
// 11. DeepPartial
// Реализуй тип, делающий все поля и вложенные поля опциональными
type DeepPartial<T> = T extends object ? DeepPartial<T> : Partial<T>
type DeepPartial2<T> = T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : Partial<T>;


type DeepPartial3<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : Partial<T[K]>;
};

interface User5 {
    id: number;
    profile: {
        name: string;
        address: { city: string };
    };
}

// const u: DeepPartial<User5> = { profile: { address: {} } };
const u2: DeepPartial3<User5> = {profile: {address: {}}};

// 12. Extract function return type
// Получи тип возвращаемого значения функции
function makeUser() {
    return {id: 1, name: "Alex"};
}

type User6 = ReturnType<typeof makeUser>

// type ReturnType2<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
type ReturnType2<T> = T extends (...args: any) => infer R ? R : any
// type ReturnType2<T extends (...args: any) => infer R> = R
type User7 = ReturnType2<typeof makeUser>

const u6: User6
const u7: User7

// 13. Tuple to Object
// Преобразуй tuple ['a', 'b', 'c'] в { a: 'a', b: 'b', c: 'c' }
type TupleToObject<T extends readonly string[]> = {
    [K in T[number]]: K;
}
// type TupleToObject2<T extends readonly string[]> = Record<K in T[number], K>;

type Result = TupleToObject<['a', 'b', 'c']>;
type Result2 = TupleToObject2<['a', 'b', 'c']>;

const r: Result;
const r2: Result2;

// 14. Типизация API ответа
// Типизируй ответ API
type User10 = { id: number, name: string };

const fetchUser = async (id: number) => {
    const res = await fetch(`/api/user/${id}`);
    return await res.json() as User10;
};

type FetchUserReturn = Awaited<ReturnType<typeof fetchUser>>;

// 15. Типизация React hook
// Напиши generic hook, возвращающий текущее значение и сеттер
function useState<T>(initialValue: T): [T, (v: T) => void] {
    let value = initialValue;
    const setValue = (v: T): void => {
        value = v;
    };
    return [value, setValue];
}

const [count, setCount] = useState(0);   // count: number
const [text, setText] = useState("hi"); // text: string

setText("1")
setCount(10)



type MyAwaited5<T> = T extends Promise<infer V> ? V : never

const p = new Promise<number>(() => {});

type typeP = typeof p;

let typePP: MyAwaited5<typeP>