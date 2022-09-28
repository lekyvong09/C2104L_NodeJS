const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();


/**
 * middleware /interceptor
 */
app.use(bodyParser.urlencoded({extended: false}));


app.use('/admin', adminRoutes);
app.use(shopRoutes);

/// 404.html
app.use((req, res, next) => {
    res.send('<h1>Page not found</h1>');
});


app.listen(3001);