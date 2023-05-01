const fs = require("fs");


class ProductManager {
    constructor(path) {
        this.path = path;
    }
    async readDataFile(){
        try {
            if(fs.existsSync(this.path)){
                const productsString = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(productsString)
            }
            await fs.promises.writeFile(this.path, JSON.stringify([]));
            return [];
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.log('File not found!');
            } else {
                throw err;
            }
        }
        
    }
    async getProducts() {
        return  await this.readDataFile();
    }
    async addProduct(product) {

        try {
            let products = await this.readDataFile()
            let checkCode = products.some((pCode) => pCode.code === product.code);
            if (checkCode) {
                throw new Error('Already exists a product with that code');
            }
            if (!product.code || !product.title || !product.description || !product.price || !product.thumbnail || !product.stock) {
                throw new Error('Empty fields, please add all the statements');
            }

            let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

            products.push({
                id,
                ...product
            });

            const productsString = JSON.stringify(products, null, 2);
            await fs.promises.writeFile(this.path, productsString);
            console.log('Product added succesfully');
        } catch (error) {
            throw new Error(error.message)
        }

    }
    async getProductsById(id) {
        try {
            let products = await this.readDataFile()
            let checkId = products.find((pId) => pId.id === id);
            if (!checkId) {
                throw new Error("Invalid id, not found")
            }
            return checkId;
            
        } catch (error) {
            throw new Error(error.message)
        }

    }
    async updateProducts(id, product) {
        try {
            let products = await this.readDataFile()

            if (!product.code || !product.title || !product.description || !product.price || !product.thumbnail || !product.stock) {
                throw new Error('Empty fields, please add all the statements');
            }
    
            let index = products.findIndex((pId) => pId.id === id);
            if (index === -1) {
                throw new Error('Not found')
            } else {
                delete product.id;
                products.splice(index, 1, {id, ...product});

            }
            const productsString = JSON.stringify(products);
            await fs.promises.writeFile(this.path, productsString);
            console.log(`The product with id: ${id} was updated succesfully!`);
            
        } catch (error) {
            throw new Error(error.message)
        }
        
    }
    async deleteProduct(id) {
        try {
            let products = await this.readDataFile()
            let index = products.findIndex((pId) => pId.id === id);
            if (index === -1) {
                throw new Error('Cannot delete. Not found')
            } else {
                products.splice(index, 1);
            }
            const productsString = JSON.stringify(products);
            await fs.promises.writeFile(this.path, productsString);
            console.log(`The product with id: ${id} was deleted succesfully!`);
            
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
module.exports = ProductManager