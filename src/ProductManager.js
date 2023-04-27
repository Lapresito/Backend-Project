const fs = require("fs");


class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.id = 1;
        try {
            const productsString = fs.readFileSync(this.path, "utf-8");
            this.products = JSON.parse(productsString);
            this.id = this.products[this.products.length - 1]?.id + 1 ?? 1;
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.log('File not found!');
            } else {
                throw err;
            }
        }


    }
    getProducts() {
        return this.products;
    }
    async addProduct(product) {

        let checkCode = this.products.some((pCode) => pCode.code === product.code);
        if (checkCode) {
            throw new Error('Already exists a product with that code');
        }
        if (!product.code || !product.title || !product.description || !product.price || !product.thumbnail || !product.stock) {
            throw new Error('Empty fields, please add all the statements');
        }

        let newProduct = {
            id: this.id,
            ...product
        };
        this.products.push(newProduct);
        this.id++;
        const productsString = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, productsString);
        return console.log('Product added succesfully');
    }
    getProductsById(id) {

        let checkId = this.products.find((pId) => pId.id === id);
        if (!checkId) {
            throw new Error("Invalid id, not found")
        }
        return checkId;
    }
    async updateProducts(id, product) {
        let index = this.products.findIndex((pId) => pId.id === id);
        if (index === -1) {
            throw new Error('Not found')
        } else {
            product.id = id
            this.products.splice(index, 1, product);
        }
        const productsString = JSON.stringify(this.products);
        fs.promises.writeFile(this.path, productsString);
        return console.log(`The product with id: ${id} was updated succesfully!`);
    }
    async deleteProduct(id) {
        let index = this.products.findIndex((pId) => pId.id === id);
        if (index === -1) {
            throw new Error('Cannot delete. Not found')
        } else {
            this.products.splice(index, 1);
        }
        const productsString = JSON.stringify(this.products);
        fs.promises.writeFile(this.path, productsString);
        return console.log(`The product with id: ${id} was deleted succesfully!`);
    }
}

// const productManager = new ProductManager("products.json");

module.exports = ProductManager