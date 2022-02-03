const ProductModel = require('../models/productsModel');
const { validateData } = require('../utils/functions/validateHandling');

const { unprocessableEntity } = require('../utils/dictionary/statusCode');
const {
  exists,
  invalidData,
  notExists,
} = require('../utils/dictionary/messagesDefault');
const errorConstuctor = require('../utils/functions/errorHandling');

async function create(name, quantity) {
  const productExists = (await ProductModel.getByName(name)) || false;
  if (productExists) {
    throw errorConstuctor(unprocessableEntity, invalidData, exists);
  }

  const errorMsg = validateData(name, quantity);
  if (errorMsg) {
    throw errorConstuctor(unprocessableEntity, invalidData, errorMsg);
  }

  const productId = await ProductModel.create(name, quantity);

  const newProduct = {
    _id: productId,
    name,
    quantity,
  };
  return newProduct;
}

async function getAll() {
  const products = await ProductModel.getAll();
  if (!products) {
    throw errorConstuctor(unprocessableEntity, invalidData, notExists);
  }
  return { products };
}

async function getById(id) {
  const product = await ProductModel.getById(id);
  if (!product) {
    throw errorConstuctor(unprocessableEntity, invalidData, notExists);
  }
  return product;
}

async function update(id, name, quantity) {
  const product = await ProductModel.getById(id);
  if (!product) {
    throw errorConstuctor(unprocessableEntity, invalidData, notExists);
  }
  const errorMsg = validateData(name, quantity);
  if (errorMsg) {
    throw errorConstuctor(unprocessableEntity, invalidData, errorMsg);
  }
  const productAltered = await ProductModel.update(id, name, quantity);
  return productAltered;
}

async function exclude(id) {
  const product = await ProductModel.getById(id);
  if (!product) {
    throw errorConstuctor(unprocessableEntity, invalidData, notExists);
  }
  await ProductModel.exclude(id);
  return product;
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
