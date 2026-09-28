// Day recap
// Typed functions
// optional parameters with ? and the ?? fallback syntax
// arrow functions - shorter syntax
// function types - type MathOP = (x:number, y: number) => number
// interfaces - describe object shapes (blueprint) and the extends keyword
// types vs interfaces
// intersection types
// Enums
// Classes
// Private - protecting the internal class state


// === Generics ===

// With any we lose the type information, and writing one function per type is repetitive
function identity(value: any): any {
    return value
}

function identityNumber(value: number): number { return value };
function identityString(value: string): string { return value };

// Generics solve this problem: one function that works for many types

function identityV2<T>(value: T): T {
    return value
}

identityV2(30) // T is a number and we return number
identityV2("hello") // T is a string - we return a string

// <T> is just a naming convention (T for Type, K for Key, V for Value); any name works

function wrapInArray<K>(value: K): K[] {
    // create a new array that contains the value
    return [value]
}
wrapInArray(30)
wrapInArray("hello again")


// Golden rule
// Use generics when the type of the output depends on the type of the input


// === Generic interfaces ===


interface ApiResponse<Type> {
    data: Type,
    status: number
}

const userResponse: ApiResponse<{ id: number, name: string }> = {
    data: {
        id: 1,
        name: "Alice"
    },
    status: 200
}

const errorResponse: ApiResponse<string> = {
    data: "Not found",
    status: 404
}

// === A simple container ===

interface Box<T> {
    content: T
}

let stringBox: Box<string> = { content: "hello" };
let numberBox: Box<number> = { content: 42 };


// === Generic classes ===

export default class Storage<T> {
    private items: T[] = [];
    private defaultItem: T;

    constructor(item: T) {
        this.defaultItem = item;
    }

    addItem(item: T): void {
        this.items.push(item)
    }

}

let theStorage = new Storage<string>("Default")
theStorage.addItem("Hello");

// theStorage.addItem(24) // TS shows an error, because 24 is not a string




// === Type Narrowing ===

type StringOrNumber = string | number;

let someVal: StringOrNumber = "Hello string"

if (typeof someVal === "string") {
    console.log(someVal.toUpperCase())
}

type Dog = { bark: () => void }
type Cat = { zoomies: () => void }

function makeSound(animal: Dog | Cat | Duck){

    console.log(animal)
    console.log(typeof animal)

    // if ("bark" in animal){
    //     animal.bark();
    // } else {
    //     animal.zoomies()
    // }
    // The "in" operator checks if a property exists on the object (narrowing).
    // Only a Duck has both bark and zoomies, so this branch runs only for a Duck.
    if ("bark" in animal && "zoomies" in animal){
        animal.bark()
        // @ts-ignore hides the error on the next line - use it sparingly
        animal.zoomies()
    }
}

const barko: Dog = {
    bark: () => console.log("Barko is here")

}
makeSound(barko)

// === Intersection types with "in" ===


type Duck = Dog & Cat

const duck:Duck = {
    bark: () => console.log("Woof"),
    zoomies: () => console.log("Eat barko's lunch")
}

makeSound(duck)


// === keyof operator ===

// keyof takes an object type and gives back a union of its property names as a string literal type

type Person = { name:string, age:number};
let p1: Person = {name:"Martins", age: 30}

console.log(p1.name)
// console.log(p1.grade);

// With any and string, TS cannot check the key or the return type (see getValueBetter below)
function getValue(obj:any, key:string){
    return obj[key]
}


type keysa = keyof Person; // "name" | "age"
// types exist only at compile time, so we cannot run console.log(keysa)

// console.log(Object.keys(p1));

function getPersonValue(p:Person, key: keysa){
    return p[key]
}

console.log(getPersonValue(p1, "name")) // this is fine
// console.log(getPersonValue(p1, "lecturer"))

// === Generics + keyof ===

function getValueBetter<Type, Keys extends keyof Type>(obj: Type, key:Keys){
    return obj[key]
}


// <Type, Keys extends keyof Type> -- these are two type parameters
// "Type" is the type of the object
// Keys is constrained with extends keyof Type, meaning
// Keys must be one of the actual key names of Type


let personName = getValueBetter(p1,"name")
console.log(personName)

// let test = getValueBetter(p1, "credibility")


// === Type assertions - as and ! ===

let value: unknown = "hello";
let strValue = value as string;
console.log(strValue)


// ! non-null assertion

let maybeName: string | undefined;
// ! tells the compiler "trust me, this is not null/undefined".
// That is wrong here: maybeName is actually undefined, so this throws at runtime
console.log(maybeName!.toUpperCase())










