const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const errorHandler = require('./middlewares/errorHandler');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '646df21c1b61f7bc647ec642', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(userRouter);
app.use(cardRouter);
app.use(errorHandler);

// подключаемся к серверу mongo
mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line
  console.log(`App listening on port ${PORT}`);
});
