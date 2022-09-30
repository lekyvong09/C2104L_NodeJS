const express = require('express');
const path = require('path');

const router = express.Router();

const products = [];

/// /admin/add-product
router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
    res.render('add-product', {pageTitle: 'Add product'});
});

router.post('/add-product', (req, res, next) => {
    products.push({
        title: req.body.title
    });
    res.redirect('/');
});


module.exports.routes = router;
exports.products = products;