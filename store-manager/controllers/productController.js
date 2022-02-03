const ProductService = require('../services/productServices');
const { created, success } = require('../utils/dictionary/statusCode');

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  try {
    const newProduct = await ProductService.create(name, quantity);
    res.status(created).json(newProduct);
  } catch (err) {
    console.log(`POST CREATE_PRODUCT -> ${err.message}`);
    return next(err);
  }
};

const getAllProducts = async (_req, res, next) => {
  try {
    const products = await ProductService.getAll();
    res.status(success).json(products);
  } catch (err) {
    console.log(`GET FIND_ALL_PRODUCT -> ${err.message}`);
    return next(err);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await ProductService.getById(id);
    res.status(success).json(product);
  } catch (err) {
    console.log(`GET FIND_BYID_PRODUCT -> ${err.message}`);
    return next(err);
  }
};

const updateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  try {
    const newProduct = await ProductService.update(id, name, quantity);
    res.status(success).json(newProduct);
  } catch (err) {
    console.log(`PUT UPDATE_PRODUCT -> ${err.message}`);
    return next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await ProductService.exclude(id);
    res.status(success).json(product);
  } catch (err) {
    console.log(`DELETE BYID_PRODUCT -> ${err.message}`);
    return next(err);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getById,
  updateProduct,
  deleteProduct,
};
