const createError = require('http-errors');

const notFoundPath = (req, res, next) => {
  next(createError(404, 'Запрошенный путь не найден'));
};

module.exports = notFoundPath;
