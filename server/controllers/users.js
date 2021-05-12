const bcrypt = require('bcryptjs');
const ApiError = require('../errors/api-error');
const User = require('../models/users');
const { generateToken } = require('../utils/jwt');
// const { isAuth } = require('../utils/jwt');

const apiError = new ApiError();
const SALT_ROUND = 10;

module.exports.createUser = (req, res) => { // _id will become accessible
  const {
    name, about, avatar, password, email,
  } = req.body;

  if (!password || !email) return res.status(400).send({ message: 'email or password should not be empty!' });

  return User.findOne({ email }).then((exists) => {
    if (exists) {
      return res.status(403).send({ message: 'you already exist!' });
    }
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
      .catch((err) => {
        if (err.name === 'CastError') {
          apiError.castError(res, 'Invalid ID error');
        } else if (err.name === 'ValidationError') {
          apiError.castError(res, 'Invalid data error');
        }
        apiError.internalServerError(res, 'Internal server error');
      });
  });
};

// eslint-disable-next-line consistent-return
module.exports.getUsers = (req, res) => {
  // if (!isAuth(req.headers.authorization)) return res.status(401);
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        apiError.castError(res, 'Invalid ID error');
      } else if (err.name === 'ValidationError') {
        apiError.castError(res, 'Invalid data error');
      }
      apiError.internalServerError(res, 'Internal server error');
    });
};

module.exports.getUserId = (req, res) =>

// NOTE it has to be req.user.id here
  // eslint-disable-next-line implicit-arrow-linebreak
  User.findById(req.user.id)

    .then((user) => {
      if (!user) {
        apiError.notFound(res, 'User ID not found');
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        apiError.castError(res, 'Invalid Card ID error');
      } else if (err.name === 'ValidationError') {
        apiError.validationError(res, 'Invalid data error');
      }
      res.status(500).json('internal server error');
    });

module.exports.updateUser = (req, res) => {
  const {
    name, about,
  } = req.body;
  User.update({
    name,
    about,
  });
  User.findByIdAndUpdate(req.user.id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        apiError.notFound(res, 'User ID not found');
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        apiError.castError(res, 'Invalid Card ID error');
      } else if (err.name === 'ValidationError') {
        apiError.validationError(res, 'Invalid data error');
      }
      res.status(500).json('internal server error');
    });
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.update({
    avatar,
  });
  User.findByIdAndUpdate(req.user.id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        apiError.notFound(res, 'User ID not found');
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        apiError.castError(res, 'Invalid Card ID error');
      } else if (err.name === 'ValidationError') {
        apiError.validationError(res, 'Invalid data error');
      }
      res.status(500).json('internal server error');
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)

    .then((user) => {
      const token = generateToken(user._id);

      res.send({ token });
      // console.log(`${user._id} user id and token ${token}`);
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
