// Import syntax: import { names } from "specifier"
// Specifier examples:
//   "./animals.js"              same folder
//   "./shapes/circle.js"        into a subfolder
//   "../models/<filename>.js"   one folder up
//   "express"                   a package from node_modules (import express from "express")
// We write .js even though the source file is .ts, because TS compiles to .js


import { type Animal, makeSound } from "./animals.js";
import { type AnimalType } from "./animals.js";
import { type Guitar, play, GuitarType  } from "./export_guitars.js";

const dog: Animal = { name: "Buddy", sound: "Vau" }

console.log(dog)
makeSound(dog)


const martin:Guitar = {brand:"martin", sound:"pretty cool", type:GuitarType.Acoustic}

