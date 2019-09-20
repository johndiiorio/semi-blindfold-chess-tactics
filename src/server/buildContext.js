const users = require('./datasources/users');
const puzzles = require('./datasources/puzzles');

const buildContext = req => ({
  datasources: {
    users,
    puzzles,
  },
});

module.exports = buildContext;
