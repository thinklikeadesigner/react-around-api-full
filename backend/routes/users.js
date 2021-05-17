const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const auth = require('../middleware/auth');

const {
  getUsers, getUserId, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getUserId);

router.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
  headers: Joi.object().keys({

  }).unknown(true),
}),
updateUser);
router.patch('/users/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
  headers: Joi.object().keys({

  }).unknown(true),
}), updateAvatar);

module.exports = router;
