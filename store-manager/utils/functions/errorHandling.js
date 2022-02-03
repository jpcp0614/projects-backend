module.exports = (status, code, message) => ({
  status,
  message: { code, message },
});
