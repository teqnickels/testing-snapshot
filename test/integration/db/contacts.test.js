const chai = require('chai')
const chaiHttp = require('chai-http');
const should = chai.should()
const app = require('../../../src/server.js')
const expect = chai.expect
const { clearTable, reloadData, resetDb } = require('../../helpers/db.js')
const { findAll, create } = require('../../../src/models/db/contacts')
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiHttp);

describe('Integration tests database functions', () => {
  beforeEach('Reset the database', () => {
    return resetDb()
  })

  it('Creates a new contact in the database', () => {
    const contact = {
      first_name: 'CeeLo',
      last_name: 'Green'
    }
    return create(contact).then(()=> {
       return findAll()
      .then((results) => {
        expect(results.length).to.eql(4)
      })
    })
  })
  it('Returns all contacts from the database', () => {
 //THE PROBLEM IS THAT THE RESET IS NOT FINISHING BEFORE FINDALL STARTS
    return findAll()
    .then((results) => {
      expect(results.length).to.eql(3)
    })
  })

})  