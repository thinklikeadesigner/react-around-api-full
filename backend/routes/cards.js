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
    cardId: Joi.string().hex().length(24),
  }),
  headers: Joi.object().keys({
    // validate headers
  }).unknown(true),
}), likeCard);
router.delete('/cards/likes/:cardId', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
  // FIXME https://snipboard.io/zoGunt.jpg Please note that It is necessary to validate the ObjectID not just as a sequence of characters with 24 symbols, but as a hex sequence with 24 symbols (fortunately, Joi has a built-in hex validator). Change alphanum() to hex(). Note: I may attach only one screen, but you need to find all similar cases inside the project and fix them to receive points.

  headers: Joi.object().keys({
    // validate headers
  }).unknown(true),
}), dislikeCard);
router.delete('/cards/:cardId', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
  headers: Joi.object().keys({
    // validate headers
  }).unknown(true),
}), deleteCard);

module.exports = router;

// COMPLETE https://snipboard.io/zoGunt.jpg Please note that It is necessary
// to validate the ObjectID not just as a sequence of characters with 24 symbols,
// but as a hex sequence with 24 symbols (fortunately, Joi has a
// built-in hex validator). Change alphanum() to hex(). Note: I may
// attach only one screen, but you need to find all similar cases
// inside the project and fix them to receive points.
