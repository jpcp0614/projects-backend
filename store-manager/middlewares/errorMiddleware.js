const { serverError } = require('../utils/dictionary/statusCode');

const errorMiddleware = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ err: err.message });
  }

  return res.status(serverError).json({ message: 'Internal Server Error' });
};

module.exports = errorMiddleware;
