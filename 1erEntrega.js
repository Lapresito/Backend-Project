class ProductManager{
    constructor(){
        this.products = [];
        this.id = 1;
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
        return 'Product added succesfully';
    }
    getProductsById(id){

        let checkId = this.products.find((pId) => pId.id === id);
        if(!checkId){
            return "Not found"
        }
        return checkId;
    }

}

const productManager = new ProductManager();

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




// Tests
// console.log(productManager.addProduct(product1)) 
// console.log(productManager.addProduct(product2)) 
// console.log(productManager.getProducts())
// console.log(productManager.getProductsById(15))