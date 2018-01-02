module.exports = {
  "beforeEach": (client) => {
    client
      .resizeWindow(1280, 800);
  },
  'user can view landing page': (client) => {
    client
      .url('http://localhost:8080')
      .waitForElementVisible('body', 1000)
      .assert.title('Hello Books')
      .assert.visible('li#login')
      .assert.visible('li#signup')
      .assert.containsText('li#login', 'LOGIN')
      .assert.containsText('li#signup', 'SIGN UP')
      .click('li#signup')
      .waitForElementVisible('.signup-wrapper')
      .assert.urlEquals('http://localhost:8080/signup')
      .url('localhost:8080/')
      .waitForElementVisible('.overlay-main')
      .click('li#login')
      .assert.urlEquals('http://localhost:8080/login')
      .end();
  }
};
