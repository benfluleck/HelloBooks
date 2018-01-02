module.exports = {
  "beforeEach": (client) => {
    client
      .resizeWindow(1280, 800);
  },
  'user can view recent books without logging in': (client) => {
    client
      .url('localhost:8080')
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
       .waitForElementVisible('.book-modal')
       .click('.loan-button')
       .pause(5000)
       .assert.containsText('.notif', 'Harry Potter succesfully loaned')
       .end();
   }

};
