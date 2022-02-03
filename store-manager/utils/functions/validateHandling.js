const Joi = require('joi');
const { ObjectId } = require('mongodb');
const connection = require('../../models/connection');

const SalesModel = require('../../models/salesModel');
const errorConstuctor = require('./errorHandling');

const { unprocessableEntity, notFound } = require('../dictionary/statusCode');

const {
  invalidData,
  salesNotExists,
  notFoundMsg,
  salesIdFormat,
} = require('../dictionary/messagesDefault');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const validateData = (name, quantity) => {
  const { error } = productSchema.validate({ name, quantity });

  const msg = error && error.message.replace('greater', 'larger');

  return msg;
};

const validateIdSales = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw errorConstuctor(notFound, notFoundMsg, salesNotExists);
  }
  const sale = await SalesModel.getById(id);
  if (!sale) {
    throw errorConstuctor(notFound, notFoundMsg, salesNotExists);
  }
  return sale;
};

const validateIdSalesDelete = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw errorConstuctor(unprocessableEntity, invalidData, salesIdFormat);
  }
  const sale = await SalesModel.getById(id);
  if (!sale) {
    throw errorConstuctor(unprocessableEntity, invalidData, salesIdFormat);
  }
  return sale;
};

async function decrement(productId, quantity) {
  const db = await connection();
  await db
    .collection('products')
    .updateOne({ _id: ObjectId(productId) }, { $inc: { quantity: -quantity } });
}

async function increment(productId, quantity) {
  const db = await connection();
  await db
    .collection('products')
    .updateOne({ _id: ObjectId(productId) }, { $inc: { quantity: +quantity } });
}

async function updateProductSold(id) {
  const { itensSold } = await SalesModel.getById(id);

  itensSold.forEach(async ({ productId, quantity }) => {
    await decrement(productId, quantity);
  });
}

async function updateProductCanceled(id) {
  const { itensSold } = await SalesModel.getById(id);
  itensSold.forEach(async ({ productId, quantity }) => {
    await increment(productId, quantity);
  });
}

async function updateProductAltered(id, sales) {
  const { itensSold } = await SalesModel.getById(id);
  let dif = 0;

  itensSold.forEach(({ productId, quantity }) => {
    sales.forEach(async (sale) => {
      if (productId === sale.productId && quantity < sale.quantity) {
        dif = sale.quantity - quantity;
        await decrement(productId, dif);
      }
    });
  });

  itensSold.forEach(({ productId, quantity }) => {
    sales.forEach(async (sale) => {
      if (productId === sale.productId && quantity > sale.quantity) {
        dif = quantity - sale.quantity;
        await increment(productId, dif);
      }
    });
  });
}

module.exports = {
  validateData,
  validateIdSales,
  validateIdSalesDelete,
  updateProductSold,
  updateProductCanceled,
  updateProductAltered,
};
