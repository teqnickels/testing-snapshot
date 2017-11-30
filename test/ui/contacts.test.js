const app = require('../../src/server.js')
const { clearTable, reloadData, resetDb } = require('../helpers/db.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const test = require('selenium-webdriver/testing'); //ASK FOR EXPLANATION ABOUT WHERE THIS IS BEING REQUIRED FROM
Webdriver = require('selenium-webdriver')

const By = Webdriver.By

test.describe('UI tests using a headless browser to confirm UI properties', function() {

  beforeEach('reset the database', () => {
    return resetDb()
  })

  afterEach('reset the test', function() {
    driver.close();
    driver.quit();
  })

  const driver = new Webdriver.Builder()
    .forBrowser('chrome')
    .build()

    test.it('Render page with form that allows users to create a new contact', function() {
      this.timeout(10000);
      driver.get('http://localhost:3000/contacts/new')
      return driver.findElement(By.className('new-contact-form'))
      .then(function(element) {
         return element.isDisplayed()
      })
      .then(function(isFormDisplayed) {
        expect(isFormDisplayed).to.eql(true)
      })
    })

    test.it('Render page with new user', function() {
      this.timeout(10000)
      return chai.request(app)
        .post('/contacts')
        .type('form')
        .send({first_name: 'NEW CONTACT TEST', last_name: 'NEW CONTACT TEST'})
      .then(function() {
        driver.get('http://localhost:3000/contacts/4')
        return driver.findElement(By.className('page-column-content'))
        .getText()
        .then(function(element) {
          console.log(element)
          expect(element).to.include('NEW CONTACT TEST NEW CONTACT TEST')
        })
      })
    })
})
