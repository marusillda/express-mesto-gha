const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./routes/index');

const errorHandler = require('./middlewares/errorHandler');
const notFoundPath = require('./middlewares/notFoundPath');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.use(router);
app.use(errors());
app.use(notFoundPath);

app.use(errorHandler);

// подключаемся к серверу mongo
mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line
  console.log(`App listening on port ${PORT}`);
});
