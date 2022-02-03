const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function getAll() {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
}

async function getById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  return db.collection('products').findOne(ObjectId(id));
}

async function getByName(name) {
  const db = await connection();
  const query = await db.collection('products').findOne({ name });
  return query;
}

async function create(name, quantity) {
  const db = await connection();
  const { insertedId } = await db
    .collection('products')
    .insertOne({ name, quantity });
  return insertedId;
}

async function update(id, name, quantity) {
  const db = await connection();
  await db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return { _id: id, name, quantity };
}

async function exclude(id) {
  const db = await connection();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
}

module.exports = {
  create,
  getByName,
  getAll,
  getById,
  update,
  exclude,
};
