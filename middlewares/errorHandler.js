const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  }

  switch (err.name) {
    case 'ValidationError':
      res.status(400).json({
        message: err.message,
      });
      break;
    case 'NotFoundError':
      res.status(404).json({
        message: err.message,
      });
      break;
    default:
      res.status(500).json({
        message: err.message,
        stack: err.stack,
      });
  }
};

module.exports = errorHandler;
