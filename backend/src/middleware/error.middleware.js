const ApiError = require('../utils/ApiError');
const httpStatus = require('../constants/httpStatus');

const notFoundHandler = (req, res, next) => {
  const error = new ApiError(httpStatus.NOT_FOUND, 'Route not found');
  return next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};

