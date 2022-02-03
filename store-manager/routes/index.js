const express = require('express');

const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const {
  createSales,
  getAllSales,
  getByIdSales,
  updateSales,
  deleteSales,
} = require('../controllers/salesController');

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

router.post('/sales', createSales);
router.get('/sales', getAllSales);
router.get('/sales/:id', getByIdSales);
router.put('/sales/:id', updateSales);
router.delete('/sales/:id', deleteSales);

module.exports = router;
