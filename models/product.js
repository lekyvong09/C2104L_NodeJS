const products = [];

module.exports = class Product {
    constructor(title, imageUrl) {
        this.title = title;
        this.imageUrl = imageUrl;
    }

    /// product1 = new Product('book 1');
    /// product1.save() ==> products.push(product1)
    save() {
        products.push(this);
    }

    /// Product.fetchAll()
    static fetchAll() {
        return products;
    }
}