const { GraphQLInsights } = require('../nodes/Insights');

const InsightsQuery = {
  type: GraphQLInsights,
  // resolve: (root, { id }) => {}
};

module.exports = InsightsQuery;
