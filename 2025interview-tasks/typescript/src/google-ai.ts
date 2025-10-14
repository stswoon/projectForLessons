// Задача 1: Типизация объектов и функций
// Напишите функцию getFullName, которая принимает объект с именем и фамилией и возвращает полное имя в виде строки.
// Типизируйте входной параметр и возвращаемое значение.

// Объявите интерфейс для объекта пользователя
interface User {
    firstName: string;
    lastName: string;
}

// Напишите функцию getFullName
// function getFullName(...) {
//   ...
// }

const user = {
    firstName: "Иван",
    lastName: "Иванов"
};

const fullName = getFullName(user); // Должно работать

const brokenUser = {
    firstName: "Петр"
};

getFullName(brokenUser); // Должно вызывать ошибку компиляции


// Напишите функцию getFullName
function getFullName(user: User): string {
    return user.firstName + " " + user.lastName
}


//------------------------------------------


// Задача 2: Опциональные свойства и объединения типов
// Создайте интерфейс Product с обязательными свойствами id и name, а также опциональным свойством description.
// Затем напишите функцию logProduct, которая принимает Product и выводит его свойства в консоль.
// Добавьте в функцию проверку на наличие description.
interface Product {
    id: number;
    name: string;
    description?: string; // Сделайте это свойство опциональным
}

// function logProduct(product: Product): void {
//     // Добавьте проверку наличия description
// }

const product1 = {id: 1, name: "Ноутбук"};
const product2 = {id: 2, name: "Мышь", description: "Беспроводная оптическая мышь"};

logProduct(product1);
logProduct(product2);

function logProduct(product: Product): void {
    // console.log(product);
    if (product.description) {
        console.log(product)
    } else {
        console.log({...product, description: "no description"});
    }
}







//----------------------------------------------------------




// Задача 3: Дженерики и типизация массивов
// Напишите дженерик-функцию reverseArray, которая принимает массив любого типа и возвращает новый массив, элементы которого расположены в обратном порядке.
function reverseArray<T>(array: T[]): T[] {
    // Реализуйте функцию
    return [...array].reverse(); // Пример реализации
}

const numbers = [1, 2, 3];
const reversedNumbers = reverseArray(numbers); // reversedNumbers будет иметь тип number[]

const strings = ["a", "b", "c"];
const reversedStrings = reverseArray(strings); // reversedStrings будет иметь тип string[]




//-----------------------------------------------------------


// Задача 4: Использование утилитных типов
// Используйте встроенные утилитарные типы Partial, Readonly и Pick.
//     Создайте тип PartialUser на основе интерфейса User из первой задачи, где все свойства будут опциональными.
//     Создайте тип ReadOnlyUser, где все свойства будут доступны только для чтения.
//     Создайте тип UserNameOnly, который будет содержать только свойство firstName.

interface User {
    firstName: string;
    lastName: string;
}

// 1. Создайте тип PartialUser
type PartialUser = Partial<User>;

// 2. Создайте тип ReadonlyUser
type ReadonlyUser = Readonly<User>;

// 3. Создайте тип UserNameOnly
type UserNameOnly = Pick<User, 'firstName'>;






//-------------------------------------------------------------

// Задача 5: Дженерики и условные типы
// Напишите условный тип IsArray<T>, который возвращает true, если тип T является массивом, и false в противном случае.
type IsArray<T> = T extends any[] ? true: false;

type A = IsArray<string[]>; // true
type B = IsArray<number>; // false

const testA: A
const testB: B









//-----------------------------------------------------------


// Задача 6: Объектно-ориентированное программирование (ООП)
// Реализуйте систему управления заказами, используя классы и интерфейсы.
//     Определите интерфейс IOrder, который будет содержать свойства id, items (массив товаров) и totalPrice.
//     Создайте класс Product, который будет реализовывать интерфейс, описывающий товар (id, name, price).
//     Создайте класс Order, который будет реализовывать IOrder. Конструктор должен принимать массив товаров, а также иметь метод calculateTotal для расчёта общей стоимости.
// Интерфейс для товара
interface IProduct {
    id: number;
    name: string;
    price: number;
}

// Интерфейс для заказа
interface IOrder {
    id: number;
    items: IProduct[];
    totalPrice: number;
}

// Класс товара
class Product implements IProduct {
    // id: number;
    // name: string;
    // price: number;

    constructor(public id:number, public name: string, public price: number) {
        this.id = price;
        this.name = name;
        this.price = price;
    }

// Реализуйте класс
}

// Класс заказа
class Order implements IOrder {
    id: number;
    items: IProduct[];
    totalPrice: number;


    constructor(items: IProduct[]) {
        this.id = Math.random();
        this.items = items;
        this.totalPrice = items.reduce((acc, item) => item.price + acc, 0);
    }

// Реализуйте класс с методом calculateTotal
}