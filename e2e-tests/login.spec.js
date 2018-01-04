module.exports = {
  'user navigates to login page, user login to the main dashboard':
  (client) => {
    client
      .url('http://localhost:8080/login')
      .waitForElementVisible('body')
      .waitForElementVisible('.login-wrapper')
      .setValue('input[name="username"]', 'testuser')
      .setValue('input[name="password"]', 'testuser')
      .click('.loginbtn')
      .pause(2000)
      .waitForElementVisible('.main-wrapper')
      .assert.containsText('.notif', 'You are now logged in as testuser')
      .assert.urlEquals('http://localhost:8080/dashboard')
      .end();
  },
  'user receives an error if username or password field is empty': (client) => {
    client
      .url('http://localhost:8080/login')
      .waitForElementVisible('body')
      .waitForElementVisible('.login-wrapper')
      .pause(3000)
      .click('.loginbtn')
      .assert.containsText('.notif', 'Username is invalid')
      .end();
  },
  'user cannot log in with wrong password': (client) => {
    client
      .url('http://localhost:8080/login')
      .pause(3000)
      .waitForElementVisible('body')
      .waitForElementVisible('.login-wrapper')
      .setValue('input[name="username"]', 'testuser')
      .setValue('input[name="password"]', 'wrongpassword')
      .click('.loginbtn')
      .pause(2000)
      .assert.containsText('.notif', 'Wrong Credentials')
      .assert.urlEquals('http://localhost:8080/login')
      .end();
  },
  'user cannot log in with unknown username': (client) => {
    client
      .url('http://localhost:8080/login')
      .pause(3000)
      .waitForElementVisible('.login-wrapper')
      .setValue('input[name="username"]', 'wrongusername')
      .setValue('input[name="password"]', 'wrongpassword')
      .click('.loginbtn')
      .pause(2000)
      .assert.containsText('.notif', 'wrongusername does not exist,' +
      ' Make sure you are signed up')
      .assert.urlEquals('http://localhost:8080/login')
      .end();
  },

};
