const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const User = require('./models/user')
const mongoose = require ('mongoose');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const exceptionController = require('./controllers/exception-controller');
const app = express();



/**
 * middleware /interceptor
 */
app.use(bodyParser.urlencoded({extended: false}));

const fileStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'images')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
});
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
}
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));

/// set template
app.set('view engine', 'ejs');
app.set('views', 'views'); /// tell Express the place to look for the views

app.use((req, res, next) => {
    User.findById('6352a3d3970f2e6b0e1967e9')
        .then(user => {
            req.user = user;
            /// console.log('req.user', req.user);
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(exceptionController.handle404);

mongoose.connect('mongodb+srv://root:ab123456..@cluster0.pgeminn.mongodb.net/c2104l_nodejs?retryWrites=true&w=majority')
    .then(() => {
        app.listen(3001);
        console.log('listening to port 3001');
    })
    .catch(err => console.log(err));
