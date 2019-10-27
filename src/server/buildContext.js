const usersDatasource = require('./datasources/users');
const puzzlesDatasource = require('./datasources/puzzles');
const insightsDatasource = require('./datasources/insights');
const { getUser } = require('./authentication');

const buildContext = req => {
  const user = getUser(req);

  return {
    datasources: {
      users: usersDatasource({ user }),
      puzzles: puzzlesDatasource({ user }),
      insights: insightsDatasource({ user }),
    },
  };
};

module.exports = buildContext;
