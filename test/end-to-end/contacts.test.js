const chai = require('chai')
const chaiHttp = require('chai-http');
const should = chai.should()
const app = require('../../src/server.js')
const expect = chai.expect

chai.use(chaiHttp);

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
    .send({ first_name: 'me', last_name: '123' })
    .then( (response) => {
      expect(response).to.be.html
      expect(response).to.have.status(200)
    })
})

it('GET route that makes sure the correct data is returned', () => {
  return chai.request(app)
  .get('/contacts/5')
    .then((response) => {
      expect(response).to.be.html
      expect(response).to.have.status(200)

    })    
})