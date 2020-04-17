const {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} = require('graphql-relay');

const { GraphQLInsight } = require('../nodes/Insight');

const {
  connectionType: InsightConnection,
  edgeType: InsightEdge,
} = connectionDefinitions({
  name: 'Insight',
  nodeType: GraphQLInsight,
});

const InsightsQuery = {
  type: InsightConnection,
  args: {
    ...connectionArgs,
  },
  resolve: async (root, { after, before, first, last }, { datasources }) => {
    const allInsights = await datasources.insights.getAll();
    return connectionFromArray(allInsights, {
      after,
      before,
      first,
      last,
    });
  },
};

module.exports = InsightsQuery;
