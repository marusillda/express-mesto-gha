const mongoose = require('mongoose');
const createError = require('http-errors');

const validateId = (req, res, next) => {
  const id = Object.values(req.param)[0];

  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(createError(400, 'Параметр не является идентификатором'));
  }

  next();
};

module.exports = validateId;
