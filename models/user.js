const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
    },
    cart: {
        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number },
            }
        ]
    }
});


userSchema.methods.addToCart = function (product) {
    const updatedCartItems = this.cart.items ? [...this.cart.items] : [];
    const indexExistingCartItem = this.cart.items ? this.cart.items.findIndex(item => item.productId.toString() === product._id.toString()) : -1;

    let newQuantity = 1;

    if (indexExistingCartItem != -1) {
        newQuantity = this.cart.items[indexExistingCartItem].quantity + 1;
        updatedCartItems[indexExistingCartItem].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: new mongoose.Types.ObjectId(product._id),
            quantity: newQuantity
        });
    }

    const updatedCart = {items: updatedCartItems};

    this.cart = updatedCart;
    // const updatedCart = {items:[{productId: new mongodb.ObjectId(product._id), quantity: 1}]};
    return this.save();
}

userSchema.methods.deleteItemFromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId);

    this.cart.items = updatedCartItems;
    return this.save();
}


module.exports = mongoose.model('User', userSchema);

// class User {
//     constructor(_id, name, email, cart) {
//         this._id = _id;
//         this.name = name;
//         this.email = email;
//         this.cart = cart ? cart : {items: []};
//     }

//     save() {
//         const db = getDb();
//         return db.collection('users')
//             .insertOne(this)
//             .then(result => console.log(result))
//             .catch(err => console.log(err));
//     }

    // getCart() {
    //     const db = getDb();
    //     const arrayOfProductId = this.cart.items ? this.cart.items.map(i => i.productId) : [];
        
    //     return db.collection('products')
    //         .find({_id: {$in: arrayOfProductId}})
    //         .toArray()
    //         .then(
    //             products => {
    //                 return products.map(product => {
    //                     let cartItem = this.cart.items.find(i => i.productId.toString() === product._id.toString());
    //                     return {...product, quantity: cartItem.quantity};
    //                 });
    //             }
    //         );
    // }

//     deleteItemFromCart(productId) {
//         const db = getDb();
//         const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId);

//         return db.collection('users').updateOne(
//             {_id: new mongodb.ObjectId(this._id)},
//             { $set: {cart: {items: updatedCartItems}}}
//         );
//     }

//     checkout() {
//         const db = getDb();
//         return db.collection('orders')
//             .insertOne(this.cart)
//             .then(result => {
//                 this.cart = {items: []};
//                 return db.collection('users').updateOne(
//                     {_id: new mongodb.ObjectId(this._id)},
//                     {$set: {cart: this.cart}}
//                 )
//                 .then(result => console.log(result));
//             })
//             .catch(err => console.log(err));
//     }

//     static findById(userId) {
//         const db = getDb();
//         return db.collection('users')
//             .find({_id: new mongodb.ObjectId(userId)})
//             .next()
//             .then(user => {
//                 return user;
//             })
//             .catch(err => console.log(err));
//     }
// }
// module.exports = User;