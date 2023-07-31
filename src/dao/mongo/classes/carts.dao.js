// toDo

// create a class with custom methods that wraps Mongoose methods.
// create the same class with same methods for others persistences (fs, memory)
// use factory.js to create a switch cases using global variables to indicate which persistence to use.

import { CartModel } from "../models/carts.model.js";

class CartClass{

    async find(){
        let carts = await CartModel.find({})
        return carts
    }
    async create(cart){
        let newCart = await CartModel.create(cart)
        return newCart
    }
    async findPopulatedOne(id){
        let cart = await CartModel.findOne({_id: id}).populate('products.idProduct')
        return cart
    }
    async updateOne(id){
        await CartModel.updateOne({_id: id}, {products: []});
    }
    async findOne(id){
        let cart = await CartModel.findOne({_id: id});
        return cart;

    }
}

export const cartModel = new CartClass;