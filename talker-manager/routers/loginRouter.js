const router = require('express').Router();

const {
  login,
  validateEmail,
  validatePassword,
} = require('../middlewares');

// Requisito 3
router.post('/', validateEmail, validatePassword, login);

module.exports = router;

// 3. npm test login.test.js / http GET :3000/login

// npm test login.test.js / http POST :3000/login email=email@email.com password=123456