const express = require('express');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middleware/auth');

const router = express.Router();

const {
  getCards, createCard, getCardId, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    }),
    headers: Joi.object().keys({
    // validate headers
    }).unknown(true),
  }), createCard);
router.get('/cards/:cardId', getCardId);
router.put('/cards/likes/:cardId', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    // validate headers
  }).unknown(true),
}), likeCard);
router.delete('/cards/likes/:cardId', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    // validate headers
  }).unknown(true),
}), dislikeCard);
router.delete('/cards/:cardId', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    // validate headers
  }).unknown(true),
}), deleteCard);

module.exports = router;
