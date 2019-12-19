import {Book} from './Book.js';
import {UI} from './UI.js';

class Store {

  static getData() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayData() {
    const ui = new UI();
    const books = Store.getData();
    books.forEach((book) => ui.addBookToList(book));
  }

  static addToStore(book) {
    const books = Store.getData();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static deleteFromStore(isbn) {
    const books = Store.getData();
    books.forEach((book, index) => {
      if(book.isbn == isbn) {
        books.splice(index, 1);
      }
    })
    localStorage.setItem('books', JSON.stringify(books));
  }

}
// Even Handlers

document.addEventListener('DOMContentLoaded', Store.displayData());

document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('book-title').value,
        author = document.getElementById('book-author').value,
        isbn = document.getElementById('book-isbn').value;

        // Creating ui object
  const ui = new UI();
  // Validate the form
  if(title === '' || author === '' || isbn === '') {
    // Show Alert if something missing
    ui.showAlert('Please fill the blank', 'alert-danger');
  } else {
  // Creating book object
  const book = new Book(title, author, isbn);
  // Adding book to ui
  ui.addBookToList(book);
  //Add to LS
  Store.addToStore(book);
  // Show success alert
  ui.showAlert('Book Added ...', 'alert-success');
  // Clearing the input values
  ui.clearFields();  
  }


  e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI();
  
  ui.deleteBook(e.target); 
  // Delete from LS
  Store.deleteFromStore(e.target.parentElement.previousElementSibling.textContent);
  
  ui.showAlert('Book removed..', 'alert-danger');

  e.preventDefault();
});