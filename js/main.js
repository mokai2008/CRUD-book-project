function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


function UI() {}

// Adding book to UI

UI.prototype.addBookToList = function(book) {
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

// Showing an alert
UI.prototype.showAlert = function(message, className) {
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

// Deleting from ui
UI.prototype.deleteBook = function(target) {
  
  if(target.classList.contains('delete') == true) {
    target.parentElement.parentElement.remove();
    this.showAlert('Book removed..', 'alert-danger');
}
}

// Clearing Fields in UI

UI.prototype.clearFields = function() {
  document.getElementById('book-title').value = '';
  document.getElementById('book-author').value = '';
  document.getElementById('book-isbn').value = '';
}

// Even Handlers

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
  e.preventDefault();
});