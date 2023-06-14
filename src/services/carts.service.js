import { CartModel } from "../dao/models/carts.model.js";
import { ProductService } from "./products.service.js";
const productService = new ProductService();

export class CartService{

    async getAll(){
        try {
            const carts = await CartModel.find({});
            return carts;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async addCart(){
        try {
            let newCart = await CartModel.create({
                products: []
            })
            console.log('Cart was created succesfully');
            return newCart;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getCartById(_id){
        try {
            const cart = await CartModel.findOne({ _id }).populate('products.idProduct');
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteCart(_id){
      try {
        await CartModel.updateOne({ _id }, {products: []});
        const cart = await this.getCartById(_id)
        return cart;   
      } catch (error) {
          throw new Error(error.message);
      }
  }
    async addProductToCart(productId, cartId) {
        try {
          let carts = await this.getAll();
          let checkCId = carts.find((cId)=> cId._id.equals(cartId));
          if(!checkCId){
            throw new Error("Invalid id, cart not found");
          }
          let cart = await CartModel.findOne({ _id: cartId });
          console.log(cart)
          let existingProduct = cart.products.find((pId) => pId.idProduct.equals(productId));
      
          if (existingProduct) {
            existingProduct.quantity += 1;
          } else {
            cart.products.push({ idProduct: productId, quantity: 1 });
          }
      
          await cart.save();
      
          console.log(`Product ${productId} was added successfully to cart ${cartId}`);
        } catch (error) {
          throw new Error(error.message);
        }
      }

      async deleteProductFromCart(productId, cartId) {
        try {
          let carts = await this.getAll();
          let checkCId = carts.find((cId)=> cId._id.equals(cartId));
          if(!checkCId){
            throw new Error("Invalid id, cart not found");
          }
          let cart = await CartModel.findOne({ _id: cartId });
      
          let existingProduct = cart.products.find((pId) => pId.idProduct.equals(productId));
          if (existingProduct) {
            if (existingProduct.quantity === 1) {
              cart.products.splice(cart.products.indexOf(existingProduct), 1);
            } else {
              existingProduct.quantity -= 1;
            }
          } else {
            throw new Error(`Product with id: ${productId} was not found in the cart with id:${cartId}`);
          }
          await cart.save();
          console.log(`Product ${productId} was deleted successfully from cart ${cartId}`);
        } catch (error) {
          throw new Error(error.message);
        }
      }
      
      async updateCart(cartId, productId, cartByUser){
        try {
          if(productId === null ){
            //modifica carrito nuevo
            let cart = await CartModel.findOne({ _id: cartId });
            let newCart = cart.products = cartByUser.products
            await cart.save();
            console.log(`The products of cart with id:${cartId} was updated succesfuly`)
            return newCart;
          }else{
             //modifica cantidad
             let cart = await CartModel.findOne({ _id: cartId });
      
             let existingProduct = cart.products.find((pId) => pId.idProduct.equals(productId));
             if (existingProduct) {
               existingProduct.quantity = cartByUser.quantity
             } else {
               throw new Error(`Product with id: ${productId} was not found in the cart with id:${cartId}`);
             }
             await cart.save();
             return cart;
          }
        } catch (error) {
          throw new Error(error.message);
        }
      }
}