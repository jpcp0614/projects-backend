const jwt = require('jsonwebtoken');

const errorConstructor = require('../utils/functions/errorHandling');
const {
  infoToken,
  notFoundToken,
} = require('../utils/dictionary/messagesDefault');
const { unauthorized } = require('../utils/dictionary/statusCode');

const secret = 'seusecretdetoken';

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw errorConstructor(unauthorized, notFoundToken);
  }

  try {
    const { data } = jwt.verify(token, secret);
    req.user = data;
    return next();
  } catch (error) {
    error.message = infoToken;
    error.status = unauthorized;
    return next(error);
  }
};
