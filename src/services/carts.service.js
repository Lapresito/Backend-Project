import mongoose from "mongoose";
import { CartModel } from "../dao/models/carts.model.js";
import { ProductService } from "./products.service.js";
const productService = new ProductService

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
            const cart = await CartModel.findOne({ _id });
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteCart(_id){
        try {
         const deletedCart = await CartModel.deleteOne({_id});
         return deletedCart;   
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async addProductToCart(productId, cartId) {
        try {
          let products = await productService.getAll();
          let checkPId = products.find((pId) => pId._id.equals(productId));
          if (!checkPId) {
            throw new Error("Invalid id, product not found");
          }

          let carts = await this.getAll();
          console.log(carts)
          let checkCId = carts.find((cId)=> cId._id.equals(cartId));
          console.log(checkCId)
          if(!checkCId){
            throw new Error("Invalid id, cart not found");
          }
          let cart = await CartModel.findOne({ _id: cartId });
          let existingProduct = cart.products.find((pId) => pId.idProduct === productId);
      
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
          console.log(carts);
          let checkCId = carts.find((cId)=> cId._id.equals(cartId));
          console.log(checkCId)
          if(!checkCId){
            throw new Error("Invalid id, cart not found");
          }
          let cart = await CartModel.findOne({ _id: cartId });
      
          let existingProduct = cart.products.find((pId) => pId.idProduct === productId);
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
      

}