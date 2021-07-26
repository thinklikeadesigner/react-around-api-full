/* eslint-disable consistent-return */
const Redis = require('redis');
const Card = require('../models/cards');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');

const DEFAULT_EXPIRATION = 3600;

const redisClient = Redis.createClient();

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((data) => {
      redisClient.get('cards', (error, cards) => {
        if (cards != null) {
          console.log('cache hit');
          return res.json(JSON.parse(cards));
        }
        console.log('cache miss');
        redisClient.setex('cards', DEFAULT_EXPIRATION, JSON.stringify(data));
        res.send(data);
      });
    })
    // .then((cards) => )
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
      redisClient.setex('cards', DEFAULT_EXPIRATION, JSON.stringify(card));
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
      if (!card.owner.toString() === req.user.id) throw new CastError(' User Id is invalid');
      return res.status(200).json({ message: 'Card deleted' });
    })
    .catch(next);
};

/* COMPLETE https://snipboard.io/a2cide.jpg you are trying to compare a
string to an object. The value of card.owner._id will be an object,
please convert it to a string before comparing. An example of a
conditional statement if (req.user._id === data.owner._id.toString ()).
Note comparison of objects in javascript is implemented by reference and
not by value, I highly recommend reading this
https://dmitripavlutin.com/how-to-compare-objects-in-javascript/. This is
a common mistake for beginner js developers. */
