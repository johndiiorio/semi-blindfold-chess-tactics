const SqliteDatabase = require('./sqlite');

const myDatabase = new SqliteDatabase('database.sqlite3');

const initializeDatabase = async () => {
  await myDatabase.run(
    `CREATE TABLE IF NOT EXISTS puzzles (
			id INTEGER PRIMARY KEY,
			puzzle TEXT
		)`,
  );
  await myDatabase.run(
    `CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY,
			username TEXT,
			rating INTEGER
		)`,
  );
};
initializeDatabase();

module.exports = myDatabase;
