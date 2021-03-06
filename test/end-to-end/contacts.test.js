const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../../src/server.js')
const expect = chai.expect
const { clearTable, reloadData, resetDb } = require('../helpers/db.js')
const { create } = require('../../src/models/db/contacts')

chai.use(chaiHttp);

describe('end-to-end testing response status of requested pages', () => {
  it('responds 200 when requested', () => {
    return chai.request(app)
      .get('/')
      .end( (error, response) => {
        expect(error).to.be.null; 
        expect(response).to.have.status(200)
      })
  })

  it('responds 200 when requested', () => {
    return chai.request(app)
      .get('/contacts/new')
      .end( (error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200)
      })
  })


  it('saves new contact to database', () => {
    return chai.request(app)
      .post('/contacts')
      .type('form')
      .send({ first_name: 'THIS IS FROM THE TEST', last_name: '785' })
      .then( (response) => {
        expect(response.text).to.include('THIS IS FROM THE TEST')
        expect(response).to.have.status(200)
        
      })
  })

})

describe('end-to-end tests that rely on seeded database', () => {
  beforeEach('reset the database', () => {
    return resetDb()
  })

  it('GET route that makes sure the correct data is returned', () => {
    return chai.request(app)
    .get('/contacts/2')
      .then( (response) => {
        expect(response.text).to.include('Tanner&nbsp;Welsh')
        expect(response).to.have.status(200)
      })    
    })

  it('DELETE route that makes sure the correct data is deleted', () => {
      return chai.request(app)
        .delete('/contacts/2')
        .then((response) => {
          // console.log(res.text)
          expect(response.text).to.eql('<!DOCTYPE html>\n<html>\n  <head>\n    <title>Contacts</title>\n    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css">\n    <link rel="stylesheet" type="text/css" href="/style.css">\n    <script type="text/javascript" src="/script.js"></script>\n  </head>\n  <body>\n    <div class="page-column">\n      <nav>\n  <a href="/">Home</a>\n  <form method="get" action="/contacts/search" class="search-form">\n    <input name="q" type="search" placeholder="search" value="" autofocus/>\n    <input type="submit" style="display: none" />\n  </form>\n  <a href="/contacts/new">New Contact</a>\n</nav>\n\n      <div class="page-column-content">\n\n\n  <h1>Contacts</h1>\n\n  <div class="contact-list">\n    \n      <div class="contact-list-member">\n        <a class="contact-link" href="/contacts/1">\n          Jared&nbsp;Grippe\n        </a>\n        <form action="/contacts/1?_method=DELETE" method="POST">\n          <button class="delete-contact">delete contact</button>\n        </form>\n      </div>\n    \n      <div class="contact-list-member">\n        <a class="contact-link" href="/contacts/3">\n          NeEddra&nbsp;James\n        </a>\n        <form action="/contacts/3?_method=DELETE" method="POST">\n          <button class="delete-contact">delete contact</button>\n        </form>\n      </div>\n    \n  </div>\n\n      </div>\n    </div>\n  </body>\n</html>\n\n')
          expect(response).to.have.status(200)
        })
    })

  it('Search route that makes sure the correct data being searched for', () => {
    return chai.request(app)
      .get('/contacts/search?q=James')
      .then((response) => {
        expect(response.text).to.eql('<!DOCTYPE html>\n<html>\n  <head>\n    <title>Contacts</title>\n    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css">\n    <link rel="stylesheet" type="text/css" href="/style.css">\n    <script type="text/javascript" src="/script.js"></script>\n  </head>\n  <body>\n    <div class="page-column">\n      <nav>\n  <a href="/">Home</a>\n  <form method="get" action="/contacts/search" class="search-form">\n    <input name="q" type="search" placeholder="search" value="James" autofocus/>\n    <input type="submit" style="display: none" />\n  </form>\n  <a href="/contacts/new">New Contact</a>\n</nav>\n\n      <div class="page-column-content">\n\n\n  <h1>Contacts</h1>\n\n  <div class="contact-list">\n    \n      <div class="contact-list-member">\n        <a class="contact-link" href="/contacts/3">\n          NeEddra&nbsp;James\n        </a>\n        <form action="/contacts/3?_method=DELETE" method="POST">\n          <button class="delete-contact">delete contact</button>\n        </form>\n      </div>\n    \n  </div>\n\n      </div>\n    </div>\n  </body>\n</html>\n\n')
        expect(response).to.have.status(200)
      })
   })

})



