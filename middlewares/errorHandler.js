const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_NOT_FOUND,
} = require('node:http2').constants;
const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    // https://expressjs.com/en/guide/error-handling.html section: #The default error handler
    return next();
  }

  const isMongooseValidationError = err instanceof mongoose.Error.ValidationError;
  const isHttpBadRequestError = err.status === HTTP_STATUS_BAD_REQUEST;
  const isHttpNotFoundError = err.status === HTTP_STATUS_NOT_FOUND;

  if (isMongooseValidationError || isHttpBadRequestError) {
    return res.status(HTTP_STATUS_BAD_REQUEST).json({
      message: err.message,
    });
  }

  if (isHttpNotFoundError) {
    return res.status(HTTP_STATUS_NOT_FOUND).json({
      message: err.message,
    });
  }

  return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
    message: 'На сервере произошла ошибка',
    stack: err.stack,
  });
};

module.exports = errorHandler;
