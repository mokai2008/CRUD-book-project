
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

export {
  UI
}