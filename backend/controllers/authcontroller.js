const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');
const Forbidden = require('../errors/ForbiddenError');

const User = require('../models/users');
const { generateToken } = require('../utils/jwt');

const SALT_ROUND = 10;

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, password, email,
  } = req.body;

  if (!password || !email) return res.status(400).send({ message: 'email or password should not be empty!' });

  return User.findOne({ email }).then((exists) => {
    if (exists) throw new Forbidden('you already exist!');
    return bcrypt.hash(password, SALT_ROUND)
      .then((hash) => (User.create({
        name,
        about,
        avatar,
        password: hash,
        email,
      })))
      .then((user) => res.status(201).send({
        id: user._id,
        email: user.email,
      }))
      .catch(next);
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)

    .then((user) => {
      if (!user) throw new AuthError('Authorization Error');
      const token = generateToken(user._id);

      return res.send({ token });
      // console.log(`${user._id} user id and token ${token}`);
    })
    .catch(next);
};

// COMPLETE https://snipboard.io/HtmSY5.jpg registration and login routes should be named /signup and /signin respectively without /user keyword before. You can create seperate index file and keep signup and signin in seperate router.
