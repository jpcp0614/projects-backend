const { createUser } = require('./users');
const { login } = require('./login');
const {
  createRecipe,
  getAllRecipes,
  getRecipeByID,
  upadateRecipe,
  deleteRecipe,
  addImage,
} = require('./recipe');

module.exports = {
  createUser,
  login,
  createRecipe,
  getAllRecipes,
  getRecipeByID,
  upadateRecipe,
  deleteRecipe,
  addImage,
};
