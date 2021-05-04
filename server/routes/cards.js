const express = require('express');

const router = express.Router();

const {
  getCards, createCard, getCardId, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.get('/cards/:cardId', getCardId);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
