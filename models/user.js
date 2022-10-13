const mongodb = require('mongodb');
const { getDb } = require('../util/mongodb');
const Product = require('./product');


class User {
    constructor(_id, name, email, cart) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.cart = cart; /// {items: []}
    }

    save() {
        const db = getDb();
        return db.collection('users')
            .insertOne(this)
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }

    addToCart(product) {
        const db = getDb();
        const updatedCart = {items:[{...product, quantity: 1}]};
        // console.log('updatedCart', updatedCart);
        // Product.findById(product._id).then(product => console.log(product)).catch(err => console.log(err));
        return db.collection('users').updateOne(
            {_id: new mongodb.ObjectId(this._id)},
            {$set: {cart: updatedCart}}
        );
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users')
            .find({_id: new mongodb.ObjectId(userId)})
            .next()
            .then(user => {
                return user;
            })
            .catch(err => console.log(err));
    }
}
module.exports = User;