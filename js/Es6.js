import {Book} from '../js/Book.js';

class UI {
  addBookToList(book) {
  // Accessing the book list Table
  const list = document.getElementById('book-list');
  // Creating book row
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a class="delete" style="color:#f00; cursor:pointer">X</a></td>
  `;

  list.appendChild(row);
}

showAlert(message, className) {
// Create a div
const div = document.createElement('div');
// Add classes
div.className = `alert ${className}`;
// Add text
div.appendChild(document.createTextNode(message));
// Get Parent
const container = document.querySelector('.container');
// Get form
const form = document.getElementById('book-form');
// Insert the alert div before the form
container.insertBefore(div, form);
setTimeout(function(){
  document.querySelector('.alert').remove();
}, 3000);
}

deleteBook(target) {
  if(target.classList.contains('delete') == true) {
    target.parentElement.parentElement.remove();
}
}

clearFields() {
  document.getElementById('book-title').value = '';
  document.getElementById('book-author').value = '';
  document.getElementById('book-isbn').value = '';
}

}

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