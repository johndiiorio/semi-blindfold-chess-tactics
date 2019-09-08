const { GraphQLNonNull, GraphQLObjectType, GraphQLString } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('./nodes');
const { GraphQLUser } = require('./User');

const GraphQLTopScore = new GraphQLObjectType({
  name: 'TopScore',
  fields: {
    id: globalIdField('TopScore'),
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      // resolve: () => {},
    },
    cursorMovements: {
      type: new GraphQLNonNull(GraphQLString),
      // resolve: () => {},
    },
  },
  interfaces: [nodeInterface],
});

module.exports = { GraphQLTopScore };
