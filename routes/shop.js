const express = require('express');
const shopController = require('../controllers/shop-controller');

const router = express.Router();

// router.get('/checkout', shopController.checkout);
// router.get('/cart', shopController.shoppingCart);

router.get('/', shopController.getProductList);
router.post('/cart', shopController.addItemToCart);

module.exports = router;