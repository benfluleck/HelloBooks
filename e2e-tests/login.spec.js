export default {
  'user can login': (client) => {
    client
      .url('http://localhost:8080')
      .waitForElementVisible('body')
      .click('#login-btn')
      .waitForElementVisible('#login-form')
      .setValue('input[name="username"]', 'Segun')
      .setValue('input[name="password"]', 'password')
      .click('input[name="submit"]')
      .waitForElementVisible('main#dashboard')
      .assert.urlEquals('http://localhost:8080/dashboard')
      .end();
  },
};
