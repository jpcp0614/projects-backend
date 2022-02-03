const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function getAll() {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
}

async function getById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  return db.collection('sales').findOne(ObjectId(id));
}

async function create(itensSold) {
  const db = await connection();
  const { insertedId } = await db.collection('sales').insertOne({ itensSold });
  return insertedId;
}

async function update(id, sales) {
  const db = await connection();
  sales.forEach(async ({ productId, quantity }) => {
    await db
      .collection('sales')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { 'itensSold.$[elemento].quantity': quantity } },
        { arrayFilters: [{ 'elemento.productId': productId }] },
      );
  });
  return sales;
}

async function exclude(id) {
  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
}

module.exports = {
  getAll,
  create,
  getById,
  update,
  exclude,
};
