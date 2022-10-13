const Product = require('../models/product');
const mongodb = require('mongodb');

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
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(null, title, price, description, imageUrl);
    product.save()
        .then(result => {
            res.redirect('/admin/list-product');
        })
        .catch(err => console.log(err));
}


exports.listProduct = (req, res, next) => {
    Product.fetchAll()
        .then(data => {
            res.render('admin/list-product', {
                pageTitle: 'List product', 
                products: data
            });
        });

}

exports.showEditProductForm = (req, res, next) => {
    const productId = req.params.productId;
    console.log(productId);
    Product.findById(productId)
        .then(result => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit product',
                product: result
            });
        })
        .catch(err => console.log(err));
    
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

    const product = new Product(id, title, price, description, imageUrl);
    product.save()
        .then(result => res.redirect('/admin/list-product'))
        .catch(err => console.log(err));
}

exports.deleteProduct = (req, res, next) => {
    Product.deleteById(req.body.productId)
        .then(result => res.redirect('/admin/list-product'))
        .catch(err => console.log(err));
}
