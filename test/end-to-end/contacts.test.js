const chai = require('chai')
const chaiHttp = require('chai-http');
const should = chai.should()
const app = require('../../src/server.js')

chai.use(chaiHttp);

chai.request(app)
  .get('/')
  .end(( error, response) => {
    expect(error).to.be.null; 
    expect(response).to.have.status(200)
  })


