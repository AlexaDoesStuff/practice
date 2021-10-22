/* I changed the original prompt to be solely localStorage dependent. 
* One difficulty I had is storing typed Objects locally; so what is being 
* stored are parsed and unparsed objects with similar structure, but
* aren't typed specifically as Books.
*/

const bookshelf = document.getElementById('bookshelf');

function Book(title, pages, author) {
  this.title = title;
  this.pages = pages;
  this.author = author;
  this.read = false;
}

function createEntry(book) {
  //For form based entries 
  if(book.read === undefined) {
    book.read = false;
  }
  const elem = document.createElement('div');
  elem.classList.add('book-card');
  elem.innerHTML = `${book.title} by ${book.author} (${book.pages}) <br\/> ${book.read}`;
  bookshelf.appendChild(elem);
}

if(localStorage.getItem('library') === null) {
  var myLibrary = [];
  const x = new Book('Harry Potter', '364', 'JK Rowling');
  const y = new Book('Mans Search', '264', 'VF');
  myLibrary.push(x);
  myLibrary.push(y);
  const originalBooks = JSON.stringify(myLibrary);
  localStorage.setItem('library', originalBooks);

  myLibrary.forEach(book => {
    createEntry(book);
  })
} else {
  var render = localStorage.getItem('library');
  render = JSON.parse(render);
  render.forEach(book => {
    createEntry(book);
  })
}

const addBtn = document.getElementById('add-card');
const modal = document.getElementById('modal');
const close = document.getElementById('close');

addBtn.onclick = function() {
  modal.style.display = 'block';
}

close.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const form = document.querySelector('form');

function addFromForm(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());

  var library = localStorage.getItem('library');
  library = JSON.parse(library);
  library.push(value);

  localStorage.setItem('library', JSON.stringify(library));

  createEntry(value);

  form.reset();
  close.click();
}

form.addEventListener('submit', addFromForm);


