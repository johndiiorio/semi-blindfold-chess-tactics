const db = require('./db');

const usersDatasource = args => ({
  getUserById: async id => {
    const user = await db.get('SELECT * FROM users WHERE id = ?', id);
    if (!user) {
      throw new Error('Invariant exception: No user found');
    }
    return user;
  },
});

module.exports = usersDatasource;
