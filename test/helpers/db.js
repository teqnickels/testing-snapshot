const db = require('../../src/models/db/db')

const clearTable = () => {
  return db.none('TRUNCATE contacts RESTART IDENTITY;')
    .then( () => {
  // console.log('The table has been reset')
  })
}

const reloadData = () => {
  return db.any(`INSERT INTO contacts (first_name, last_name) VALUES ('Jared', 'Grippe'), ('Tanner', 'Welsh'), ('NeEddra', 'James');`)
    .then((result) => {
      // console.log('The data has been reset')
    })
}

const resetDb = () => {
  return clearTable()
    .then(() => {
      reloadData()
    })
    .catch(console.error)
}

module.exports = { clearTable, reloadData, resetDb }