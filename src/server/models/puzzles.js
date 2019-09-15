const db = require('./db');

const getAllPuzzles = async () => {
  const puzzles = await db.get('SELECT * FROM puzzles');
  if (!puzzles) {
    throw new Error('Invariant exception: No puzzles');
  }
  return puzzles;
};

const getPuzzleById = async id => {
  const puzzle = await db.get('SELECT * FROM puzzles WHERE id = ?', id);
  if (!puzzle) {
    throw new Error('Invariant exception: No puzzle found');
  }
  return puzzle;
};

module.exports = { getAllPuzzles, getPuzzleById };
