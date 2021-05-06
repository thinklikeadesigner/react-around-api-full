const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

const {
  getCards, createCard, getCardId, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', auth, createCard);
router.get('/cards/:cardId', getCardId);
router.put('/cards/likes/:cardId', auth, likeCard);
router.delete('/cards/likes/:cardId', auth, dislikeCard);

module.exports = router;
