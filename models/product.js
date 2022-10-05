const products = [];

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
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