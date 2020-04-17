const {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('./nodes');

const GraphQLPuzzle = new GraphQLObjectType({
  name: 'Puzzle',
  fields: {
    id: globalIdField('Puzzle'),
    difficulty: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: puzzle => puzzle.difficulty,
    },
    startFen: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: puzzle => puzzle.startFen,
    },
    moves: {
      type: new GraphQLNonNull(
        GraphQLList(new GraphQLNonNull(GraphQLList(GraphQLString)))
      ),
      resolve: puzzle => puzzle.moves,
    },
  },
  interfaces: [nodeInterface],
});

module.exports = { GraphQLPuzzle };
