// "export" makes these items available to other files, which can import them

export type Animal = {name:string, sound:string};

export function makeSound(animal:Animal): void {
    console.log(`${animal.name} says ${animal.sound}`);
}

export enum AnimalType {
    Dog = "DOG",
    Cat = "CAT"
}

