const UserService = require('../services/usersService');
const { created } = require('../utils/dictionary/statusCode');

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const { role } = req;

  try {
    const newUser = await UserService.createUser(name, email, password, role);
    return res.status(created).json(newUser);
  } catch (error) {
    console.error(`POST CREATE_USER -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  createUser,
};
