const { serverError } = require('../utils/dictionary/statusCode');
const { serverErrorMsg } = require('../utils/dictionary/messagesDefault');

module.exports = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(serverError).json({ message: serverErrorMsg });
};
