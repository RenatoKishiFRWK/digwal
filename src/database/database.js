const sqlite3 = require('sqlite3').verbose();

const DB_PATH = './database/db.sqlite';

const db = new sqlite3.Database(DB_PATH);

module.exports = db;