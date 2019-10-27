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
		)`,
  );
  await myDatabase.run(
    `CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY,
			username TEXT,
			rating INTEGER
		)`,
  );
  puzzleData.forEach(async ({ startFen, difficulty, moves }) => {
    await myDatabase.run(
      'INSERT OR IGNORE INTO puzzles (startFen, difficulty, moves) VALUES (?, ?, ?)',
      [startFen, difficulty, JSON.stringify(moves)],
    );
  });
};
initializeDatabase();

module.exports = myDatabase;
