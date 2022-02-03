const SalesService = require('../services/salesServices');
const ProductService = require('../services/productServices');
const { success } = require('../utils/dictionary/statusCode');

const getAllSales = async (_req, res, next) => {
  try {
    const sales = await SalesService.getAll();
    res.status(success).json(sales);
  } catch (err) {
    console.log(`GET ALL_SALES -> ${err.message}`);
    return next(err);
  }
};

const getByIdSales = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sale = await SalesService.getById(id);
    res.status(success).json(sale);
  } catch (err) {
    console.log(`GET FIND_BYID_SALES -> ${err.message}`);
    return next(err);
  }
};

const createSales = async (req, res, next) => {
  const sales = req.body;
  try {
    const { products } = await ProductService.getAll();
    await SalesService.checkStock(sales, products);
    const newSales = await SalesService.create(sales);
    res.status(success).json(newSales);
  } catch (err) {
    console.log(`POST CREATE_SALES-> ${err.message}`);
    return next(err);
  }
};

const updateSales = async (req, res, next) => {
  const sales = req.body;
  const { id } = req.params;
  try {
    const newSales = await SalesService.update(id, sales);
    res.status(success).json(newSales);
  } catch (err) {
    console.log(`PUT UPDATE_SALES -> ${err.message}`);
    return next(err);
  }
};

const deleteSales = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sale = await SalesService.exclude(id);
    res.status(success).json(sale);
  } catch (err) {
    console.log(`DELETE BYID_SALES -> ${err.message}`);
    return next(err);
  }
};

module.exports = {
  createSales,
  getAllSales,
  getByIdSales,
  updateSales,
  deleteSales,
};
