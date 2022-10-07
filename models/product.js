let products = [];

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    /// product1 = new Product('book 1');
    /// product1.save() ==> products.push(product1)
    save() {
        if (this.id) {
            // update
            const existingProductIndex = products.findIndex(product => product.id == this.id);
            const updatedProduct = [...products];
            updatedProduct[existingProductIndex] = {...this};
            products = updatedProduct;
        } else {
            // insert new product
            this.id = Math.random();
            products.push(this);
        }
    }

    /// Product.fetchAll()
    static fetchAll() {
        return products;
    }

    static findById(id) {
        return products.find(product => product.id == id);
    }

    static delete(id) {
        const index = products.findIndex(i => i.id == id);
        if (index > -1) {
            products.splice(index, 1);
        }
    }
}