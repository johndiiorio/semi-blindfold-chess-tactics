const { GraphQLObjectType } = require('graphql');
const {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} = require('graphql-relay');
const { nodeInterface } = require('./nodes');
const { GraphQLPuzzle } = require('./Puzzle');

const { connectionType: PuzzleConnection, edgeType: PuzzleEdge } = connectionDefinitions({
  name: 'Puzzle',
  nodeType: GraphQLPuzzle,
});

const GraphQLPuzzleSet = new GraphQLObjectType({
  name: 'PuzzleSet',
  fields: {
    id: globalIdField('PuzzleSet'),
    puzzles: {
      type: PuzzleConnection,
      args: {
        ...connectionArgs,
      },
      // resolve: (root, { status, after, before, first, last }) =>
      //   connectionFromArray([...getPuzzles()], {
      //     after,
      //     before,
      //     first,
      //     last,
      //   }),
    },
  },
  interfaces: [nodeInterface],
});

module.exports = { GraphQLPuzzleSet, PuzzleEdge };
