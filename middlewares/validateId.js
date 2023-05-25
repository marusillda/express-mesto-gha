const mongoose = require('mongoose');
const createError = require('http-errors');
const {
  HTTP_STATUS_BAD_REQUEST,
} = require('node:http2').constants;

const validateId = (req, res, next) => {
  const id = Object.values(req.params)[0];

  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(createError(HTTP_STATUS_BAD_REQUEST, 'Параметр не является идентификатором'));
  } else {
    next();
  }
};

module.exports = validateId;
