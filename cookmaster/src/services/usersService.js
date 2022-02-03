const Joi = require('joi');
const UserModel = require('../models/usersModel');
const { badRequest, conflict } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorHandling');

const {
  invalidEntries,
  alreadyRegistered,
} = require('../utils/dictionary/messagesDefault');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().required(),
});

const createUser = async (name, email, password, userRole) => {
  const { error } = userSchema.validate({ name, email, password });

  if (error) {
    throw errorConstructor(badRequest, invalidEntries);
  }

  const emailExists = await UserModel.findUserByEmail(email);

  if (emailExists) {
    throw errorConstructor(conflict, alreadyRegistered);
  }

  const role = userRole ? 'admin' : 'user';

  const userId = await UserModel.insertUser(name, email, password, role);

  const user = {
    _id: userId,
    name,
    email,
    role,
  };

  return { user };
};

module.exports = {
  createUser,
};
