module.exports = {
  "beforeEach": (client) => {
    client
      .resizeWindow(1280, 800);
  },
  'users can visit their dashboard after they log in': (client) => {
    client
      .url('localhost:8080/login')
      .waitForElementVisible('.login-wrapper')
      .setValue('input[name="username"]', 'testuser')
      .setValue('input[name="password"]', 'testuser')
      .click('.loginbtn')
      .waitForElementVisible('.main-wrapper')
      .end();
  },
  'users cannot visit their dashboard unless logged in': (client) => {
    client
      .url('localhost:8080/dashboard')
      .assert.urlEquals('http://localhost:8080/login')
      .end();
  },
  'users can loan a book from their dashboard': (client) => {
    client
      .url('localhost:8080/login')
      .waitForElementVisible('.login-wrapper')
      .setValue('input[name="username"]', 'testuser')
      .setValue('input[name="password"]', 'testuser')
      .click('.loginbtn')
      .pause(3000)
      .waitForElementVisible('.main-wrapper')
      .click('.card-image')
      .waitForElementVisible('.book-modal')
      .click('.loan-button')
      .pause(3000)
      .assert.containsText('.notif', 'Harry Potter succesfully loaned')
      .end();
  },
  'users can  return a borrowed book from their dashboard': (client) => {
    client
      .url('localhost:8080/login')
      .waitForElementVisible('.login-wrapper')
      .setValue('input[name="username"]', 'testuser')
      .setValue('input[name="password"]', 'testuser')
      .click('.loginbtn')
      .pause(3000)
      .click('#react-tabs-2')
      .waitForElementVisible('.borrowed-books')
      .click('.card-image')
      .waitForElementVisible('.book-modal')
      .click('.return-button')
      .pause(3000)
      .assert.containsText('.notif', 'You have just returned Harry Potter')
      .end();
  },
};
