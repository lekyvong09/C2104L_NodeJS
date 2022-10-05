const Product = require('../models/product');

exports.showAddProductForm = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product'
    });
}


exports.insertNewProduct = (req, res, next) => {
    const image = req.file;
    if (!image) {
        res.redirect('/admin/add-product');
        return;
    }

    const imageUrl = image.path;
    const product = new Product(req.body.title, imageUrl, req.body.description, req.body.price);
    product.save();
    res.redirect('/');
}


exports.listProduct = (req, res, next) => {
    const products = Product.fetchAll()
    res.render('admin/list-product', {pageTitle: 'List product', products: products});
}

exports.showEditProductForm = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle: 'Edit product'});
}

exports.updateProduct = (req, res, next) => {
    res.redirect('/');
}
