const chai = require('chai')
const chaiHttp = require('chai-http');
const should = chai.should()
const app = require('../../src/server.js')
const expect = chai.expect

chai.use(chaiHttp);

it('responds 200 when requested', (done) => {
   chai.request(app)
    .get('/')
    .end( (error, response) => {
      expect(error).to.be.null; 
      expect(response).to.have.status(200)
      done()
    })
})

it('responds 200 when requested', (done) => {
   chai.request(app)
    .get('/contacts/new')
    .end( (error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(200)
      done()
    })
})

it('saves new contact to database', (done) => {
  chai.request(app)
    .post('/contacts')
    .type('form')
    .send({ first_name: 'me', last_name: '123' })
    .then( (response) => {
      expect(response).to.have.first_name('me') 
      .then((response) => {
        expect(response).to.have.status(200)
      })
    })
    done()
})


