# Typescript basics

Javacript files are also valid ts files. Typescript adds static typing.

JS lets you pass a string variable to a fuction that exepects a number value.

Typescript does not run dirrectly -compiler turns your code into Javascript

```
Typescript (.ts) -> Compiler -> Javascript (.js)

Catches bugs before we run the code.

## Loose typing vs strict tiping

```js
let x = 5;
x = "hello"; // totaly valid
```
console.log(1 + '1'); // ????



Typescript adds static typing. we declare variables and their types.

```ts
let x: number = 5;
x = "hello"; // this will not work, type string is not assignable to type number.
```


## Runtime

Node 

## Project setup

First, check if Node and npm are installed:

```
node -v
npm -v
```
init node project
```
npm init -y

```


install typescript

```
npm install typescript --save-dev

```

Optional:

```
npm install ts-node --save-dev
```

## Creating the TS project

```
npx tsc --init
```

## Compiling and running

```
npx tsc
```


how to run the file

```
node dist/<filename>.js
```