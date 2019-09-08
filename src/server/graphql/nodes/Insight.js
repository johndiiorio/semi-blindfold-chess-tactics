const { GraphQLObjectType, GraphQLNonNull } = require('graphql');
const {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} = require('graphql-relay');
const { nodeInterface } = require('./nodes');
const { GraphQLTopScore } = require('./TopScore');
const { GraphQLPuzzle } = require('./Puzzle');

const { connectionType: TopScoreConnection, edgeType: TopScoreEdge } = connectionDefinitions({
  name: 'TopScore',
  nodeType: GraphQLTopScore,
});

const GraphQLInsight = new GraphQLObjectType({
  name: 'Insight',
  fields: {
    id: globalIdField('Insight'),
    puzzle: {
      type: new GraphQLNonNull(GraphQLPuzzle),
      // resolve: () => {},
    },
    topScores: {
      type: TopScoreConnection,
      args: {
        ...connectionArgs,
      },
      // resolve: (root, { status, after, before, first, last }) =>
      //   connectionFromArray([...getInsights()], {
      //     after,
      //     before,
      //     first,
      //     last,
      //   }),
    },
  },
  interfaces: [nodeInterface],
});

module.exports = { GraphQLInsight, TopScoreEdge };
