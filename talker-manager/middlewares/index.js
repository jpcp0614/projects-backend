const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');
const login = require('./login');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const authoTalker = require('./authoTalker');
const {
  addTalker,
  validName,
  validAge,
  validTalk1,
  validTalk2,
} = require('./addTalker');
const editTalker = require('./editTalker');
const deleteTalker = require('./deleteTalker');
const searchTalker = require('./searchTalker');

const middlewares = {
  getAllTalkers,
  getTalkerById,
  login,
  validateEmail,
  validatePassword,
  authoTalker,
  addTalker,
  validName,
  validAge,
  validTalk1,
  validTalk2,
  editTalker,
  deleteTalker,
  searchTalker,
};

module.exports = middlewares;