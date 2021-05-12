const ApiError = require('../errors/api-error');
const Card = require('../models/cards');

const apiError = new ApiError();

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
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

  // NOTE it needs to be .id not ._id

  Card.create({
    likes,
    name,
    link,
    owner: req.user.id,
    createdAt,
  })
    .then((card) => {
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

// NOTE very important, add auth to all routes that need user id

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },
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
        likes: req.user.id,
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
      } else if (!card.owner.id === req.user.id) {
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
