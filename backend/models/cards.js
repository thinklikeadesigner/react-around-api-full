const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: false,
    },
  ],
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: false,
    validate: {
      validator(v) {
        const re = /(http:\/\/|https:\/\/)(www.)?\S/gi;
        return re.test(v);
      },
      message: 'Please enter a valid URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
