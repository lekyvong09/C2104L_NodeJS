const express = require('express');
const path = require('path');
const adminData = require('./admin');
const productController = require('../controllers/product-controller');

const router = express.Router();

router.get('/', productController.getProductList);


module.exports = router;