const myLibrary = [];

function Book(title, author, numberOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.isRead = isRead;
}

//prototype for the read status button
// Book.prototype.didYouRead = function() {
//     return isRead;
// }

//const book1 = new Book('t1', 'a1', 'n1', 'i1');
//const book2 = new Book('t2', 'a2', 'n2', 'i2');

function addBookToLibrary(book) {
  myLibrary.push(book);
  //return myLibrary;
}

//addBookToLibrary();
//add a function to loop through the array and display the book on page
//also add remove button on in this function
const bookDisplay = document.querySelector(".book");
function displayBook() {
    for (let i = 0; i < myLibrary.length; i++) {
        let eachBook = document.createElement('div');
        //each book contains bookContent, remove button and read status button
        eachBook.classList.add(`book${i}`);
        let bookContent = document.createElement('div');
        bookContent.textContent = `book title: ${myLibrary[i].title}; book author: ${myLibrary[i].author}; book page: ${myLibrary[i].numberOfPages}; read the book yet: ${myLibrary[i].isRead}`;
        eachBook.appendChild(bookContent);
        //add removebutton
        let removeButton = document.createElement("button"); 
        removeButton.textContent = "Remove";
        removeButton.classList.add(`book${i}`);
        eachBook.appendChild(removeButton);
        //add read status button(instructions needint prototype funciton)
        let readStatus = document.createElement("button");
        readStatus.classList.add('readstatus');
        //the prototype is didYouRead() not didYouRead!
        if(myLibrary[i].isRead) {
            readStatus.innerHTML = "Read? Yes";
        } else {
            readStatus.innerHTML = "Read? No";
        }
        eachBook.appendChild(readStatus);
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

const closeFormButton = document.querySelector(".close");
closeFormButton.addEventListener("click", (e) => {
    closeForm();
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
    //to prevent books from displaying repeatedly,clear bookDisplay content each time by replacing all children with empty div
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
    //clear the previous submission text content
    document.getElementById("bookform").reset();
    
});

//add remove button funciton
//the below code only works with one book, we need to remove the book for each one, so this button needs to be attached to the book
//therefore we add this button when we loop over each book to display on the screen
//the same goes for read status
// function addRemoveButton() {
//     const removeButton = document.createElement("button");
//     removeButton.textContent = "Remove";
//     bookDisplay.appendChild(removeButton);
// }

//once you click remove button, remove the book from the array and display all together
//below code won't work because when elements are newly created, the eventlistener happened in the past. So it seems like nothing on the DOM has any event.
//You need to attach the event to the parent so the event can be detected by event bubbling

//This is called Event Delegation

// const removeButtons = document.querySelectorAll('button');
// removeButtons.forEach(removeButton => removeButton.addEventListener('click', (e) => {
//     console.log(e.target.className);
// }));

document.querySelector('.book').addEventListener('click', (e) => {
    //const target = e.target.closest("[class^='book']");
    console.log(e.target);
    //delete the remove button element and remove from book from array
    if (e.target && e.target.className != "" && e.target.className.includes("book")){
        const removedChild = document.querySelector(`.${e.target.className}`);
        console.log(removedChild);
        document.querySelector('.book').removeChild(removedChild);
        let index = parseInt(e.target.className.slice(4), 10);
        //splice() for removal: first index, where to remove, second index for how many elements
        myLibrary.splice(index, 1); 
        //at this point, we need to update the html with the right index
        bookDisplay.replaceChildren();
        displayBook();
    }
});

//toggle the readstatus button
document.querySelector('.book').addEventListener('click', (e) => {
    if (e.target && e.target.className === "readstatus" ) {
        if(e.target.innerHTML === "Read? Yes") {
            e.target.innerHTML = "Read? No";
        } else {
            e.target.innerHTML = "Read? Yes";
        }
    }
});

