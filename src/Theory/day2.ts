// Basic types
// string, number, boolean, any, unknown
// Variables
// let, const, try not to use var (use with caution)
// type annotations - let name: string;
// arrays - number[] or Array<number>
// union types - string | number
// type aliases - type Car = {make: string, doorAmount: number}

// === Functions ===
// Repeatable blocks of code that can be called and executed when needed
// In JS they take parameters and return values; in TS we also declare the types of the parameters and of the return value

function testAddition(a: number, b: number): number {
    // we want a function that takes in 2 numbers and returns their sum as a number
    let result = a + b;
    return result;
}

console.log(testAddition(1, 2));
function testAdditionString(a: number, b: number): string {
    // we want a function that takes in 2 numbers and returns their sum as a string
    let result = a + b;
    return result.toString();
}

console.log(testAdditionString(3, 5));

// Template literal: backticks with ${...} insert values into text
let sumOfNumbers = testAddition(10, 10);
console.log(`This is the answer: ${sumOfNumbers}, some text`);

// Old-school way: joining text with +
console.log("This is the answer 2: " + sumOfNumbers + " this is text");

// console.log(testAddition(true, true));

function logMessage(message: string): void {
    console.log(message)
    // return message - this would show an error, because a function with a void return type must not return a value
}

// Optional parameters
// A ? after the parameter name makes it optional, e.g. title?: string
// Inside the function its type is string | undefined

function greetIfElse(name: string, title?: string): string {
    name = name.toUpperCase();
    let displayTitle;
    if (title !== undefined) {
        displayTitle = title;
    } else {
        displayTitle = "Janitor"
    }
    return `Hello ${name}, your title is - ${displayTitle}`
}

// Variant 2: ternary operator (condition ? valueIfTrue : valueIfFalse)

function greetTernary(name: string, title?: string): string {
    name = name.toUpperCase();
    const displayTitle = title === undefined ? "Janitor" : title;
    return `Hello ${name}, your title is - ${displayTitle}`

}

// Variant 3: ?? (nullish coalescing)

function greet(name: string, title?: string): string {
    name = name.toUpperCase();
    return `Hello ${name}, your title is - ${title ?? "Janitor"}`
}

console.log(greetIfElse("John"));
console.log(greetTernary("Jonh"));
console.log(greet("John"));

// ?? only falls back when the value is null or undefined
// (unlike ||, which also falls back on "" and 0)

// Regular functions vs Arrow functions

// Regular function pros: easy to understand, has its own "this"

// Arrow function pros: shorter to write

function addRegular(a: number, b: number): number {
    return a + b;
}

const addArrow = (a: number, b: number): number => {
    return a + b;
}

const addArrowShort = (a: number, b: number): number => a + b;

// console.log(addRegular(1, 2));
// console.log(addArrow(1, 2));
// console.log(addArrowShort(1, 2));

// A type alias for a function shape: takes two numbers, returns a number

type mantOperation = (a: number, b: number) => number;

const add: mantOperation = (a, b) => a + b;
const subtract: mantOperation = (a, b) => a - b;
const divide: mantOperation = (a, b) => a / b;
const multpy: mantOperation = (a, b) => a * b;

const test = (a: number, b: number): string => b.toString();
// console.log(add(3, 4));
// console.log(subtract(3, 4));
// console.log(multpy(3, 4));

function calculate(a: number, b: number, operation: mantOperation): number {
    return operation(a, b);
}

// console.log(calculate(1,2,test))
let calcResult = calculate(10, 10, add);
// console.log(calcResult)


// === Types vs interfaces

// Main difference: interfaces can be "reopened", types cannot


type userType = {
    id: number;
    name: string;
}

interface userInterface {
    id: number;
    name: string;
}

let user1: userType = { id: 1, name: "user 1" };
let user2: userInterface = { id: 2, name: "user 2" };

// Both can be "extended", but use different syntax

// interfaces use the "extends" keyword:

interface Animal { name: string };
interface Dog extends Animal { breed: string }

let myAnimal: Animal = { name: "Random name" };
let myDog: Dog = { name: "dog", breed: "breed" };

// types use & (intersection operator) to combine two shapes into one:

type animalType = { name: string };
type dogType = animalType & { breed: string }

let myDogType: dogType = { name: "Barko", breed: "Digital Dog" }

// Interfaces can be declared multiple times and TS will merge them

interface Window { title: string };
interface Window { tsVersion: string };

let page: Window = { title: "My page", tsVersion: "5.0" };

// type Config = {title:string}
// type Config = {tsVersion: string} // TS will show "Duplicate identifier for 'Config' "


// Intersection types

type A = { a: number };
type B = { b: number };
type C = A & B;

let combined: C = { a: 1, b: 2 }


type hasName = { name: string };
type hasAge = { age: number };
type hasEmail = { email: string };

type fullUser = hasName & hasAge & hasEmail;

let newUser: fullUser = { name: "Martins", age: 90, email: "email@email.com" }
// let incompleteUser: fullUser {name:"Martins", age:30}; requires extra email as well



// === Enums ===

let role = "admin" // plain strings are easy to mistype: "Admin", "ADMIN" or "Administrator" are all different values

// An enum is a fixed, named list of allowed values

enum Role {
    Admin, // 0 (numeric enums count up from 0)
    Editor, // 1
    Viewer // 2
}

let adminRole: Role = Role.Admin;

// console.log("My role")
console.log(adminRole)
// console.log("My role")

// String enums give each member its own string value instead of a number

enum StringRole {
    Admin = "ADMIN",
    Editor = "EDITOR",
    Viewer = "VIEWER"
}
let userRole2: StringRole = StringRole.Admin

console.log(userRole2)

// userRole2 = "ADMIN"
// userRole2 = StringRole.Viewer

function checkRole(a: StringRole): boolean {
    if (a !== StringRole.Admin) {
        return false
    }
    return true
}

console.log("Checking for admin")
console.log(checkRole(userRole2))



// === Classes - "A blueprint for creating objects"
// A type alias only describes what properties an object should have
// A class describes properties AND the behavior (methods)

class Creature {
    name: string;

    money: number = 0;

    private inheritence: number = 1000;


    constructor(name: string, money?: number) {
        this.name = name
        if (money !== undefined) {
            this.money = money;
        }
    }

    // a method - behavior that belongs to every creature

    makeSound(): void {
        console.log(` ${this.name} makes a sound`)
    }
    shareMyInheritence(): void {
        console.log(` i have ${this.inheritence}`)
    }

}

let rex = new Creature("Rex");
let whiskers = new Creature("Whiskers");
let barko = new Creature("Barko", 99);

console.log(rex.name)
console.log(whiskers.name)

rex.makeSound();
whiskers.makeSound();

// Properties are public by default, so we can change money from outside the class.
// inheritence is private, so rex.inheritence = 5 would be an error.
rex.money = 500;


rex.shareMyInheritence()








