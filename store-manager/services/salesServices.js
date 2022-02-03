const SalesModel = require('../models/salesModel');

const {
  validateData,
  validateIdSalesDelete,
  updateProductSold,
  updateProductCanceled,
  updateProductAltered,
} = require('../utils/functions/validateHandling');

const {
  unprocessableEntity,
  notFound,
} = require('../utils/dictionary/statusCode');
const {
  invalidDataOrnotExists: msg,
  invalidData,
  salesNotExists,
  notFoundMsg,
  salesIdFormat,
  stockProblem,
  stockProblemMsg,
} = require('../utils/dictionary/messagesDefault');
const errorConstuctor = require('../utils/functions/errorHandling');

async function getAll() {
  const sales = await SalesModel.getAll();
  if (!sales) {
    throw errorConstuctor(notFound, notFoundMsg, salesNotExists);
  }
  return { sales };
}

async function getById(id) {
  const sale = await SalesModel.getById(id);
  if (!sale) {
    throw errorConstuctor(notFound, notFoundMsg, salesNotExists);
  }
  return sale;
}

async function checkStock(sales, stock) {
  stock.forEach(({ _id, quantity }) => {
    const id = JSON.stringify(_id);
    sales.forEach((sale) => {
      const productId = JSON.stringify(sale.productId);
      if (id === productId && quantity < sale.quantity) {
        throw errorConstuctor(notFound, stockProblem, stockProblemMsg);
      }
    });
  });
}

async function create(sales) {
  const errorMsg = sales.map(({ quantity }) => validateData('names', quantity));

  if (errorMsg[0] !== undefined) {
    throw errorConstuctor(unprocessableEntity, invalidData, msg);
  }

  const salesId = await SalesModel.create(sales);
  await updateProductSold(salesId);

  const newSales = {
    _id: salesId,
    itensSold: sales,
  };
  return newSales;
}

async function update(id, sales) {
  const sale = await SalesModel.getById(id);
  if (!sale) {
    throw errorConstuctor(unprocessableEntity, invalidData, salesNotExists);
  }

  const errorMsg = sales.map(({ quantity }) => validateData('names', quantity));
  if (errorMsg[0] !== undefined) {
    throw errorConstuctor(unprocessableEntity, invalidData, msg);
  }

  await updateProductAltered(id, sales);

  const newSales = {
    _id: id,
    itensSold: await SalesModel.update(id, sales),
  };
  return newSales;
}

async function exclude(id) {
  const sale = await validateIdSalesDelete(id);
  if (!sale) {
    throw errorConstuctor(unprocessableEntity, invalidData, salesIdFormat);
  }

  await updateProductCanceled(id);
  await SalesModel.exclude(id);
  return sale;
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
  checkStock,
};
