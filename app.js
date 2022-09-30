const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();


/**
 * middleware /interceptor
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));

/// set template
app.set('view engine', 'ejs');
app.set('views', 'views'); /// tell Express the place to look for the views


app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

/// 404.html
app.use((req, res, next) => {
    res.render('404', {pageTitle: 'Page not found'});
});


app.listen(3001);