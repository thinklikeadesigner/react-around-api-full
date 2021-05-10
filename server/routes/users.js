const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const {
  getUsers, createUser, getUserId, updateUser, updateAvatar, login,
} = require('../controllers/users');

router.post('/users/signup', createUser);
router.post('/users/signin', login);
router.get('/users', auth, getUsers);
router.get('/users/me', auth, getUserId);
router.patch('/users/me', auth, updateUser);
router.patch('/users/me/avatar', auth, updateAvatar);
module.exports = router;
