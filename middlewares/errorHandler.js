const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_NOT_FOUND,
} = require('node:http2').constants;

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    // https://expressjs.com/en/guide/error-handling.html section: #The default error handler
    return next();
  }

  switch (err.name) {
    case 'ValidationError':
    case 'BadRequestError':
      return res.status(HTTP_STATUS_BAD_REQUEST).json({
        message: err.message,
      });
    case 'NotFoundError':
      return res.status(HTTP_STATUS_NOT_FOUND).json({
        message: err.message,
      });
    default:
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
        message: err.message,
        stack: err.stack,
      });
  }
};

module.exports = errorHandler;
