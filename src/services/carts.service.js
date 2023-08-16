import { CartMethods } from "../dao/factory.js"
import { ProductService } from "../services/products.service.js"
import { TicketService } from "./tickets.service.js";
import logger from '../utils/logger.js'
import Errors from "../errors/enums.js";
import CustomError from "../errors/custom-error.js";

const productService = new ProductService;
const ticketService = new TicketService;
export class CartService {

  async getAll() {
    try {
      const carts = await CartMethods.find();
      return carts;
    } catch (error) {
      logger.error({
        name: error.name,
        message: error.message
      })
    CustomError.createError({
        name: "Something wrong happend, we cannot show you the carts",
        cause: "Something wrong with the db happend, we cannot complete the request to the db",
        message: "Please try again",
        code: Errors.NO_CART,
      }) 
      
    }
  }
  async addCart() {
    try {
      let newCart = await CartMethods.create({
        products: []
      })
      logger.info('Cart was created succesfully');
      return newCart;
    } catch (error) {
      logger.error({error: error, errorMsg: error.message})
      throw new Error(error.message);
    }
  }
  async getCartById(_id) {
    try {
      const cart = await CartMethods.findPopulatedOne(_id);
      return cart;
    } catch (error) {
      logger.warn({
        name: error.name,
        message: error.message
      })
     CustomError.createError({
        name: "That cart doesnt exist",
        cause: "The cart you have looking for doesnt exist in db. Error in find it, it could be a wrong id, please check it",
        message: "The cart you have looking for doesnt exist.",
        code: Errors.NO_CART,
      }) 
    }
  }
  async deleteCart(_id) {
    try {
      await CartMethods.updateOne(_id);
      const cart = await this.getCartById(_id)
      return cart;
    } catch (error) {
      logger.warn({
        name: error.name,
        message: error.message
      });
      CustomError.createError({
        name: "That cart doesnt exist",
        cause: "The cart you have looking for doesnt exist in db. Error in find it, it could be a wrong id, please check it",
        message: "The cart you have looking for doesnt exist.",
        code: Errors.NO_CART,
      });
    }
  }
  async addProductToCart(productId, cartId) {
    try {
      let carts = await this.getAll();
      let checkCId = carts.find((cId) => cId._id.equals(cartId));
      if (!checkCId) {
        logger.warn("That cart doesnt exist");
        CustomError.createError({
          name: "That cart doesnt exist",
          cause: "The cart you have looking for doesnt exist in db. Error in find it, it could be a wrong id, please check it",
          message: "The cart you have looking for doesnt exist.",
          code: Errors.NO_CART,
        }) 
      }
      let cart = await CartMethods.findOne(cartId);
      let existingProduct = cart.products.find((pId) => pId.idProduct.equals(productId));

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({
          idProduct: productId,
          quantity: 1
        });
      }

      await cart.save();

      logger.info(`Product ${productId} was added successfully to cart ${cartId}`);
    } catch (error) {
      logger.error({error: error, errorMsg: error.message})
      throw new Error(error.message);
    }
  }

  async deleteProductFromCart(productId, cartId) {
    try {
      let carts = await this.getAll();
      let checkCId = carts.find((cId) => cId._id.equals(cartId));
      if (!checkCId) {
        logger.warn("That cart doesnt exist");
        CustomError.createError({
          name: "That cart doesnt exist",
          cause: "The cart you have looking for doesnt exist in db. Error in find it, it could be a wrong id, please check it",
          message: "The cart you have looking for doesnt exist.",
          code: Errors.NO_CART,
        }) 
      }
      let cart = await CartMethods.findOne(cartId)

      let existingProduct = cart.products.find((pId) => pId.idProduct.equals(productId));
      if (existingProduct) {
        if (existingProduct.quantity === 1) {
          cart.products.splice(cart.products.indexOf(existingProduct), 1);
        } else {
          existingProduct.quantity -= 1;
        }
      } else {
        logger.warn(`Product with id: ${productId} was not found in the cart with id:${cartId}`)
        CustomError.createError({
          name: "That product doesnt exist",
          cause: "The product you have looking for doesnt exist in db. Error in find it, it could be a wrong id, please check it",
          message: `Product with id: ${productId} was not found in the cart with id:${cartId}`,
          code: Errors.NO_PRODUCT,
      })
      }
      await cart.save();
      logger.info(`Product ${productId} was deleted successfully from cart ${cartId}`);
    } catch (error) {
      logger.error({error: error, errorMsg: error.message})
      throw new Error(error.message);
    }
  }

  async updateCart(cartId, productId, cartByUser) {
    try {
      if (productId === null) {
        //modifica carrito nuevo
        let cart = await CartMethods.findOne(cartId)
        let newCart = cart.products = cartByUser.products
        await cart.save();
        logger.info(`The products of cart with id:${cartId} was updated succesfuly`)
        return newCart;
      } else {
        //modifica cantidad
        let cart = await CartMethods.findOne(cartId)

        let existingProduct = cart.products.find((pId) => pId.idProduct.equals(productId));
        if (existingProduct) {
          existingProduct.quantity = cartByUser.quantity
        } else {
          logger.warn(`Product with id: ${productId} was not found in the cart with id:${cartId}`)
          CustomError.createError({
            name: "That product doesnt exist",
            cause: "The product you have looking for doesnt exist in db. Error in find it, it could be a wrong id, please check it",
            message: `Product with id: ${productId} was not found in the cart with id:${cartId}`,
            code: Errors.NO_PRODUCT,
        })
        }
        await cart.save();
        return cart;
      }
    } catch (error) {
      logger.error({error: error, errorMsg: error.message})
      throw new Error(error.message);
    }
  }
  async purchase(cartId, user) {
    try {
      let userPurchasing = user;
      let cart = await CartMethods.findOne(cartId);
      if (cart) {
        const productIds = cart.products.map(product => product.idProduct.toString());
        const productsQuantity = cart.products.map(quan => quan.quantity);
        const productsData = await productService.getArrProductsData(productIds);
        const prices = productsData.map(price => price.price);
        const stocks = productsData.map(stock => stock.stock);

        const multipliedPrices = prices.map((element, index) => element * productsQuantity[index]);
        let priceAmount = 0;
        for (let i = 0; i < multipliedPrices.length; i++) {
          priceAmount += multipliedPrices[i];
        }
        let amount = priceAmount;
        let tkData = {
          purchaser: userPurchasing.email,
          amount: amount,
          products: productsData,
          quantity: productsQuantity,
        }
        for(let i = 0; i < productsQuantity.length; i++){
          if (productsQuantity[i] > stocks[i]) {
            logger.warn(`No stock on product ${productsData[i].title}`)
            throw new Error(`No stock on product ${productsData[i].title}`);
          }
        }
        let ticket = await ticketService.createTicket(tkData);
        for (let i = 0; i < productsQuantity.length; i++) {

          let prodQuan = productsQuantity[i];
          let prod = await productService.getProductById(productIds[i]);
          let updatedProd = {
            "title": prod.title,
            "description": prod.description,
            "price": prod.price,
            "thumbnail": prod.thumbnail,
            "code": prod.code,
            "stock": prod.stock - prodQuan,
            "category": prod.category
          }

          
          await productService.updateProduct(productIds[i],updatedProd);
          //clearing cart
          await CartMethods.updateOne(cartId);
        }
        return ticket;
  

      } else {
        logger.warn("That cart doesnt exist")
        CustomError.createError({
          name: "That cart doesnt exist",
          cause: "The cart you have looking for doesnt exist in db. Error in find it, it could be a wrong id, please check it",
          message: "The cart you have looking for doesnt exist.",
          code: Errors.NO_CART,
        }) 
      }

    } catch (error) {
      logger.error({error: error, errorMsg: error.message})
      throw new Error(error.message);
    }

  }
}