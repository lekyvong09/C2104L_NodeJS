const express = require('express');
const path = require('path');
const productController = require('../controllers/product-controller');

const router = express.Router();


/// /admin/add-product
router.get('/add-product', productController.showAddProductForm);

router.post('/add-product', productController.insertNewProduct);


module.exports = router;