module.exports = {
  'user can view landing page': (client) => {
    client
      .url('http://localhost:8080')
      .waitForElementVisible('body', 1000)
      .assert.title('Hello Books')
      .pause(3000)
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
