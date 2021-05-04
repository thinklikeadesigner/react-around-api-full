const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const re = /(http:\/\/|https:\/\/)(www.)?\S/gi;
        return re.test(v);
      },
      message: 'Please enter a valid URL',
    },
  },
});

module.exports = mongoose.model('users', userSchema);
