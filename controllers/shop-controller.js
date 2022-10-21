const Product = require('../models/product');
const User = require('../models/user');

exports.getProductList = (req, res, next) => {
    Product.find()
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
            // console.log(result);
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}


exports.displayShoppingCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then(user => {
            console.log(user.cart.items);
            res.render('shop/cart', {
                pageTitle: 'Cart',
                cartItems: user.cart.items
            });
        })
        .catch(err => console.log(err));
}


exports.deleteItemFromCart = (req, res, next) => {
    const productId = req.body.productId;
    req.user.deleteItemFromCart(productId)
        .then(result => res.redirect('/cart'))
        .catch(err => console.log(err));
}

// exports.checkout = (req, res, next) => {
//     req.user.checkout()
//         .then(result => res.redirect('/order'))
//         .catch(err => console.log(err));
// }

