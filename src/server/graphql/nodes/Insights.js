const { GraphQLObjectType } = require('graphql');
const {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} = require('graphql-relay');
const { nodeInterface } = require('./nodes');
const { GraphQLInsight } = require('./Insight');

const { connectionType: InsightConnection, edgeType: InsightEdge } = connectionDefinitions({
  name: 'Insight',
  nodeType: GraphQLInsight,
});

const GraphQLInsights = new GraphQLObjectType({
  name: 'Insights',
  fields: {
    id: globalIdField('Insights'),
    insights: {
      type: InsightConnection,
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

module.exports = { GraphQLInsights, InsightEdge };
