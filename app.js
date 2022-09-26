const express = require('express');

const bodyParser = require('body-parser');

const app = express();


/**
 * middleware /interceptor
 */
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    console.log('always run');
    next();
});

app.get('/', (req, res, next) => {
    console.log('in /');
    res.send('<h1>Homepage</h1>');
});

app.get('/add-product', (req, res, next) => {
    console.log('in add-product');
    res.send('<form action="/product" method="POST"><input type="text" name="title"/><button type="submit">Add Product</button></form>');
});

app.post('/product', (req, res, next) => {
    console.log('/product', req.body.title);
});


app.listen(3001);