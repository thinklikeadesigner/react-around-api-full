const cors = require('cors');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const authRouter = require('./routes/authRoute');

const { PORT = 3000 } = process.env;
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(userRouter);
app.use(cardRouter);
app.use(authRouter);
app.use(errorLogger);
app.use('/', () => {
  throw new NotFoundError('requested resource not found');
});
// FIXME https://snipboard.io/0Rad1t.jpg Middleware for handling an unknown route, violates the principle of centralized error handling. Instead of returning a response directly, it should throw an appropriate exception.

// COMPLETE https://snipboard.io/0Rad1t.jpg Middleware for handling an unknown route,
// violates the principle of centralized error handling. Instead of
// returning a response directly, it should throw an appropriate exception.

app.use(errors());

app.use((err, req, res, next) => {
  // if an error has no status, display 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // check the status and display a message based on it
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message,
    });
  next();
});
// FIXME (OPTIONAL) https://snipboard.io/gxcGkq.jpg error handling can be placed in a separate file

// FIXME I recommend using https://www.npmjs.com/package/express-rate-limit to limit the number of requests. To protect against DoS attacks. You can learn more about DoS attacks here https://www.youtube.com/watch?v=BcDZS7iYNsA

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT);
