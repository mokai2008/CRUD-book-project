import {Book} from './Book.js';
import {UI} from './UI.js';
import {Store} from './Store.js';

// Even Handlers


// clearing the loading screen
$(function () {
  $('#loading').fadeOut(1000, function() {
    $(this).remove();
  })
})

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