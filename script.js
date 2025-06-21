const showButton = document.querySelector(".showDialog");
const dialog = document.querySelector(".dialog");
const closeButton = document.querySelector(".closeButton");
const addBookForm = document.querySelector(".addBookForm");
const bookData = document.querySelector(".bookData")

let myLibrary = [];

function Book(title, author, pages, bookId, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.bookId = bookId;
  this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = this.read === "read" ? "not read" : "read";
  };

let newBook1 = new Book("Harry Poter" , "J. K. Rowling", "230", "01jkofkjbqiheqoip", "not read");
myLibrary.push(newBook1);

displayBooks();

function addBookToLibrary(title, author, pages, bookId, read) {
    const newBook = new Book(title, author, pages, bookId, read);
    myLibrary.push(newBook);
    displayBooks();
}

showButton.addEventListener("click" , () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(addBookForm);
    const objData = Object.fromEntries(fd);
    const bookId = self.crypto.randomUUID();
    const readStatus = objData.read ? "read" : "not read";
    addBookToLibrary(objData.title, objData.author, objData.pages, bookId, readStatus);
    dialog.close();
});


function displayBooks(){
    bookData.innerHTML = '';
    myLibrary.forEach(book => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>
            <label class="switch">
                <input type="checkbox" class="checkBox" data-id="${book.bookId}" ${book.read === "read" ? "checked" : ""}>
                <span class="slider round"></span>
            </label>        
        </td>
        <td><button class="deleteBtn" data-id=${book.bookId}>Delete</button></td>
    `;
    bookData.appendChild(row);
    });
}


bookData.addEventListener('click', function(e) {
    if (e.target.classList.contains('deleteBtn')) {
        const id = e.target.getAttribute('data-id');
        deleteBook(id);
    }
    else if (e.target.classList.contains('checkBox')) {
        const id = e.target.getAttribute('data-id');
        checkRead(id);
    }
});

function checkRead(id) {
    myLibrary.forEach(book => {
        if (book.bookId === id) {
            book.toggleRead();
        }
    });
}

function deleteBook(id) {
    myLibrary = myLibrary.filter(book => book.bookId !== id);
    displayBooks();
}