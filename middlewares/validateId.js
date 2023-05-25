const mongoose = require('mongoose');
const createError = require('http-errors');

const validateId = (req, res, next) => {
  const id = Object.values(req.params)[0];

  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(createError(400, 'Параметр не является идентификатором'));
  } else {
    next();
  }
};

module.exports = validateId;
