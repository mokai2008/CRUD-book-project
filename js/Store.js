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

export {
  Store
}