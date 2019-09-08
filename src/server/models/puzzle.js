const db = require('./db');

const getAllPuzzles = async () => {
  const puzzles = await db.get('SELECT * FROM puzzles');
  if (!puzzles) {
    throw new Error('Invariant exception: No puzzles');
  }
  return puzzles;
};

module.exports = { getAllPuzzles };
