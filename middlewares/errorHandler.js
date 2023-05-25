const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  switch (err.name) {
    case 'ValidationError':
    case 'BadRequestError':
      return res.status(400).json({
        message: err.message,
      });
    case 'NotFoundError':
      return res.status(404).json({
        message: err.message,
      });
    default:
      return res.status(500).json({
        message: err.message,
        stack: err.stack,
      });
  }
};

module.exports = errorHandler;
