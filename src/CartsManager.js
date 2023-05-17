const fs = require("fs");
const ProductManager = require('./ProductManager.js');

const productManager = new ProductManager('./src/products.json');


class CartsManager {
    constructor(path) {
        this.path = path;
    }
    async readDataFile() {
        try {
            if (fs.existsSync(this.path)) {
                const cartsString = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(cartsString)
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
    // verificar
    async addCart() {
        try {
            let carts = await this.readDataFile();
            let id = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
            carts.push({
                id,
                products: []
            });
            let newCart = carts.find((cId) => cId.id === id);
            const cartsString = JSON.stringify(carts, null, 2);
            await fs.promises.writeFile(this.path, cartsString);
            console.log('Cart was created succesfully');
            return newCart
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getCartById(id) {
        try {
            let carts = await this.readDataFile()
            let checkId = carts.find((cId) => cId.id === id);
            if (!checkId) {
                throw new Error("Invalid id, cart not found");
            }
            return checkId;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addProductToCart(productId, cartId) {
        try {
          let carts = await this.readDataFile();
          let productsFile = await productManager.readDataFile();
      
          // verificar si el producto existe
          let checkPId = productsFile.find((pId) => pId.id === productId);
          if (!checkPId) {
            throw new Error("Invalid id, product not found");
          }
      
          // agregar o actualizar producto en el carrito
          let foundCart = carts.find((c) => c.id === cartId);
          if (foundCart) {
            let findedProduct = foundCart.products.find((p) => p.id === productId);
            if (findedProduct) {
              findedProduct.quantity += 1;
            } else {
              foundCart.products.push({
                id: productId,
                quantity: 1,
              });
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            console.log(`Product ${productId} was added succesfully to cart ${cartId}`);
          } else {
            throw new Error("Invalid id, cart not found");
          }
        } catch (error) {
          throw new Error(error.message);
        }
      }
    
      //no implementado aun
    async deleteCart(id) {
        try {
            let carts = await this.readDataFile();
            let index = carts.findIndex((cId) => cId.id === id);
            if (index === -1) {
                throw new Error('Cannot delete. Not found');
            } else {
                carts.splice(index, 1);
            }
            const cartsString = JSON.stringify(carts);
            await fs.promises.writeFile(this.path, cartsString);
            console.log(`The cart with id: ${id} was deleted succesfully!`);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProductFromCart(productId, cartId){
        try {
            let carts = await this.readDataFile();
            let productsFile = await productManager.readDataFile();
        
            // verificar si el producto existe
            let checkPId = productsFile.find((pId) => pId.id === productId);
            if (!checkPId) {
              throw new Error("Invalid id, product not found");
            }
        
            // quitar o actualizar producto en el carrito
            let findedCart = carts.find((c) => c.id === cartId);
            if (findedCart) {
              let findedProduct = findedCart.products.find((p) => p.id === productId);
              if (findedProduct) {
                if(findedProduct.quantity === 1){
                    findedCart.products.splice(findedCart.products.indexOf(findedProduct), 1);
                }else{
                    findedProduct.quantity -= 1;
                }
              } else {
                throw new Error(`Product with id: ${productId} was not found in the cart with id:${cartId}`)
              }
              await fs.promises.writeFile(this.path, JSON.stringify(carts));
              console.log(`Product ${productId} was deleted succesfully from cart ${cartId}`);
            } else {
              throw new Error("Invalid id, cart not found");
            }
          } catch (error) {
            throw new Error(error.message);
          }
    }
}
module.exports = CartsManager