const { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('./nodes');

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    username: {
      type: new GraphQLNonNull(GraphQLString),
      // resolve: () => {},
    },
    rating: {
      type: new GraphQLNonNull(GraphQLInt),
      // resolve: () => {},
    },
  },
  interfaces: [nodeInterface],
});

module.exports = { GraphQLUser };
