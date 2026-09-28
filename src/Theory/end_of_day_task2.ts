// The task is to create a basic Library Management System

// Part 1. Enum
// Create an Enum called BookStatus with three members:
//     Available
//     CheckedOut
//     Reserved



// These must be String enums, with their own corresponding values

// Part 2. Interface
// Create an interface called LibraryItem with
//     id - a number
//     title - a string
//     addedDate - a string



// Then create an interface called Book that extends LibraryItem and adds:
//     author - a string
//     pageCount - a number
//     status - of type BookStatus
//     genre - an optional string



// Part 3. Function Types & Functions
// Create a function type called BookFilter that takes a Book and returns a boolean
// then write two functions that match this type
//     isAvailable - returns true if the book's status is BookStatus.Available
//     isLongBook - returns true if the book has more (>) than 300 pages






// Part 4. Class
// Create a class called Library with
//     a private property called books, which is an array of Book objects and starts as an empty array
//     a method addBook(book: Book): void - this will add books to our collection
//     a method getBooks(): Book[] - returns all the books



// Part 5. Put it all together
//     Create at least three Book objects - mix up the statuses and genres
//     Create a library instance
//     add all three books to the library
//     and print them out.