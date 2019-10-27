const db = require('./db');

const parsePuzzle = puzzle => ({
  ...puzzle,
  moves: JSON.parse(puzzle.moves),
});

const puzzlesDatasource = args => ({
  getAll: async () => {
    const puzzles = await db.all('SELECT * FROM puzzles');
    if (!puzzles) {
      throw new Error('Invariant exception: No puzzles');
    }
    return puzzles.map(puzzle => parsePuzzle(puzzle));
  },
  getById: async id => {
    const puzzle = await db.get('SELECT * FROM puzzles WHERE id = ?', id);
    if (!puzzle) {
      throw new Error('Invariant exception: No puzzle found');
    }
    return parsePuzzle(puzzle);
  },
});

module.exports = puzzlesDatasource;
