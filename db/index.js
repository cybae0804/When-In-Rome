const mysql = require('mysql');
const { promisify } = require('util');
const { dbConfig } = require('../config');

const db = mysql.createConnection(dbConfig);

db.query = promisify(db.query);

db.connect(err => {
  if (err) {
    return console.log('Error connecting to MySQL:', err);
  }

  console.log('Connected to MySQL...');
});

module.exports = db;
