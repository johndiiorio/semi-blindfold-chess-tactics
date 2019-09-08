const { fromGlobalId, nodeDefinitions } = require('graphql-relay');

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    // TODO implement
    return null;
  },
  obj => {
    // TODO implement
    return null;
  },
);

module.exports = {
  nodeInterface,
  nodeField,
};
