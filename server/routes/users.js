const express = require('express');

const router = express.Router();

const {
  getUsers, createUser, getUserId, updateUser, updateAvatar, login,
} = require('../controllers/users');

router.get('/users', getUsers);
router.post('/users/signup', createUser);
router.post('/users/signin', login);
router.get('/users/:id', getUserId);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);
module.exports = router;
