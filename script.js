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
    newBook.displayTile = createBookTile(newBook);
    BOOK_DISPLAY_AREA.appendChild(newBook.displayTile);
}

function createBookTile(book) {
    let newBookTile = document.createElement("div");
    newBookTile.classList.add("book-tile");

    let newBookHeading = document.createElement("h2");
    newBookHeading.innerText = book.title;
    newBookTile.appendChild(newBookHeading);

    let newBookAuthor = document.createElement("small");
    newBookAuthor.innerText = book.author;
    newBookTile.appendChild(newBookAuthor);

    let newBookBlurb = document.createElement("p");
    newBookBlurb.innerText = book.blurb;
    newBookTile.appendChild(newBookBlurb);

    let statusBar = createBookStatusBar(book);
    newBookTile.appendChild(statusBar);

    return newBookTile;
}

function createBookStatusBar(book) {
    let statusBar = document.createElement("div");
    statusBar.classList.add("book-status-actions");

    let newBookStatus = document.createElement("h2");
    newBookStatus.classList.add("book-status");
    statusBar.appendChild(newBookStatus);
    book.statusDisplay = newBookStatus;

    book.deleteButton = createBookActionButton("Remove");
    statusBar.appendChild(book.deleteButton);

    book.deleteButton.addEventListener("click", function() {
        book.displayTile.remove();
    })

    book.borrowButton = createBookActionButton("Borrow");
    statusBar.appendChild(book.borrowButton);

    book.borrowButton.addEventListener("click", function() {
        setBookAvailable(book, false)
    });

    if (book.isAvailable) {
        newBookStatus.innerText = "Available";
        newBookStatus.classList.add("book-available");
        book.borrowButton.disabled = false;
    } else {
        newBookStatus.innerText = "Unavailable";
        newBookStatus.classList.add("book-unavailable");
        book.borrowButton.disabled = true;
    }

    return statusBar;
}

function createBookActionButton(text) {
    let newButton = document.createElement("button");
    newButton.type = "button";
    newButton.innerText = text;
    return newButton;
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