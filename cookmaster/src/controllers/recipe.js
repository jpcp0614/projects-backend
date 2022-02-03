const RecipeService = require('../services/recipeService');
const {
  created,
  success,
  noContent,
} = require('../utils/dictionary/statusCode');

const createRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipe = {
    name,
    ingredients,
    preparation,
    userId: _id,
  };

  try {
    const newRecipe = await RecipeService.createRecipe(recipe);
    return res.status(created).json(newRecipe);
  } catch (error) {
    console.error(`POST CREATE_RECIPE -> ${error.message}`);
    return next(error);
  }
};

const getAllRecipes = async (_req, res, next) => {
  try {
    const recipes = await RecipeService.getAllRecipes();
    return res.status(success).json(recipes);
  } catch (error) {
    console.error(`GET ALL_RECIPES -> ${error.message}`);
    return next(error);
  }
};

const getRecipeByID = async (req, res, next) => {
  const { id } = req.params;

  try {
    const recipe = await RecipeService.getRecipeByID(id);
    return res.status(success).json(recipe);
  } catch (error) {
    console.error(`GET RECIPES_BY_ID -> ${error.message}`);
    return next(error);
  }
};

const upadateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const recipe = req.body;
    const recipeUpadated = await RecipeService.uptadeRecipe(id, recipe, _id);
    return res.status(success).json(recipeUpadated);
  } catch (error) {
    console.error(`PUT RECIPES_UPDATE -> ${error.message}`);
    return next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    await RecipeService.deleteRecipe(id);
    return res.status(noContent).json();
  } catch (error) {
    console.error(`DELETE RECIPES -> ${error.message}`);
    return next(error);
  }
};

const addImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { filename } = req.file;
    const recipe = await RecipeService.addImage(id, filename);
    return res.status(success).json(recipe);
  } catch (error) {
    console.error(`PUT IMAGE_RECIPE -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeByID,
  upadateRecipe,
  deleteRecipe,
  addImage,
};
