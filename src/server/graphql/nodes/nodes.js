const { fromGlobalId, nodeDefinitions } = require('graphql-relay');

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId, context) => {
    const { type, id } = fromGlobalId(globalId);
    const getNodeByTypeAndId = (type, id) => {
      switch (type) {
        case 'User':
          return context.users.getUserById(id);
        case 'Puzzle':
          return context.puzzles.getById(id);
        default:
          return null;
      }
    };
    return {
      ...getNodeByTypeAndId(type, id),
      globalId: id,
    };
  },
  obj => {
    // Import here to prevent circular dependency
    const { GraphQLUser } = require('./User');
    const { GraphQLPuzzle } = require('./Puzzle');

    let { type } = fromGlobalId(obj.globalId);
    switch (type) {
      case 'User':
        return GraphQLUser;
      case 'Puzzle':
        return GraphQLPuzzle;
      default:
        return null;
    }
  }
);

module.exports = {
  nodeInterface,
  nodeField,
};
