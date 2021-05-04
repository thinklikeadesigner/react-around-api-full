const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');

const app = express();
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: '606ba812d198c4cf35003969',
    // paste the _id of the test user created in the previous step
  };
  next();
});

app.use(express.json());
app.use(userRouter);
app.use(cardRouter);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT);
