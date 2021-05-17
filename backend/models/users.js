const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const AuthError = require('../errors/AuthError');

function isEmailValid(emailInput) {
  return validator.isEmail(emailInput);
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator(v) {
        const re = /(http:\/\/|https:\/\/)(www.)?\S/gi;
        return re.test(v);
      },
      message: 'Please enter a valid URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: isEmailValid,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Incorrect email or password'));
          }

          return user; // now user is available
        });
    });
};

// COMPLETE https://snipboard.io/epiEsK.jpg If the email and/or password is not correct,
// the login controller should return 401 status.
// More about 401 status you can learn here
//  https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401

module.exports = mongoose.model('users', userSchema);
