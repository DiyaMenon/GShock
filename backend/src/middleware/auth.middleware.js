const ApiError = require('../utils/ApiError');
const httpStatus = require('../constants/httpStatus');

const authMiddleware = (req, res, next) => {
  // Implement your authentication logic here (e.g., JWT verification).
  // For now, this is a placeholder that allows all requests through.

  // Example if you later want to enforce auth:
  // if (!req.user) {
  //   return next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
  // }

  return next();
};

module.exports = authMiddleware;

