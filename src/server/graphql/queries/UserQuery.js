const { GraphQLString } = require('graphql');
const { GraphQLUser } = require('../nodes/User');

const UserQuery = {
  type: GraphQLUser,
  args: {
    id: { type: GraphQLString },
  },
  resolve: (root, { id }, { datasources }) => datasources.users.getUserById(id),
};

module.exports = UserQuery;
