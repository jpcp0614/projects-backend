const Joi = require('joi');
const { ObjectId } = require('mongodb');

const RecipeModel = require('../models/recipeModel');

const { badRequest, notFound } = require('../utils/dictionary/statusCode');
const {
  invalidEntries,
  notFoundMsg,
} = require('../utils/dictionary/messagesDefault');
const errorConstructor = require('../utils/functions/errorHandling');

const userSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const createRecipe = async (recipeInfo) => {
  const { name, ingredients, preparation } = recipeInfo;
  const { error } = userSchema.validate({ name, ingredients, preparation });
  if (error) {
    throw errorConstructor(badRequest, invalidEntries);
  }
  const recipeId = await RecipeModel.insertRecipe(recipeInfo);

  const recipe = { _id: recipeId, ...recipeInfo };
  return { recipe };
};

const getAllRecipes = async () => {
  const recipes = await RecipeModel.findAllRecipes();
  if (!recipes) {
    throw errorConstructor(notFound, notFoundMsg);
  }
  return recipes;
};

const getRecipeByID = async (id) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, notFoundMsg);
  const recipe = await RecipeModel.findRecipesById(id);
  if (!recipe) {
    throw errorConstructor(notFound, notFoundMsg);
  }
  return recipe;
};

const uptadeRecipe = async (id, recipe, userId) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, notFoundMsg);
  const { error } = userSchema.validate(recipe);
  if (error) {
    throw errorConstructor(badRequest, invalidEntries);
  }
  await RecipeModel.updateRecipe(id, recipe);
  return { _id: id, ...recipe, userId };
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, notFoundMsg);

  const recipe = await getRecipeByID(id);
  if (!recipe) {
    throw errorConstructor(notFound, notFoundMsg);
  }
  await RecipeModel.deleteRecipe(id);
};

const addImage = async (id, image) => {
  const recipe = await getRecipeByID(id);

  const recipeUpdated = {
    ...recipe,
    image: `localhost:3000/src/uploads/${image}`,
  };
  await RecipeModel.updateRecipe(id, recipeUpdated);
  return recipeUpdated;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeByID,
  uptadeRecipe,
  deleteRecipe,
  addImage,
};
