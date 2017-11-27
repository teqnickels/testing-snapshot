require('dotenv').config()
const pgp = require('pg-promise')()
let connectionString

if( process.env.NODE_ENV === 'development' ) {
  connectionString = process.env.DEVELOPMENT_DATABASE_URL
} else {
  connectionString = process.env.TEST_DATABASE_URL
}

const db = pgp(connectionString)
module.exports = db