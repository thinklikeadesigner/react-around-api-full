const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ApiError = require('../errors/api-error');
const User = require('../models/users');

const apiError = new ApiError();

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'CastError') {
        apiError.castError(res, 'Invalid ID error');
      } else if (err.name === 'ValidationError') {
        apiError.castError(res, 'Invalid data error');
      }
      apiError.internalServerError(res, 'Internal server error');
    });
};

module.exports.createUser = (req, res) => { // _id will become accessible
  const {
    name, about, avatar, password, email,
  } = req.body;

  bcrypt.hash(password, 10)
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
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.id)
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
      apiError.internalServerError(res, 'Internal server error');
    });
};

module.exports.updateUser = (req, res) => {
  const {
    name, about,
  } = req.body;
  User.update({
    name,
    about,
  });
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        apiError.notFound(res, 'User ID not found');
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        apiError.castError(res, 'Invalid Card ID error');
      } else if (err.name === 'ValidationError') {
        apiError.validationError(res, 'Invalid data error');
      }
      apiError.internalServerError(res, 'Internal server error');
    });
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.update({
    avatar,
  });
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        apiError.notFound(res, 'User ID not found');
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        apiError.castError(res, 'Invalid Card ID error');
      } else if (err.name === 'ValidationError') {
        apiError.validationError(res, 'Invalid data error');
      }
      apiError.internalServerError(res, 'Internal server error');
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)

    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;

      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
