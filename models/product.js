const products = [];

module.exports = class Product {
    constructor(title) {
        this.title = title;
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