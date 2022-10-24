const BOOK_FORM = document.getElementById("book-input-form");
const BOOK_DISPLAY_AREA = document.querySelector("main");
let myLibrary = [];

function Book(title, author, blurb, isAvailable) {
    this.title = title;
    this.author = author;
    this.blurb = blurb;
    this.isAvailable = isAvailable;
}

Book.prototype.toString = function() {
    return `Title: ${this.title}, Author: ${this.author}, Blurb: ${this.blurb}, Available: ${this.isAvailable}`;
} 

function AddBookToLibraryByForm() {
    AddBookToLibrary(BOOK_FORM.title.value, BOOK_FORM.author.value, BOOK_FORM.blurb.value, true);
}

function AddBookToLibrary(title, author, blurb, isAvailable) {
    let newBook = new Book(title, author, blurb, isAvailable);
    myLibrary.push(newBook);

    let newBookTile = document.createElement("div");
    newBookTile.classList.add("book-tile");
    let newBookHeading = document.createElement("h2");
    newBookHeading.innerText = newBook.title;
    newBookTile.appendChild(newBookHeading);
    let newBookAuthor = document.createElement("small");
    newBookAuthor.innerText = newBook.author;
    newBookTile.appendChild(newBookAuthor);
    let newBookBlurb = document.createElement("p");
    newBookBlurb.innerText = newBook.blurb;
    newBookTile.appendChild(newBookBlurb);

    let newBookStatusAction = document.createElement("div");
    newBookStatusAction.classList.add("book-status-actions");
    let newBookStatus = document.createElement("h2");
    newBookStatusAction.appendChild(newBookStatus);

    if (newBook.isAvailable) {
        newBookStatus.innerText = "Available";
        newBookStatus.classList.add("book-available");
    } else {
        newBookStatus.innerText = "Unavailable";
        newBookStatus.classList.add("book-unavailable");
    }

    newBookTile.appendChild(newBookStatusAction);

    BOOK_DISPLAY_AREA.appendChild(newBookTile);
}

AddBookToLibrary(
    "The Lord of The Rings: The Fellowship of The Ring",
    "JRR Tolkien",
    "The Fellowship of the Ring is the first of three volumes of the epic novel The Lord of the Rings by the English author J. R. R. Tolkien. It is followed by The Two Towers and The Return of the King. It takes place in the fictional universe of Middle-earth, and was originally published on 29 July 1954 in the United Kingdom.",
    true
)

AddBookToLibrary(
    "The Lord of The Rings: The Two Towers",
    "JRR Tolkien",
    "The Two Towers is the second volume of J. R. R. Tolkien's high fantasy novel The Lord of the Rings. It is preceded by The Fellowship of the Ring and followed by The Return of the King.",
    true
)