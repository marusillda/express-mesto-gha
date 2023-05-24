const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  handleValidationError(err, req, res);
  handleNotFoundError(err, req, res);
  handleInternalError(err, req, res);
}

const handleValidationError = (err, req, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).json({
      message: err.message
    });
  }
}

const handleNotFoundError = (err, req, res) => {
  if (err.name === 'NotFoundError') {
    res.status(404).json({
      message: err.message
    });
  }
}

const handleInternalError = (err, req, res) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

module.exports = errorHandler;