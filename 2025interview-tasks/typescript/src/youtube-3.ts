// https://www.youtube.com/watch?v=rLwVcc0-WBU


interface User22 {
    name: string;
    age: number
}

interface UserWithRole extends User22 {
    role: Role;
}

type Role = "admin" | "user";

const admin11: UserWithRole = {
    name: "name",
    age: 30,
    role: "admin"
}


//-------------------------


interface Todo {
    id: number;
    title: string;
    done: boolean;
}

// const createNewTodo = (todo: Todo) => {
//     const id = useId();
//     return ({
//         ...todo, id
//     })
// }

const useId = () => Math.random();

const createNewTodo = (todo: Omit<Todo, 'id'>): Todo => {
    const id = useId();
    return ({
        ...todo, id
    })
}

const test = createNewTodo({title: "title", done: false});


//-------------------------


const obj = {a: 1, b: 2, c: 'a'};

function getValue<T extends object>(obj: T, key: keyof T): T[keyof T] {
    return obj[key];
} //BAD return string | number

function getValue2<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const rest1 = getValue(obj, 'a');
const rest2 = getValue2(obj, 'a');


//-----------------------


interface TotalPriseParams {
    price: number,
    discount: number,
    isInstallment: boolean,
    months?: number
}

type TotalPriceType = (prise: TotalPriseParams) => number

const totalPrice: TotalPriceType = ({price, discount, isInstallment, months}) => {
    return isInstallment ? price * discount / 25 * (months ?? 1) : 0;
}

const price = totalPrice({price: 10000, discount: 25, isInstallment: true, months: 12});


//------------------------------


type TestInput = string | number;

function test2<T extends TestInput>(a: T): T extends string ? number : string {
    return a as any;
}


const r11 = test2("string");
const r12 = test2(1);


function test21(a: TestInput): TestInput extends string ? number : string {
    return a as any;
}

const r31 = test2("string");
const r32 = test2(1);


function test3(a: string): number;
function test3(a: number): string;

function test3(a: TestInput): TestInput {
    if (typeof a === "string") {
        // для string — вернём number
        return a.length; // пример логики
    }
    // для number — вернём string
    return String(a);
}


const r21 = test3("hello");
const r22 = test3(42);

//------------------------------------

type Obj = { key1: string; key2: number; };
type Arr = number[];


type ValueOfObj = ValueOf<Obj>; //return string | number
type ValueOfArr = ValueOf<Arr>; //return number

// type ValueOf<T> = T extends object ? T[keyof T] : (infer T)[];
type ValueOf<T> =
    T extends Array<infer U> ? U :
        T extends object ? T[keyof T] : never;


const a51: ValueOfObj = 'str'
const a52: ValueOfObj = 1
const a53: ValueOfObj = true
const a54: ValueOfArr = 1
const a55: ValueOfArr = 'str'


//---------------------------


interface User100 {
    age: number;
    name: string;
}

// function createAndValidate(name, age) {
//     const newUser = {};
//     if (name.length === 0) {
//         newUser.name = name;
//     }
//     if (age > 18) {
//         newUser.age = age;
//     }
//     return newUser;
// }

type FuncParams = User100[keyof User100]

function createAndValidate(name: User100['name'], age: User100['age']): Partial<User100> {
    const newUser: Partial<User100> = {};
    if (name.length === 0) {
        newUser.name = name;
    }
    if (age > 18) {
        newUser.age = age;
    }
    return newUser;
}

//-----------------------------

interface User101 {
    name: string;
    age: number;
    hobbies: string[];
}

//keyof User101 = 'age' | 'some' | 'hobbies'
type Type1 = Extract<'age' | 'name' | 'a', keyof User101>
//'age' | 'name'

const res101: Type1 = 'age'
const res102: Type1 = 'name'

const res103: Type1 = 'not exist'
const res104: Type1 = 'a'
const res105: Type1 = 'hobbies'

type Type2 = Exclude<'a' | 'b' | User101, string>
//User101


//---------------------------------

function log(data: string[], num: number): boolean {
    console.log(data, num);
    return false;
}


type LogParams = Parameters<typeof log>
type SecondParameterType = Parameters<typeof log>[1]
type LogReturn = ReturnType<typeof log>


//----------------------------


interface ObjType {
    hello: string
    enable: boolean;
    whatAboutNumber: number;

    [key: string]: any
}


const obj2: ObjType = {
    hello: 'world',
    enable: true,
    whatAboutNumber: 0,
    // ... other keys: values
}

const obj3: Record<string, string | boolean | number> = {
    hello: 'world',
    enable: true,
    whatAboutNumber: 0,
    // ... other keys: values
}

console.log('obj', obj2.hello.toLocaleLowerCase())
console.log('obj', obj2.enable);


//------------------------------

async function makeRequest() {
    return await (await fetch("url")).json() as string[]
}

type ResType = Awaited<ReturnType<typeof makeRequest>>;

const res101: ResType

//-----------------------


interface Endpoint {
    method: string;
    url: string;
}

interface ApiObject {
    entity: string;
    endpoints: Record<string, Endpoint>;
}

interface ApiObject2<T extends string> {
    entity: string;
    endpoints: Record<T, Endpoint>;
}

const vtemplateObject: ApiObject2<'getTemplates' | 'postTemplates'> = {
    entity: "vtemplate",
    endpoints: {
        getTemplates: {
            method: "GET",
            url: "vtemplate"
        },
        postTemplates: {
            method: "POST",
            url: "vtemplate"
        }
    }
};

const reportObject: ApiObject2<'getReports'> = {
    entity: "report",
    endpoints: {
        getReports: {
            method: "GET",
            url: "report"
        }
    }
};


//-------------------------------------

// interface AvatarPropsBase {
//     imgSrc: string;
// }
//
// interface AvatarPropsExtended extends AvatarPropsBase {
//     isTeamMember: boolean;
//     yearsOfExperience: number;
// }
//
// type AvatarProps = AvatarPropsBase | AvatarPropsExtended

type AvatarProps = {
    imgSrc: string;
} & (
    | { isTeamMember?: never; yearsOfExperience?: never; }
    | { isTeamMember: true; yearsOfExperience: number; }
    )


const avatarProps1: AvatarProps = {imgSrc: '...'};

const avatarProps2: AvatarProps = {imgSrc: '...', isTeamMember: true};

const avatarProps4: AvatarProps = {imgSrc: '...', isTeamMember: false};


const avatarProps3: AvatarProps = {
    imgSrc: '...',
    isTeamMember: true,
    yearsOfExperience: 3,
};


//-------------------------

//test console

const tmp = {a: 1, b:2}
console.log("tmp=", tmp);
tmp.a = 10;

//в консоле будет {a: 1, b:2} но если сделать expand то будет {a: 10, b:2}
