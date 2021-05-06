const jwt = require('jsonwebtoken');
const User = require('../models/users');

const { NODE_ENV, JWT_SECRET } = process.env;

const generateToken = (id) => jwt.sign(
  { id },
  NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' },
);

const isAuth = (token) => jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
  console.log(`this is decoded token: ${decodedToken}`);
  if (err) return false;
  return User.findOne({ _id: decodedToken.id }).then((user) => Boolean(user));
});

module.exports = { generateToken, isAuth };
