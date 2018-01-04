const { addBook, editBook } = require('./selectors');

module.exports = {
  "beforeEach": (client) => {
    client
      .url('http://localhost:8080/login')
      .waitForElementVisible('body')
      .setValue('input[name="username"]', 'bennyogidan')
      .setValue('input[name="password"]', 'bennyogidan')
      .click('.loginbtn');
  },

  'admin users have access to admin page': (client) => {
    client
      .waitForElementVisible('#adminboard')
      .assert.urlEquals('http://localhost:8080/admin')
      .pause(3000)
      .assert.containsText(
        'li#react-tabs-0',
        'ALL BOOKS'
      )
      .assert.containsText(
        'li#react-tabs-2',
        'USERS'
      )
      .assert.containsText(
        'li#react-tabs-4',
        'CATEGORIES'
      )
      .assert.containsText(
        'li#react-tabs-6',
        'NOTIFICATIONS'
      )
      .end();
  },

  'admin user can add new book category': (client) => {
    client
      .waitForElementVisible('#adminboard')
      .click('li#react-tabs-4')
      .setValue('input[name="categoryName"]', 'CategoryTest')
      .click('.add-category-btn')
      .pause(3000)
      .waitForElementVisible('.notif')
      .assert.containsText(
        '.notif',
        'Category added!, CategoryTest'
      )
      .end();
  },
  'admin user can add new book': (client) => {
    client
      .waitForElementVisible('#adminboard')
      .click('.add-book-btn')
      .pause(3000)
      .waitForElementVisible('#add-admin-book-modal')
      .setValue(addBook.title, 'Testcode')
      .setValue(addBook.author, 'test author')
      .setValue(
        addBook.description,
        'This is a test to add a new book'
      )
      .setValue(addBook.quantity, '10')
      .click(addBook.dropDownButton)
      .waitForElementVisible(addBook.loadDramaInput)
      .click(addBook.drama)
      .click('.addbook-submit-btn')
      .pause(4000)
      .assert.containsText(
        '.notif',
        'Testcode has been added to the library, Category: Comedy'
      )
      .end();
  },

  'admin user cannot add an existing book': (client) => {
    client
      .waitForElementVisible('#adminboard')
      .click('.add-book-btn')
      .waitForElementVisible('#add-admin-book-modal')
      .setValue(addBook.title, 'Testcode')
      .setValue(addBook.author, 'test author')
      .setValue(
        addBook.description,
        'This is a test to add a new book'
      )
      .setValue(addBook.quantity, '10')
      .click(addBook.dropDownButton)
      .pause(3000)
      .waitForElementVisible(addBook.loadDramaInput)
      .click(addBook.drama)
      .click('.addbook-submit-btn')
      .pause(4000)
      .assert.containsText(
        '.notif',
        'A book with the same title ' +
        'and author already exists in the library'
      )
      .end();
  },


  'admin user can edit an existing book': (client) => {
    client
      .waitForElementVisible('#adminboard')
      .click('.edit-btn-class')
      .pause(3000)
      .waitForElementVisible('#edit-admin-book-modal')
      .clearValue(editBook.title)
      .setValue(editBook.title, 'BennyCode')
      .clearValue(editBook.author)
      .setValue(editBook.author, 'Benny author')
      .clearValue(editBook.quantity)
      .setValue(editBook.quantity, '11')
      .click('.editbook-submit-btn')
      .pause(2000)
      .assert.containsText(
        '.notif',
        'BennyCode has been updated'
      )
      .end();
  },
  'admin user can add new book and delete the book': (client) => {
    client
      .waitForElementVisible('#adminboard')
      .click('.add-book-btn')
      .pause(3000)
      .waitForElementVisible('#add-admin-book-modal')
      .setValue(addBook.title, 'Book to Delete')
      .setValue(addBook.author, 'delete author')
      .setValue(
        addBook.description,
        'This is a test to add a new book'
      )
      .setValue(addBook.quantity, '20')
      .click(addBook.dropDownButton)
      .waitForElementVisible(addBook.loadDramaInput)
      .click(addBook.drama)
      .click('.addbook-submit-btn')
      .pause(2000)
      .assert.containsText(
        '.notif',
        'Book to Delete has been added to the library, Category: Comedy'
      )
      .refresh()
      .pause(5000)
      .waitForElementVisible('#adminboard')
      .click('.delete-book-btn')
      .waitForElementVisible('.swal2-container')
      .click('.swal2-confirm')
      .pause(2000)
      .assert.containsText(
        '.notif',
        'Book to Delete has been deleted'
      )
      .end();
  },

  'non-admin users do not have access to admin page. Redirects to login':
  (client) => {
    client
      .url('localhost:8080/logout')
      .waitForElementVisible('body')
      .pause(3000)
      .url('localhost:8080/admin')
      .assert.urlEquals('http://localhost:8080/login')
      .end();
  }
};
