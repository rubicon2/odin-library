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

    let newBookBorrow = document.createElement("button");
    newBookBorrow.type = "button";
    newBookBorrow.innerText = "Check Out";
    newBookStatusAction.appendChild(newBookBorrow);

    newBook.statusDisplay = newBookStatus;
    newBook.borrowButton = newBookBorrow;

    newBookBorrow.addEventListener("click", function() {
        setBookAvailable(newBook, false)
    });

    if (newBook.isAvailable) {
        newBookStatus.innerText = "Available";
        newBookStatus.classList.add("book-available");
        newBookBorrow.disabled = false;
    } else {
        newBookStatus.innerText = "Unavailable";
        newBookStatus.classList.add("book-unavailable");
        newBookBorrow.disabled = true;
    }

    newBookTile.appendChild(newBookStatusAction);

    BOOK_DISPLAY_AREA.appendChild(newBookTile);
}

function setBookAvailable(book, isAvailable) {
    book.isAvailable = isAvailable;
    book.borrowButton.disabled = !isAvailable;
    book.statusDisplay.innerText = isAvailable ? "Available" : "Unavailable";
    let statusDisplayClass = isAvailable ? "book-available" : "book-unavailable";
    book.statusDisplay.classList.add(statusDisplayClass);
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