const Joi = require('joi');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/usersModel');

const { unauthorized } = require('../utils/dictionary/statusCode');
const {
  fieldsRequired,
  incorrectEntries,
} = require('../utils/dictionary/messagesDefault');
const errorConstructor = require('../utils/functions/errorHandling');

const loginSchema1 = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginSchema2 = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().required(),
});

const secret = 'seusecretdetoken';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const login = async (email, password) => {
  const valid1 = loginSchema1.validate({ email, password });

  if (valid1.error) {
    throw errorConstructor(unauthorized, fieldsRequired);
  }

  const valid2 = loginSchema2.validate({ email, password });

  const user = await UserModel.findUserByEmail(email);

  if (!user || valid2.error || user.password !== password) {
    throw errorConstructor(unauthorized, incorrectEntries);
  }

  const { password: passBD, ...userWithoutPassword } = user;

  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);

  return { token };
};

module.exports = {
  login,
};
