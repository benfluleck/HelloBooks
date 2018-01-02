module.exports = {
  "beforeEach": (client) => {
    client
      .resizeWindow(1280, 800);
  },
  // 'user can sign up with a new user': (client) => {
  //   client
  //     .url('http://localhost:8080/signup')
  //     .waitForElementVisible('body')
  //     .waitForElementVisible('.signup-wrapper')
  //     .setValue('input[name="firstname"]', 'Samuel')
  //     .setValue('input[name="lastname"]', 'Kayode')
  //     .setValue('input[name="username"]', 'bennytest')
  //     .setValue('input[name="email"]', 'xyz@xyz.com')
  //     .setValue('input[name="password"]', 'ebelehigh')
  //     .setValue('input[name="passwordConfirmation"]', 'ebelehigh')
  //     .click('.signup-btn')
  //     .waitForElementVisible('.login-wrapper')
  //     .assert.urlEquals('http://localhost:8080/login')
  //     .end();
  // },
  'user cannot sign up with an existing username': (client) => {
    client
      .url('http://localhost:8080/signup')
      .waitForElementVisible('body')
      .waitForElementVisible('.signup-wrapper')
      .setValue('input[name="firstname"]', 'Benny')
      .setValue('input[name="lastname"]', 'Ogidan')
      .setValue('input[name="username"]', 'bennytest')
      .setValue('input[name="email"]', 'xyz@xyz.com')
      .setValue('input[name="password"]', 'ebelehigh')
      .setValue('input[name="passwordConfirmation"]', 'ebelehigh')
      .click('.signup-btn')
      .pause(2000)
      .assert.containsText('.notif', 'This username is already in use')
      .assert.urlEquals('http://localhost:8080/signup')
      .end();
  },
  'user cannot sign up with an existing email': (client) => {
    client
      .url('http://localhost:8080/signup')
      .waitForElementVisible('body')
      .waitForElementVisible('.signup-wrapper')
      .setValue('input[name="firstname"]', 'Benny')
      .setValue('input[name="lastname"]', 'Ogidan')
      .setValue('input[name="username"]', 'testandela')
      .setValue('input[name="email"]', 'xyz@xyz.com')
      .setValue('input[name="password"]', 'ebelehigh')
      .setValue('input[name="passwordConfirmation"]', 'ebelehigh')
      .click('.signup-btn')
      .pause(2000)
      .assert.containsText('.notif', 'This email is already in use')
      .assert.urlEquals('http://localhost:8080/signup')
      .end();
  },
};
