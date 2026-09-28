// Declaring variables

// In plain JavaScript: let name = "Martins";
// In TypeScript we add a type annotation (: string)
let name: string = "Martins"


// name = 42;

// console.log(name)

// var, let, const

// var - the old-school way; let was introduced to fix some of its problems

// var age = 25;
// var age = 30;

// let age = 25;
// age = 30;

// console.log(age)

// Scope: var ignores the block { }, so "leaked" is visible outside the if.
// let stays inside the block it was declared in.
if (true) {
    var leaked = "I escape";
    let contained = "staying"
}

console.log(leaked);
// console.log(contained)

// Hoisting: var is moved to the top of its scope, so using it early gives undefined.
// let cannot be used before its declaration and throws an error instead.
// console.log(hoistingVar);
// var hoistedVar = "im late"

// console.log(hoistedLet);
// let hoistedLet = "im also late"


const superRandomName: string = "Marti"
// superRandomName = "Mart"

// const stops the variable from being reassigned,
// but the contents of an object can still change.
const randomData = { name: "Martins", age: 25 }
randomData.age = 30;

console.log(randomData)

// var - avoid it unless you know what you are doing.
// let - use this to declare variables that might need to change values
// const - use for values that never get reassigned

// Common basic types
// string - any text, can use "", '', `` (backticks)
// number - any number, integer or float
// boolean - true or false

// let namee: string = "Martins";
// console.log(namee)

// namee = "John"
// console.log(namee)

// let myNumber:number = 5;
// console.log(myNumber);

// myNumber = 5.5;
// console.log(myNumber);



// Type: any - removes the type checking powers, so avoid it

let any_value: any = "Hello";
any_value = 10;
console.log(any_value)
any_value = true;
console.log(any_value)

// Type: unknown - this is safer, because it requires a type check before using the value

// let unknown_value:unknown = "unknown name";
let unknown_value: unknown = 7;
// unknown_value.toUpperCase();
console.log(typeof unknown_value)


//  if statements
// if (condition){
//    do something
// } else {
//    do something else 
// }

// if (typeof unknown_value === "string"){
//     console.log(unknown_value.toUpperCase())
// } else {
//     console.log("this is not a string")
// }

// Operators : = vs == vs ===

//  =   assignment operator     -> assigns a value
//  ==  loose equality operator -> compares values, converting types if needed (coerces)
//  === strict equality operator -> compares values AND types

// console.log("loose equality operation")
// console.log(1 == "1");
// console.log(1 === "1")

// console.log(1 + "1"); // "11" (a string, because 1 is converted to text)

// console.log("one " + "two")

// console.log(10 - "2");


// Arrays

let number1: number = 1;
let number2: number = 1;
let number3: number = 1;

// This is hard to read and maintain when we have many values, so we use an array instead

let number_array: number[] = [1, 2, 3, 4, 5];
let string_array: string[] = ["Apple", "Banana", "Cherry"];

console.log(number_array)
console.log(number_array[0])

let student1_score: number = 72;
let student2_score: number = 99;
let student3_score: number = 9;


const two_student_avarage = (student1_score + student2_score) / 2;

// if (student1_score > student2_score && student1_score > student3_score ...)

let scores: number[] = [72, 45, 95, 60, 38]

let total = 0;
let highest = 0;

for (const score of scores) {
    total += score;
    if (score > highest) {
        highest = score;
    }
}

const average = total / scores.length



// Union types
// A union type allows a variable to hold more than one type, using the pipe | operator

let id: number | string = 12;

id = 123;
id = "abc-123"

// A union value needs a type check before use, because TypeScript does not know which type it holds right now

// Type aliases - give a type a reusable name

type userId = number | string;

let userId1: userId = 123;
let userId2: userId = "user123";

// Object type aliases
// They define object shapes (blueprints)

type CarID = number | string;

type Car = {
    make: string;
    doorAmount: number;
    readonly id: CarID; // readonly means we cannot change the value
    hasSpoiler?: boolean; // optional property
}


// quick reference
// string
// number
// boolean
// any
// unknown 


// let (should use over the var) can be reassigned
// const, cannot be reassigned


// Most common naming conventions
// camelCase - variables and functions (myNumber)
// PascalCase - types, classes and enums (CarID)
// snake_case - common in other languages, e.g. Python (my_number)



