const usersDatasource = require('./datasources/users');
const puzzlesDatasource = require('./datasources/puzzles');
const { getUser } = require('./authentication');

const buildContext = req => {
  const user = getUser(req);

  return {
    datasources: {
      users: usersDatasource({ user }),
      puzzles: puzzlesDatasource({ user }),
    },
  };
};

module.exports = buildContext;
