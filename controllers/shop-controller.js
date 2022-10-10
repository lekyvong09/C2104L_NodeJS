const Product = require('../models/product');

exports.getProductList = (req, res, next) => {
    Product.fetchAll()
        .then(result => {
            res.render('shop/product-list', {
                pageTitle: 'Shop',
                products: result,
                path: '/'
            });
        })
        .catch(err => console.log(err));
}

exports.shoppingCart = (req, res, next) => {
    res.render('shop/cart', {pageTitle: 'Shopping cart', path: '/cart'});
}

exports.checkout = (req, res, next) => {
    res.render('shop/checkout', {pageTitle: 'Checkout'});
}