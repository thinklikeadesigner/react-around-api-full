const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');
const Forbidden = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const User = require('../models/users');
const { generateToken } = require('../utils/jwt');
// const { isAuth } = require('../utils/jwt');

const SALT_ROUND = 10;

module.exports.createUser = (req, res, next) => { // _id will become accessible
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

// eslint-disable-next-line consistent-return
module.exports.getUsers = (req, res, next) => {
  // if (!isAuth(req.headers.authorization)) return res.status(401);
  User.find({})
    .then((users) => {
      if (!users) throw new NotFoundError('User ID not found');
      return res.send(users);
    })
    .catch(next);
};

module.exports.getUserId = (req, res, next) =>

// NOTE it has to be req.user.id here
  // eslint-disable-next-line implicit-arrow-linebreak
  User.findById(req.user.id)

    .then((user) => {
      if (!user) throw new NotFoundError('User ID not found');
      return res.send(user);
    })
    .catch(next);

module.exports.updateUser = (req, res, next) => {
  const {
    name, about,
  } = req.body;
  User.update({
    name,
    about,
  });
  User.findByIdAndUpdate(req.user.id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) throw new NotFoundError('User ID not found');
      return res.send(user);
    })
    .catch(next);
};
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.update({
    avatar,
  });
  User.findByIdAndUpdate(req.user.id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) throw new NotFoundError('User ID not found');
      return res.send(user);
    })
    .catch(next);
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
