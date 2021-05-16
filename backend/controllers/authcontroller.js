// const bcrypt = require('bcryptjs');

// const SALT_ROUND = 10;
// const ForbiddenError = require('../errors/ForbiddenError');
// const AuthError = require('../errors/AuthError');
// const { generateToken } = require('../utils/jwt');
// const User = require('../models/users');

// module.exports.createUser = (req, res, next) => {
//   const {
//     name, about, avatar, password, email,
//   } = req.body;

//   if (!password || !email) return res.status(400)
// .send({ message: 'email or password should not be empty!' });

//   return User.findOne({ email }).then((exists) => {
//     if (exists) throw new ForbiddenError('you already exist!');
//     return bcrypt.hash(password, SALT_ROUND)
//       .then((hash) => (User.create({
//         name,
//         about,
//         avatar,
//         password: hash,
//         email,
//       })))
//       .then((user) => res.status(201).send({
//         id: user._id,
//         email: user.email,
//       }))
//       .catch(next);
//   });
// };
// // FIXME https://snipboard.io/GBsmWj.jpg Server doesn't respond when I create duplicate user. When creating a user with an email that already exists in the database, you must return an error with the status code 409 (Conflict) instead of 500. You can catch the error by using err.name = MongoError and err.code = 11000.

// module.exports.login = (req, res, next) => {
//   const { email, password } = req.body;

//   return User.findUserByCredentials(email, password)

//     .then((user) => {
//       if (!user) throw new AuthError('Authorization Error');
//       const token = generateToken(user._id);

//       return res.send({ token });
//       // console.log(`${user._id} user id and token ${token}`);
//     })
//     .catch(next);
// };
