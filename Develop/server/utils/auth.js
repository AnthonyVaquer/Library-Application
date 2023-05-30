const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req) {
    const authorizationHeader = req.headers['authorization'];
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1];

    try {
      const decodedToken = jwt.verify(token, secret);
      req.userId = decodedToken.data._id;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  } else {
    throw new Error('Authorization header not found');
  }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
