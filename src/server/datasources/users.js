const db = require('./db');

const getUserById = async id => {
  console.log(id);
  const user = await db.get('SELECT * FROM users WHERE id = ?', id);
  if (!user) {
    throw new Error('Invariant exception: No user found');
  }
  return user;
};

module.exports = { getUserById };
