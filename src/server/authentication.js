const jwt = require('jsonwebtoken');

const getToken = req => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      return token;
    }
  }
  return null;
};

const getUser = req => {
  const token = getToken(req);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SBCT_TOKEN_SECRET);
      return decoded.user;
    } catch (err) {}
  }
  return null;
};

module.exports = {
  getUser,
};
