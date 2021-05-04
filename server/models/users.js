const mongoose = require('mongoose');
const validator = require('validator');

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
  },
});

module.exports = mongoose.model('users', userSchema);
