const jwt = require('jsonwebtoken');

const errorConstructor = require('../utils/functions/errorHandling');
const {
  infoToken,
  notFoundToken,
  authOnlyAdmin,
} = require('../utils/dictionary/messagesDefault');
const { unauthorized, forbidden } = require('../utils/dictionary/statusCode');

const secret = 'seusecretdetoken';

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw errorConstructor(unauthorized, notFoundToken);
  }

  try {
    const { data } = jwt.verify(token, secret);
    if (data.role !== 'admin') {
      return res.status(forbidden).json({ message: authOnlyAdmin });
    }
    req.user = data;
    req.role = 'admin';
    return next();
  } catch (error) {
    error.message = infoToken;
    error.status = unauthorized;
    return next(error);
  }
};
