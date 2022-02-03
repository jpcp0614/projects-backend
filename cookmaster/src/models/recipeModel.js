const { ObjectId } = require('mongodb');
const connect = require('./connection');

const insertRecipe = async (recipeInfo) => {
  const db = await connect();
  const { insertedId } = await db.collection('recipes').insertOne(recipeInfo);
  return insertedId;
};

const findAllRecipes = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const findRecipesById = async (id) => {
  const db = await connect();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const updateRecipe = async (id, recipe) => {
  const db = await connect();
  await db
    .collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { ...recipe } });
};

const deleteRecipe = async (id) => {
  const db = await connect();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  insertRecipe,
  findAllRecipes,
  findRecipesById,
  updateRecipe,
  deleteRecipe,
};
