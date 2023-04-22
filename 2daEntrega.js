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
            return 'Already exists a product with that code';
        }
        if (!product.code || !product.title || !product.description || !product.price || !product.thumbnail || !product.stock) {
            return 'Empty fields, please add all the statements';
        }

        let newProduct = {
            id: this.id,
            ...product
        };
        this.products.push(newProduct);
        this.id++;
        const productsString = JSON.stringify(this.products, null, 2);
      await  fs.promises.writeFile(this.path, productsString);
        return console.log('Product added succesfully');
    }
    getProductsById(id) {

        let checkId = this.products.find((pId) => pId.id === id);
        if (!checkId) {
            return "Not found"
        }
        return checkId;
    }
    async updateProducts(id, product) {
        let index = this.products.findIndex((pId) => pId.id === id);
        if (index === -1) {
            return "Not found"
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
            return "Not found"
        } else {
            this.products.splice(index, 1);
        }
        const productsString = JSON.stringify(this.products);
        fs.promises.writeFile(this.path, productsString);
        return console.log(`The product with id: ${id} was deleted succesfully!`);
    }
}

const productManager = new ProductManager("products.json");

// Productos de prueba

const product1 = {
    title: "Remera Zombie",
    description: "Remera talle L con diseño de zombie",
    price: 300,
    thumbnail: "https://static.dafiti.com.ar/p/osiris-3471-36331-1-product.jpg",
    code: 'asd123',
    stock: 28
}
const product2 = {
    title: "Remera Zombie2",
    description: "Remera talle M con diseño de zombie",
    price: 280,
    thumbnail: "https://static.dafiti.com.ar/p/osiris-3471-36331-1-product.jpg",
    code: 'asd1234',
    stock: 25
}
const product3 = {
    title: "Remera Zombie3",
    description: "Remera talle S con diseño de zombie",
    price: 240,
    thumbnail: "https://static.dafiti.com.ar/p/osiris-3471-36331-1-product.jpg",
    code: 'asd12324',
    stock: 20
}




// Tests
// podes cambiar el product1 2 o 3
async function funcionsinsentido(){ // init application
 console.log(await productManager.addProduct(product3))
}
funcionsinsentido()
    // productManager.addProduct(product3).then(response => {
    //     console.log(response)
    // }).catch(err => {
    //     console.log(err)
    // })
// productManager.addProduct(product2)
// productManager.addProduct(product3)
// productManager.updateProducts(1,product1)
// productManager.deleteProduct(1)
// console.log(productManager.addProduct(product2)) 
// console.log(productManager.getProducts())
// console.log(productManager.getProductsById(1))