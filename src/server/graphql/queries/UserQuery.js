const { GraphQLString } = require('graphql');
const { GraphQLUser } = require('../nodes/User');
const { getUserById } = require('../../models/users');

const UserQuery = {
  type: GraphQLUser,
  args: {
    id: { type: GraphQLString },
  },
  resolve: (root, { id }) => getUserById(id),
};

module.exports = UserQuery;
