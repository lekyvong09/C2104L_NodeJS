const mongodb = require('mongodb');
const { getDb } = require('../util/mongodb');
const Product = require('./product');


class User {
    constructor(_id, name, email, cart) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.cart = cart ? cart : {items: []};
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
        const updatedCartItems = [...this.cart.items];
        const indexExistingCartItem = this.cart.items.findIndex(item => item.productId.toString() === product._id.toString());

        let newQuantity = 1;

        if (indexExistingCartItem != -1) {
            newQuantity = this.cart.items[indexExistingCartItem].quantity + 1;
            updatedCartItems[indexExistingCartItem].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new mongodb.ObjectId(product._id),
                quantity: newQuantity
            });
        }

        const updatedCart = {items: updatedCartItems};
        // const updatedCart = {items:[{productId: new mongodb.ObjectId(product._id), quantity: 1}]};
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