const products = [];


exports.showAddProductForm = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product'
    });
}


exports.insertNewProduct = (req, res, next) => {
    products.push({
        title: req.body.title
    });
    res.redirect('/');
}


exports.getProductList = (req, res, next) => {
    res.render('shop', {
        pageTitle: 'Shop',
        products: products,
        path: '/'
    })
}