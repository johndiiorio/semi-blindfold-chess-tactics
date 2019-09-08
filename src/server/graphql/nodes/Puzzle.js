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
      // resolve: () => {},
    },
    startFen: {
      type: new GraphQLNonNull(GraphQLString),
      // resolve: () => {},
    },
    moves: {
      type: new GraphQLNonNull(GraphQLList(new GraphQLNonNull(GraphQLString))),
      // resolve: () => {},
    },
  },
  interfaces: [nodeInterface],
});

module.exports = { GraphQLPuzzle };
