const { getDb } = require("../util/mongodb");
const mongodb = require('mongodb');


class Product {
    constructor(_id, title, price, description, imageUrl) {
        this._id = _id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDb();
        return db.collection('products')
                    .insertOne(this)
                    .then(result => console.log(result))
                    .catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
                    .find()
                    .toArray()
                    .then(product => {
                        // console.log(product);
                        return product;
                    })
                    .catch(err => console.log(err));
    }

    static findById(productId) {
        const db = getDb();
        return db.collection('products')
                    .find({_id: new mongodb.ObjectId(productId) })
                    .next()
                    .then(product => {
                        console.log(product);
                        return product;
                    })
                    .catch(err => console.log(err));
    }
}

module.exports = Product;