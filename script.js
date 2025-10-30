function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const library = [];

function addBook(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  library.push(newBook);
}

function removeBook(id) {
  const index = library.findIndex(book => book.id === id);
  if (index !== -1) {
    library.splice(index, 1);
    displayBooks();
  }
}

function toggleReadStatus(id) {
  const book = library.find(book => book.id === id);
  if (book) {
    book.toggleRead();
    displayBooks();
  }
}

function displayBooks() {
  const tbody = document.getElementById("book-body");
  tbody.innerHTML = "";

  library.forEach(book => {
    const row = document.createElement("tr");
    row.setAttribute("data-id", book.id);

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>
        <input type="checkbox" ${book.read ? "checked" : ""} class="read-toggle" />
      </td>
      <td>${book.id}</td>
      <td>
        <button class="delete-book">Delete</button>
      </td>
    `;

    // Toggle read checkbox
    row.querySelector(".read-toggle").addEventListener("change", () => {
      toggleReadStatus(book.id);
    });

    // Delete button
    row.querySelector(".delete-book").addEventListener("click", () => {
      removeBook(book.id);
    });

    tbody.appendChild(row);
  });
}

// Modal controls
document.getElementById("new-book-btn").addEventListener("click", () => {
  document.getElementById("book-dialog").showModal();
});

function closeDialog() {
  document.getElementById("book-dialog").close();
}

// Form submission
document.getElementById("book-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value);
  const read = document.getElementById("read").checked;

  addBook(title, author, pages, read);
  displayBooks();
  closeDialog();
  this.reset();
});

// Sample books
addBook("The Inhumane Routine", "Reggie duck", 320, true);
addBook("Sapiens", "Yuval Noah Harari", 498, false);
addBook("The Green Kocaine", "Mr Green", 234, false);
addBook("White Powder", "Walter white", 278, true);
displayBooks();