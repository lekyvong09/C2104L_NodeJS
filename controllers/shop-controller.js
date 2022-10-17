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

exports.addItemToCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product);
        }).then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(err => console.log(err));
}

// exports.checkout = (req, res, next) => {
//     res.render('shop/checkout', {pageTitle: 'Checkout'});
// }

exports.displayShoppingCart = (req, res, next) => {
    req.user.getCart()
        .then(result => {
            // console.log(result);
            res.render('shop/cart', {
                pageTitle: 'Cart',
                cartItems: result
            });
        })
}