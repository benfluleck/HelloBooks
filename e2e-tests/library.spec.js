module.exports = {
  'user can view recent books without logging in':
  (client) => {
    client
      .url('localhost:8080')
      .pause(3000)
      .waitForElementVisible('.overlay-main')
      .assert.elementPresent('.overlay')
      .assert.elementPresent('.recent-books')
      .click('.card-image')
      .assert.urlEquals('http://localhost:8080/')
      .end();
  },
  'user cannot borrow books any recent books,':
  (client) => {
    client
      .url('localhost:8080/')
      .pause(3000)
      .waitForElementVisible('.overlay-main')
      .assert.elementPresent('.overlay')
      .click('.card-image')
      .assert.elementNotPresent('.loan-button')
      .assert.urlEquals('http://localhost:8080/')
      .end();
  },
  'user can borrow recent books from landing page if they are authenticated':
   (client) => {
     client
       .url('localhost:8080/login')
       .waitForElementVisible('.login-wrapper')
       .setValue('input[name="username"]', 'testuser')
       .setValue('input[name="password"]', 'testuser')
       .click('.loginbtn')
       .pause(5000)
       .waitForElementVisible('.main-wrapper')
       .url('localhost:8080/')
       .waitForElementVisible('.overlay-main')
       .assert.elementPresent('.overlay')
       .assert.elementPresent('.loan-button')
       .assert.urlEquals('http://localhost:8080/')
       .click('.card-image')
       .pause(3000)
       .waitForElementVisible('.book-modal')
       .click('.loan-button')
       .pause(2000)
       .assert.containsText('.notif', 'BennyCode successfully loaned')
       .end();
   },
  'admin user cannot delete a book on loan': (client) => {
    client
      .url('http://localhost:8080/login')
      .waitForElementVisible('body')
      .setValue('input[name="username"]', 'bennyogidan')
      .setValue('input[name="password"]', 'bennyogidan')
      .click('.loginbtn')
      .pause(2000)
      .waitForElementVisible('#adminboard')
      .click('.delete-book-btn')
      .waitForElementVisible('.swal2-container')
      .click('.swal2-confirm')
      .pause(2000)
      .assert.containsText(
        '.notif',
        'You can\'t delete this ' +
        'book while there is a copy still out on loan'
      )
      .end();
  },

};
