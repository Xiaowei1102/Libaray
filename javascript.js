const myLibrary = [];

function Book(title, author, numberOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.isRead = isRead;
}

//const book1 = new Book('t1', 'a1', 'n1', 'i1');
//const book2 = new Book('t2', 'a2', 'n2', 'i2');

function addBookToLibrary(book) {
  myLibrary.push(book);
  //return myLibrary;
}

//addBookToLibrary();
//add a function to loop through the array and display the book on page
const bookDisplay = document.querySelector(".book");
function displayBook() {
    for (let book in myLibrary) {
        let eachBook = document.createElement('div');
        eachBook.textContent = `book title: ${myLibrary[book].title}; book author: ${myLibrary[book].author}; book page: ${myLibrary[book].numberOfPages}; read the book yet: ${myLibrary[book].isRead}`
        bookDisplay.appendChild(eachBook);
    }
}
//displayBook();

//add event.preventDefault() to stop form from submitting to another url
//did some experiment: you can access the input data after hitting submitting button directly.
//code below is used later for integration
// const noSubmit = document.querySelector(".submit");
// noSubmit.addEventListener("click", (e) => {
//     console.log("You clicked it");
//     e.preventDefault();
//     const inputTitle = document.getElementById("title");
//     console.log(inputTitle.value);
// });

//upon clicking new book button, pop up the form
//one question: how do we make sure initially the form is not shown? by using css to make its intial display = none;
const newBook = document.querySelector("#addbook");
newBook.addEventListener("click", (e) => {
    openForm();
});



function openForm() {
    document.querySelector(".formcontainer").style.display = "block";
}

function closeForm() {
    document.querySelector(".formcontainer").style.display = "none";
}

//after hitting submit, we need to collect info from input to display on the screen and then close the form (continue with code from above)

const noSubmit = document.querySelector(".submit");
noSubmit.addEventListener("click", (e) => {
    console.log("You clicked it");
    //to prevent books from displaying repeatedly,clear bookDisplay content each time
    bookDisplay.replaceChildren();
    e.preventDefault();
    const inputTitle = document.getElementById("title");
    const inputAuthor = document.getElementById("author");
    const inputPages = document.getElementById("pagenumbers");
    const isRead = document.getElementById("readstatus");
    console.log(inputAuthor.value);
    console.log(isRead.checked);
    //create new book
    const newBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, isRead.checked);
    //add this book to myLibrary
    addBookToLibrary(newBook);
    //display the books
    displayBook();
    //after this, we close the form
    closeForm();
});

