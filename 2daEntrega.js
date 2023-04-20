const fs = require("fs");

class ProductManager{
    constructor(path){
        this.path = path;
        this.products = [];
        this.id = 1;
        try{
            const productsString = fs.readFileSync(this.path, "utf-8");
            this.products = JSON.parse(productsString);
            this.id = this.products[this.products.length - 1].id + 1;
        }
        catch(err){
            if (err.code === 'ENOENT') {
                console.log('File not found!');
              } else {
                throw err;
              }
            console.log('Error');
        }

        
    }
    getProducts(){
        return this.products; 
    }
    addProduct(product){
        
        let checkCode = this.products.some((pCode) => pCode.code === product.code);
        if(checkCode){
            return 'Already exists a product with that code';
        }
        if(!product.code || !product.title || !product.description || !product.price || !product.thumbnail || !product.stock){
            return 'Empty fields, please add all the statements';
        }
    
        let newProduct = {...product, id: this.id};
        this.products.push(newProduct);
        this.id++;
        const productsString = JSON.stringify(this.products);
        fs.writeFileSync(this.path, productsString);
        return 'Product added succesfully';
    }
    getProductsById(id){

        let checkId = this.products.find((pId) => pId.id === id);
        if(!checkId){
            return "Not found"
        }
        return checkId;
    }
    updateProducts(){
        //trabajar con array y despues escribir archivo
        //fs.writeFileSync(this.path, productsString); Guardar en el JSON
    }
    deleteProduct(){
        //trabajar con array y despues escribir archivo
        //fs.writeFileSync(this.path, productsString); Guardar en el JSON
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
    stock: 30
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
    price: 250,
    thumbnail: "https://static.dafiti.com.ar/p/osiris-3471-36331-1-product.jpg",
    code: 'asd12324',
    stock: 20
}




// Tests
productManager.addProduct(product3)
// console.log(productManager.addProduct(product2)) 
// console.log(productManager.getProducts())
// console.log(productManager.getProductsById(15))