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
    const product = new Product(null, req.body.title, imageUrl, req.body.description, req.body.price);
    product.save();
    res.redirect('/admin/list-product');
}


exports.listProduct = (req, res, next) => {
    const products = Product.fetchAll()
    res.render('admin/list-product', {pageTitle: 'List product', products: products});
}

exports.showEditProductForm = (req, res, next) => {
    const productId = req.params.productId;
    const product = Product.findById(productId);
    res.render('admin/edit-product', {
        pageTitle: 'Edit product',
        product: product
    });
}

exports.updateProduct = (req, res, next) => {
    let imageUrl = req.body.imageUrl;
    const image = req.file;

    if (image) {
        imageUrl = image.path;
    }

    const id = req.body.productId;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(id, title, imageUrl, description, price);
    product.save();
    res.redirect('/admin/list-product');
}
