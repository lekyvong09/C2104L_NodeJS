const express = require('express');
const path = require('path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('in shop.js', adminData.products);
    res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
});


module.exports = router;