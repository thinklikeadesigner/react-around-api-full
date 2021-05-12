const Card = require('../models/cards');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');
const Forbidden = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const {
    likes, name, link, createdAt,
  } = req.body;

  Card.create({
    likes,
    name,
    link,
    owner: req.user.id,
    createdAt,
  })
    .then((card) => {
      if (!card) throw new CastError('Invalid data');
      return res.send(card);
    })
    .catch(next);
};

module.exports.getCardId = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Card ID not found');
      return res.send(card);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((likes) => {
      if (!likes) throw new NotFoundError('Owner ID not found');
      return res.status(200).send(likes);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: {
        likes: req.user.id,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((likes) => {
      if (!likes) throw new NotFoundError('Owner ID not found');

      return res.status(200).send(likes);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Card ID not found');
      if (!card.owner.id === req.user.id) throw new Forbidden('Forbidden. User Id is invalid');
      return res.status(200).json({ message: 'Card deleted' });
    })
    .catch(next);
};
