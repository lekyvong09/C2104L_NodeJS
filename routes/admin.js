const express = require('express');
const path = require('path');
const productController = require('../controllers/product-controller');

const router = express.Router();


/// /admin/add-product
router.get('/add-product', productController.showAddProductForm);
router.get('/edit-product/:productId', productController.showEditProductForm);
router.get('/list-product', productController.listProduct);

router.post('/add-product', productController.insertNewProduct);
// router.post('/edit-product', productController.updateProduct);
// router.post('/delete-product', productController.deleteProduct);


module.exports = router;