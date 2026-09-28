type Guitar = {brand:string, sound:string, type:GuitarType};

function play(guitar:Guitar): void {
    console.log(`${guitar.brand} plays ${guitar.sound}`)
}

enum GuitarType {
    Acoustic = "ACOUSTIC",
    Electric = "ELECTRIC"
}

export {type Guitar, play, GuitarType};  // "type" marks Guitar as a type-only export (it exists only at compile time)