// const { celebrate, Joi } = require('celebrate');
// const express = require('express');
// const {
//   createUser, login,
// } = require('./users');

// const router = express.Router();

// router.post('/signup', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//   }),
//   headers: Joi.object().keys({

//   }).unknown(true),
// }), createUser);
// // FIXME https://snipboard.io/HtmSY5.jpg registration and login routes should be named /signup and /signin respectively without /user keyword before. You can create seperate index file and keep signup and signin in seperate router.

// router.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//   }),
//   headers: Joi.object().keys({
//   }).unknown(true),
// }), login);
