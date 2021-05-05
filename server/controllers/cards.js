const ApiError = require('../errors/api-error');
const Card = require('../models/cards');

const apiError = new ApiError();

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'CastError') {
        apiError.castError(res, 'Invalid Card ID error');
      } else if (err.name === 'ValidationError') {
        apiError.validationError(res, 'Invalid data error');
      }
      apiError.internalServerError(res, 'Internal server error');
    });
};

module.exports.createCard = (req, res) => {
  const {
    likes, name, link, createdAt,
  } = req.body;

  Card.create({
    likes,
    name,
    link,
    owner: req.user._id,
    createdAt,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        apiError.castError(res, 'Invalid Card ID error');
      } else if (err.name === 'ValidationError') {
        apiError.validationError(res, 'Invalid data error');
      }
      apiError.internalServerError(res, 'Internal server error');
    });
};

module.exports.getCardId = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        apiError.notFound(res, 'Card ID not found');
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        apiError.castError(res, 'Invalid Card ID error');
      } else if (err.name === 'ValidationError') {
        apiError.validationError(res, 'Invalid data error');
      }
      apiError.internalServerError(res, 'Internal server error');
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((likes) => {
      if (!likes) {
        apiError.notFound(res, 'Owner ID not found');
        return;
      }
      res.status(200).send(likes);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        apiError.castError(res, 'Invalid Card ID error');
      } else if (err.name === 'ValidationError') {
        apiError.validationError(res, 'Invalid data error');
      }
      apiError.internalServerError(res, 'Internal server error');
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((likes) => {
      if (!likes) {
        apiError.notFound(res, 'Owner ID not found');
        return;
      }
      res.status(200).send(likes);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        apiError.castError(res, 'Invalid Card ID error');
      } else if (err.name === 'ValidationError') {
        apiError.validationError(res, 'Invalid data error');
      }
      apiError.internalServerError(res, 'Internal server error');
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        apiError.notFound(res, 'Card ID not found');
      } else if (!card.owner._id === req.user._id) {
        apiError.forbidden(res, 'Forbidden. User Id is invalid');
      }
      res.status(200).json({ message: 'Card deleted' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        apiError.castError(res, 'Invalid Card ID error');
      } else if (err.name === 'ValidationError') {
        apiError.validationError(res, 'Invalid data error');
      }
      apiError.internalServerError(res, 'Internal server error');
    });
};
