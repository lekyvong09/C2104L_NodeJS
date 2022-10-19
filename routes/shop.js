const express = require('express');
const shopController = require('../controllers/shop-controller');

const router = express.Router();

// router.get('/checkout', shopController.checkout);
router.get('/cart', shopController.displayShoppingCart);

router.get('/', shopController.getProductList);
router.post('/cart', shopController.addItemToCart);
router.post('/cart-delete-item', shopController.deleteItemFromCart);

router.post('/checkout', shopController.checkout);
module.exports = router;