const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const { nodeField } = require('./nodes/nodes');

const UserQuery = require('./queries/UserQuery');
const PuzzleSetQuery = require('./queries/PuzzleSetQuery');
const InsightsQuery = require('./queries/InsightsQuery');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: UserQuery,
    puzzleSet: PuzzleSetQuery,
    insights: InsightsQuery,
    node: nodeField,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {},
});

module.exports = new GraphQLSchema({
  query: Query,
  // mutation: Mutation,
});
