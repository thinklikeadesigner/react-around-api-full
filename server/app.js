const cors = require('cors');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');

const { PORT = 3000 } = process.env;
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(userRouter);
app.use(cardRouter);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

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

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT);
