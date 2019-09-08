const { GraphQLPuzzleSet } = require('../nodes/PuzzleSet');

const PuzzleSetQuery = {
  type: GraphQLPuzzleSet,
  // resolve: (root, { id }) => {}
};

module.exports = PuzzleSetQuery;
