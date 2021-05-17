const NotFoundError = require('../errors/NotFoundError');

const User = require('../models/users');

// eslint-disable-next-line consistent-return
module.exports.getUsers = (req, res, next) => {
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
