const SqliteDatabase = require('./sqlite');
const puzzleData = require('./puzzleData');

const myDatabase = new SqliteDatabase('database.sqlite3');

const initializeDatabase = async () => {
  await myDatabase.run(
    `CREATE TABLE IF NOT EXISTS puzzles (
			id INTEGER PRIMARY KEY,
			startFen TEXT,
			difficulty INTEGER,
      moves TEXT,
      UNIQUE(startFen)
		)`
  );
  await myDatabase.run(
    `CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY,
			username TEXT,
      rating INTEGER,
      UNIQUE(username)
		)`
  );
  puzzleData.forEach(async ({ startFen, difficulty, moves }) => {
    await myDatabase.run(
      'INSERT OR IGNORE INTO puzzles (startFen, difficulty, moves) VALUES (?, ?, ?)',
      [startFen, difficulty, JSON.stringify(moves)]
    );
  });

  // TODO remove, for testing purposes
  const { count } = await myDatabase.get('SELECT COUNT(*) AS count FROM users');
  if (!count) {
    await myDatabase.run(
      'INSERT OR IGNORE INTO users (username, rating) VALUES (?, ?)',
      ['test', '1500']
    );
    await myDatabase.run(
      'INSERT OR IGNORE INTO users (username, rating) VALUES (?, ?)',
      ['test2', '1600']
    );
  }
};
initializeDatabase();

module.exports = myDatabase;
