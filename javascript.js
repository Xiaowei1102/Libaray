const myLibrary = [];

function Book(title, author, numberOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.isRead = isRead;
}

const book1 = new Book('t1', 'a1', 'n1', 'i1');
const book2 = new Book('t2', 'a2', 'n2', 'i2');

function addBookToLibrary() {
  myLibrary.push(book1, book2);
  return myLibrary;
}

addBookToLibrary();
//add a function to loop through the array and display the book on page
const bookDisplay = document.querySelector(".book");
function displayBook() {
    for (let book in myLibrary) {
        let eachBook = document.createElement('div');
        eachBook.textContent = `book title: ${myLibrary[book].title}; book author: ${myLibrary[book].author}; book page: ${myLibrary[book].numberOfPages}; read the book yet: ${myLibrary[book].isRead}`
        bookDisplay.appendChild(eachBook);
    }
}
displayBook();