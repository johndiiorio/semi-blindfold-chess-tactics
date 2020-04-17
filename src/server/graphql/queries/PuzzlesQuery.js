const {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} = require('graphql-relay');
const { GraphQLPuzzle } = require('../nodes/Puzzle');

const {
  connectionType: PuzzleConnection,
  edgeType: PuzzleEdge,
} = connectionDefinitions({
  name: 'Puzzle',
  nodeType: GraphQLPuzzle,
});

const PuzzlesQuery = {
  type: PuzzleConnection,
  args: {
    ...connectionArgs,
  },
  resolve: async (root, { after, before, first, last }, { datasources }) => {
    const allPuzzles = await datasources.puzzles.getAll();
    return connectionFromArray(allPuzzles, {
      after,
      before,
      first,
      last,
    });
  },
};

module.exports = PuzzlesQuery;
