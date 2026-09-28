// === Library ===
enum Genre {
    Poetry = "POETRY",
    Comedy = "COMEDY",
    Blockbuster = "BLOCKBUSTER",
    Drama = "DRAMA",
    Biography = "BIOGRAPHY"
}

interface Book {
    id: number,
    title: string,
    author: string,
    pageCount: number,
    genre: Genre,
    available: boolean,
    rentPrice: number,
}

class Library {
    private books: Book[] = []

    addBook(book: Book): void {
        this.books.push(book)
    }

    listAvailable(): Book[] {
        return this.books.filter(b => b.available)
    }

    findBookById(id: number): Book | undefined {
        return this.books.find(b => b.id === id)
    }

    borrowBook(id: number): boolean {
        const book = this.findBookById(id)

        if (book && book.available) {
            book.available = false
            return true
        }
        return false
    }

}

interface User {
    id: number,
    name: string,
    borrowedBooks: number[]
}

// "implements" means the class must have all the properties of the User interface
class Customer implements User {

    // "public" in constructor parameters declares the property and assigns it automatically
    constructor(
        public id: number,
        public name: string,
        public borrowedBooks: number[] = []
    ) { }

    borrow(library: Library, bookId: number) {

        if (library.borrowBook(bookId)) {
            this.borrowedBooks.push(bookId)
            console.log(`${this.name} borrowed book with id ${bookId}`)
        } else {
            console.log(`Book ${bookId} is not available`)
        }
    }
}


const library = new Library()

library.addBook({
    id: 1,
    title: "Barko plays",
    author: "owner",
    pageCount: 300,
    genre: Genre.Poetry,
    available: true,
    rentPrice: 15,
})
library.addBook({
    id: 2,
    title: "Barko plays 2",
    author: "owner",
    pageCount: 300,
    genre: Genre.Poetry,
    available: true,
    rentPrice: 15,
})
library.addBook({
    id: 3,
    title: "Barko plays 3",
    author: "owner",
    pageCount: 300,
    genre: Genre.Poetry,
    available: true,
    rentPrice: 15,
})


const bob = new Customer(1, "Bob")

bob.borrow(library, 1)

console.log(library.listAvailable());



