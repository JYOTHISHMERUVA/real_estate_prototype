const Database = require('better-sqlite3')
const db = new Database('../db/realestate.db')
function init(){
  const schema = require('fs').readFileSync(__dirname + '/../db/schema.sql','utf8')
  db.exec(schema)
}
module.exports = { db, init }