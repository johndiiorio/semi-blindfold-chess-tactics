const { GraphQLPuzzleSet } = require('../nodes/PuzzleSet');

const PuzzleSetQuery = {
  type: GraphQLPuzzleSet,
  resolve: (root, { id }, { datasources }) => {
    datasources.puzzles.getPuzzleById(id);
  },
};

module.exports = PuzzleSetQuery;
